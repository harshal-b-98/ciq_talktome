/**
 * Server-side Session Utilities for Server Components
 * CGL-61: Implement session reading in Server Components
 *
 * This module provides utilities for Server Components to read
 * session data synchronously using Next.js cookies().
 */

import { cookies } from "next/headers";
import { getOrCreateSession, getCurrentSession } from "../session/utils";
import type { Session } from "../session/types";
import type { SessionContext } from "../agent/types";

/**
 * Get or create session for Server Components
 * This is the primary method for Server Components to access session data
 *
 * @returns Session object with user context
 */
export async function getServerSession(): Promise<Session> {
  const cookieStore = await cookies();
  const referrer = cookieStore.get("referer")?.value;

  // Extract UTM parameters if available (could be from headers or stored)
  const utmParams = {
    utm_source: cookieStore.get("utm_source")?.value,
    utm_medium: cookieStore.get("utm_medium")?.value,
    utm_campaign: cookieStore.get("utm_campaign")?.value,
  };

  const cleanUtmParams = Object.fromEntries(
    Object.entries(utmParams).filter(([_, v]) => v !== undefined)
  ) as Record<string, string>;

  return await getOrCreateSession(
    referrer,
    Object.keys(cleanUtmParams).length > 0 ? cleanUtmParams : undefined
  );
}

/**
 * Try to get existing session without creating a new one
 * Returns null if session doesn't exist
 *
 * @returns Session object or null
 */
export async function getExistingSession(): Promise<Session | null> {
  return await getCurrentSession();
}

/**
 * Convert Session to SessionContext for Agent
 * Extracts only the necessary fields for Agent processing
 *
 * @param session - Full session object
 * @returns SessionContext for Agent input
 */
export function sessionToContext(session: Session): SessionContext {
  return {
    sessionId: session.sessionId,
    visitHistory: session.visitHistory.map((visit) => ({
      route: visit.route,
      timestamp: visit.timestamp,
      summary: visit.summary,
      duration: visit.duration,
    })),
    interactions: session.interactions.map((interaction) => ({
      type: interaction.type as "click" | "chat" | "form" | "scroll",
      timestamp: interaction.timestamp,
      details: interaction.details as unknown as Record<string, unknown>,
    })),
    personaConfidence: session.personaConfidence
      ? {
          persona: session.personaConfidence.persona as
            | "brand_manager"
            | "data_analyst"
            | "executive"
            | "researcher"
            | "unknown",
          confidence: session.personaConfidence.confidence,
          signals: session.personaConfidence.signals.map((s) => s.type),
        }
      : undefined,
    metadata: {
      email: session.userMetadata.email,
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
  const session = await getCurrentSession();
  return session !== null;
}
