/**
 * Server-side Session Utilities for Server Components
 * CGL-61: Implement session reading in Server Components
 * Updated to use iron-session with encrypted cookies
 *
 * This module provides utilities for Server Components to read
 * session data from encrypted cookies (no Redis/KV needed).
 */

import { cookies } from "next/headers";
import {
  getOrCreateCookieSession,
  getCurrentCookieSession,
  updateMetadata,
  type CookieSessionData,
} from "../session/cookie-session";
import type { SessionContext } from "../agent/types";

/**
 * Get or create session for Server Components
 * This is the primary method for Server Components to access session data
 *
 * @param readOnly - If true, don't create or modify session (for use in generateMetadata)
 * @returns Session object with user context
 */
export async function getServerSession(readOnly: boolean = false): Promise<CookieSessionData> {
  const cookieStore = await cookies();
  const referrer = cookieStore.get("referer")?.value;

  // Extract UTM parameters if available
  const utmSource = cookieStore.get("utm_source")?.value;
  const utmMedium = cookieStore.get("utm_medium")?.value;
  const utmCampaign = cookieStore.get("utm_campaign")?.value;

  // Get or create session
  const session = await getOrCreateCookieSession(readOnly);

  // Update metadata if UTM params or referrer present (only if not read-only)
  if (!readOnly && (referrer || utmSource || utmMedium || utmCampaign)) {
    await updateMetadata({
      referrer,
      utmSource,
      utmMedium,
      utmCampaign,
    });
  }

  return session;
}

/**
 * Try to get existing session without creating a new one
 * Returns null if session doesn't exist
 *
 * @returns Session object or null
 */
export async function getExistingSession(): Promise<CookieSessionData | null> {
  return await getCurrentCookieSession();
}

/**
 * Convert Session to SessionContext for Agent
 * Extracts only the necessary fields for Agent processing
 *
 * @param session - Full session object
 * @returns SessionContext for Agent input
 */
export function sessionToContext(session: CookieSessionData): SessionContext {
  return {
    sessionId: session.sessionId,
    visitHistory: session.recentVisits.map((visit) => ({
      route: visit.route,
      timestamp: new Date(visit.timestamp),
      summary: `Visited ${visit.route}`, // Simple summary for cookie-based sessions
      duration: visit.duration,
    })),
    interactions: session.recentInteractions.map((interaction) => ({
      type: interaction.type as "click" | "chat" | "form" | "scroll",
      timestamp: new Date(interaction.timestamp),
      details: {}, // Minimal details for cookie-based sessions
    })),
    personaConfidence: session.personaConfidence
      ? {
          persona: session.personaConfidence.persona,
          confidence: session.personaConfidence.confidence,
          signals: session.personaConfidence.signals,
        }
      : undefined,
    metadata: {
      email: session.metadata.email,
      isReturningVisitor: session.flags.isReturningVisitor,
      hasInteracted: session.flags.hasInteracted,
    },
  };
}

/**
 * Check if session exists (useful for conditional rendering)
 *
 * @returns True if session cookie exists
 */
export async function hasSession(): Promise<boolean> {
  const session = await getCurrentCookieSession();
  return session !== null;
}
