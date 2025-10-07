/**
 * Session Store Implementation
 * CGL-48: Implement session creation with secure cookie
 * CGL-50: Create session read/write utilities for Server Components
 * CGL-54: Implement session retrieval optimization (caching)
 * CGL-55: Build session expiration and cleanup logic
 *
 * ⚠️ DEPRECATED: This module is deprecated in favor of iron-session cookie-based sessions.
 * Session management now uses encrypted cookies (src/lib/session/cookie-session.ts)
 * instead of Redis/KV storage. This file is kept for backward compatibility with
 * legacy session utilities (src/lib/session/utils.ts) but should not be used in new code.
 *
 * New code should use:
 * - src/lib/session/cookie-session.ts for session management
 * - src/lib/server/session.ts for server-side session access
 *
 * See: src/lib/session/cookie-session.ts for the new implementation
 */

import { kv } from "../kv";
import { randomUUID } from "crypto";
import type {
  Session,
  SessionConfig,
  SessionSizeLimits,
} from "./types";
import {
  DEFAULT_SESSION_CONFIG,
  DEFAULT_SIZE_LIMITS,
} from "./types";
import {
  Persona,
  SessionEventType,
} from "./types";

// ============================================================================
// Session Store Class
// ============================================================================

export class SessionStore {
  private config: SessionConfig;
  private sizeLimits: SessionSizeLimits;

  constructor(
    config: Partial<SessionConfig> = {},
    sizeLimits: Partial<SessionSizeLimits> = {},
  ) {
    this.config = { ...DEFAULT_SESSION_CONFIG as SessionConfig, ...config };
    this.sizeLimits = { ...DEFAULT_SIZE_LIMITS, ...sizeLimits };
  }

  /**
   * Create a new session
   * CGL-48: Session creation
   */
  async create(referrer?: string, utmParams?: Record<string, string>): Promise<Session> {
    const sessionId = randomUUID();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + this.config.ttl * 1000);

    const session: Session = {
      sessionId,
      createdAt: now,
      updatedAt: now,
      expiresAt,
      userMetadata: {
        firstVisit: now,
        lastVisit: now,
        totalVisits: 1,
        referrer,
        utmParams,
      },
      visitHistory: [],
      interactions: [],
      personaConfidence: {
        persona: Persona.UNKNOWN,
        confidence: 0,
        signals: [],
        updatedAt: now,
      },
      flags: {
        isBot: false,
        isReturningVisitor: false,
        hasInteracted: false,
        hasChatted: false,
        hasSubmittedForm: false,
        emailCaptured: false,
      },
    };

    await this.set(sessionId, session);

    this.logEvent(SessionEventType.SESSION_CREATED, sessionId, {
      referrer,
      utmParams,
    });

