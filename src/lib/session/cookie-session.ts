/**
 * Cookie-Based Session Management with iron-session
 * Replaces Redis/KV storage with encrypted cookies
 */

import { getIronSession, IronSession } from "iron-session";
import { cookies } from "next/headers";

// ============================================================================
// Simplified Session Types (Optimized for 4KB Cookie Limit)
// ============================================================================

export interface CookieSessionData {
  sessionId: string;
  createdAt: string; // ISO string to save space
  lastVisit: string;

  // Visit tracking (limited to last 10)
  recentVisits: Array<{
    route: string;
    timestamp: string;
    duration?: number;
  }>;

  // Interaction tracking (limited to last 15)
  recentInteractions: Array<{
    type: "click" | "chat" | "form" | "scroll" | "page_view";
    timestamp: string;
    route: string;
  }>;

  // Persona tracking
  personaConfidence?: {
    persona: "brand_manager" | "data_analyst" | "executive" | "researcher" | "unknown";
    confidence: number;
    signals: string[]; // Top 5 signals only
  };

  // User metadata (minimal)
  metadata: {
    email?: string;
    firstVisit: string;
    totalVisits: number;
    referrer?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
  };

  // Flags
  flags: {
    isBot: boolean;
    isReturningVisitor: boolean;
    hasInteracted: boolean;
    hasChatted: boolean;
    hasSubmittedForm: boolean;
    emailCaptured: boolean;
  };
}

// ============================================================================
// Session Configuration
// ============================================================================

const SESSION_CONFIG = {
  cookieName: "ciq_session",
  password: process.env.SESSION_SECRET || "complex_password_at_least_32_characters_long_for_encryption",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  },
};

// ============================================================================
// Session Management Functions
// ============================================================================

/**
 * Get or create iron session
 */
export async function getIronCookieSession(): Promise<IronSession<CookieSessionData>> {
  const cookieStore = await cookies();
  return await getIronSession<CookieSessionData>(cookieStore, SESSION_CONFIG);
}

/**
 * Initialize a new session with default values
 */
export function initializeSessionData(): CookieSessionData {
  const now = new Date().toISOString();

  return {
    sessionId: crypto.randomUUID(),
    createdAt: now,
    lastVisit: now,
    recentVisits: [],
    recentInteractions: [],
    metadata: {
      firstVisit: now,
      totalVisits: 1,
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
}

/**
 * Get or create session
 */
export async function getOrCreateCookieSession(): Promise<CookieSessionData> {
  const session = await getIronCookieSession();

  if (!session.sessionId) {
    // Initialize new session
    const newSessionData = initializeSessionData();
    Object.assign(session, newSessionData);
    await session.save();
    return session as CookieSessionData;
  }

  // Update last visit
  session.lastVisit = new Date().toISOString();
  session.metadata.totalVisits = (session.metadata.totalVisits || 0) + 1;
  session.flags.isReturningVisitor = session.metadata.totalVisits > 1;
  await session.save();

  return session as CookieSessionData;
}

/**
 * Add visit to session (keeps only last 10)
 */
export async function addVisit(route: string, duration?: number): Promise<void> {
  const session = await getIronCookieSession();

  if (!session.sessionId) {
    await getOrCreateCookieSession();
    return addVisit(route, duration);
  }

  session.recentVisits = session.recentVisits || [];
  session.recentVisits.push({
    route,
    timestamp: new Date().toISOString(),
    duration,
  });

  // Keep only last 10 visits
  if (session.recentVisits.length > 10) {
    session.recentVisits = session.recentVisits.slice(-10);
  }

  await session.save();
}

/**
 * Add interaction to session (keeps only last 15)
 */
export async function addInteraction(
  type: "click" | "chat" | "form" | "scroll" | "page_view",
  route: string
): Promise<void> {
  const session = await getIronCookieSession();

  if (!session.sessionId) {
    await getOrCreateCookieSession();
    return addInteraction(type, route);
  }

  session.recentInteractions = session.recentInteractions || [];
  session.recentInteractions.push({
    type,
    timestamp: new Date().toISOString(),
    route,
  });

  // Keep only last 15 interactions
  if (session.recentInteractions.length > 15) {
    session.recentInteractions = session.recentInteractions.slice(-15);
  }

  // Update flags
  session.flags.hasInteracted = true;
  if (type === "chat") session.flags.hasChatted = true;
  if (type === "form") session.flags.hasSubmittedForm = true;

  await session.save();
}

/**
 * Update persona confidence
 */
export async function updatePersonaConfidence(
  persona: "brand_manager" | "data_analyst" | "executive" | "researcher" | "unknown",
  confidence: number,
  signals: string[]
): Promise<void> {
  const session = await getIronCookieSession();

  if (!session.sessionId) {
    await getOrCreateCookieSession();
    return updatePersonaConfidence(persona, confidence, signals);
  }

  session.personaConfidence = {
    persona,
    confidence,
    signals: signals.slice(0, 5), // Keep only top 5 signals
  };

  await session.save();
}

/**
 * Update user metadata
 */
export async function updateMetadata(updates: Partial<CookieSessionData["metadata"]>): Promise<void> {
  const session = await getIronCookieSession();

  if (!session.sessionId) {
    await getOrCreateCookieSession();
    return updateMetadata(updates);
  }

  session.metadata = {
    ...session.metadata,
    ...updates,
  };

  if (updates.email) {
    session.flags.emailCaptured = true;
  }

  await session.save();
}

/**
 * Clear session
 */
export async function clearSession(): Promise<void> {
  const session = await getIronCookieSession();
  session.destroy();
}

/**
 * Get current session without creating new one
 */
export async function getCurrentCookieSession(): Promise<CookieSessionData | null> {
  const session = await getIronCookieSession();

  if (!session.sessionId) {
    return null;
  }

  return session as CookieSessionData;
}