    return session;
  }

  /**
   * Get session by ID
   * CGL-50: Read utilities
   * CGL-54: Retrieval optimization
   */
  async get(sessionId: string): Promise<Session | null> {
    try {
      const key = this.getKey(sessionId);
      const data = await kv.get<Session>(key);

      if (!data) {
        return null;
      }

      // Convert date strings back to Date objects
      const session = this.deserializeSession(data);

      // Check if session has expired
      if (new Date() > session.expiresAt) {
        await this.delete(sessionId);
        this.logEvent(SessionEventType.SESSION_EXPIRED, sessionId, {});
        return null;
      }

      return session;
    } catch (error) {
      console.error(`[SessionStore] Error getting session ${sessionId}:`, error);
      return null;
    }
  }

  /**
   * Update session
   * CGL-50: Write utilities
   */
  async update(
    sessionId: string,
    updates: Partial<Session>,
  ): Promise<Session | null> {
    try {
      const session = await this.get(sessionId);
      if (!session) {
        return null;
      }

      const updatedSession: Session = {
        ...session,
        ...updates,
        updatedAt: new Date(),
      };

      // CGL-56: Check size limits
      const sizeCheck = this.checkSizeLimit(updatedSession);
      if (!sizeCheck.withinLimit) {
        console.warn(`[SessionStore] Session size limit exceeded:`, sizeCheck);
        this.logEvent(SessionEventType.SIZE_LIMIT_EXCEEDED, sessionId, sizeCheck);

        // Trim old data to fit within limits
        updatedSession.visitHistory = updatedSession.visitHistory.slice(
          -this.config.maxVisitHistory,
        );
        updatedSession.interactions = updatedSession.interactions.slice(
          -this.config.maxInteractions,
        );
      }

      await this.set(sessionId, updatedSession);

      this.logEvent(SessionEventType.SESSION_UPDATED, sessionId, {
        updates: Object.keys(updates),
      });

      return updatedSession;
    } catch (error) {
      console.error(`[SessionStore] Error updating session ${sessionId}:`, error);
      return null;
    }
  }

  /**
   * Delete session
   * CGL-55: Cleanup logic
   */
  async delete(sessionId: string): Promise<void> {
    try {
      const key = this.getKey(sessionId);
      await kv.del(key);

      this.logEvent(SessionEventType.SESSION_DELETED, sessionId, {});
    } catch (error) {
      console.error(`[SessionStore] Error deleting session ${sessionId}:`, error);
    }
  }

  /**
   * Extend session TTL
   * CGL-55: Session expiration management
   */
  async extend(sessionId: string): Promise<void> {
    try {
      const session = await this.get(sessionId);
      if (!session) {
        return;
      }

      const now = new Date();
      const newExpiresAt = new Date(now.getTime() + this.config.ttl * 1000);

      await this.update(sessionId, {
        expiresAt: newExpiresAt,
        userMetadata: {
          ...session.userMetadata,
          lastVisit: now,
        },
      });

      // Also extend Redis TTL
      const key = this.getKey(sessionId);
      await kv.expire(key, this.config.ttl);
    } catch (error) {
      console.error(`[SessionStore] Error extending session ${sessionId}:`, error);
    }
  }

  /**
   * Set session in store
   * Private method for internal use
   */
  private async set(sessionId: string, session: Session): Promise<void> {
    const key = this.getKey(sessionId);
    const serialized = this.serializeSession(session);

    // Set with TTL
    await kv.set(key, serialized, { ex: this.config.ttl });
  }

  /**
   * Get Redis key for session
   */
  private getKey(sessionId: string): string {
    return `${this.config.keyPrefix}${sessionId}`;
  }

  /**
   * Serialize session for storage
   * Converts Date objects to ISO strings
   */
  private serializeSession(session: Session): Record<string, unknown> {
    return {
      ...session,
      createdAt: session.createdAt.toISOString(),
      updatedAt: session.updatedAt.toISOString(),
      expiresAt: session.expiresAt.toISOString(),
      userMetadata: {
        ...session.userMetadata,
        firstVisit: session.userMetadata.firstVisit.toISOString(),
        lastVisit: session.userMetadata.lastVisit.toISOString(),
      },
      visitHistory: session.visitHistory.map((visit) => ({
        ...visit,
        timestamp: visit.timestamp.toISOString(),
      })),
      interactions: session.interactions.map((interaction) => ({
        ...interaction,
        timestamp: interaction.timestamp.toISOString(),
      })),
      personaConfidence: session.personaConfidence
        ? {
            ...session.personaConfidence,
            updatedAt: session.personaConfidence.updatedAt.toISOString(),
            signals: session.personaConfidence.signals.map((signal) => ({
              ...signal,
              timestamp: signal.timestamp.toISOString(),
            })),
          }
        : undefined,
    };
  }

  /**
   * Deserialize session from storage
   * Converts ISO strings back to Date objects
   */
  private deserializeSession(data: Session | Record<string, unknown>): Session {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawData = data as any;

    return {
      ...rawData,
      createdAt: new Date(rawData.createdAt),
      updatedAt: new Date(rawData.updatedAt),
      expiresAt: new Date(rawData.expiresAt),
      userMetadata: {
        ...rawData.userMetadata,
        firstVisit: new Date(rawData.userMetadata.firstVisit),
        lastVisit: new Date(rawData.userMetadata.lastVisit),
      },
      visitHistory: rawData.visitHistory.map((visit: Record<string, unknown>) => ({
        ...visit,
        timestamp: new Date(visit.timestamp as string),
      })),
      interactions: rawData.interactions.map((interaction: Record<string, unknown>) => ({
        ...interaction,
        timestamp: new Date(interaction.timestamp as string),
      })),
      personaConfidence: rawData.personaConfidence
        ? {
            ...rawData.personaConfidence,
            updatedAt: new Date(rawData.personaConfidence.updatedAt),
            signals: rawData.personaConfidence.signals.map((signal: Record<string, unknown>) => ({
              ...signal,
              timestamp: new Date(signal.timestamp as string),
            })),
          }
        : undefined,
    };
  }

  /**
   * Check session size limits
   * CGL-56: Session size limits
   */
  private checkSizeLimit(session: Session): {
    withinLimit: boolean;
    currentSize: number;
    maxSize: number;
  } {
    const serialized = JSON.stringify(session);
    const currentSize = new Blob([serialized]).size;

    return {
      withinLimit: currentSize <= this.sizeLimits.maxSessionSizeBytes,
      currentSize,
      maxSize: this.sizeLimits.maxSessionSizeBytes,
    };
  }

  /**
   * Log session events
   */
  private logEvent(
    type: SessionEventType,
    sessionId: string,
    details: Record<string, unknown>,
  ): void {
    // Development: console log
    if (process.env.NODE_ENV !== "production") {
      console.log(`[SessionStore] ${type}`, {
        sessionId,
        details,
        timestamp: new Date().toISOString(),
      });
    }

    // TODO: Send to monitoring service in production (Story CGL-184)
  }
}

// ============================================================================
// Singleton Instance
// ============================================================================

export const sessionStore = new SessionStore();
