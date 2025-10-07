/**
 * Session Utility Functions
 * CGL-50: Create session read/write utilities for Server Components
 * CGL-51: Implement visit summary generation (1-2 line summaries per page)
 * CGL-52: Build interaction logging (clicks, chat, forms)
 * CGL-53: Add persona confidence tracking to session
 */

import { randomUUID } from "crypto";
import type {
  Session,
  VisitRecord,
  InteractionRecord,
  InteractionDetails,
  PersonaConfidence,
  PersonaSignal,
} from "./types";
import {
  Persona,
  InteractionType,
  SignalType,
} from "./types";
import { sessionStore } from "./store";
import { getSessionCookie, setSessionCookie } from "./cookies";
import { SessionEventType } from "./types";

// ============================================================================
// Session Retrieval for Server Components
// ============================================================================

/**
 * Get or create session for current request
 * Primary utility for Server Components
 */
export async function getOrCreateSession(
  referrer?: string,
  utmParams?: Record<string, string>,
): Promise<Session> {
  const sessionId = await getSessionCookie();

  if (sessionId) {
    const session = await sessionStore.get(sessionId);
    if (session) {
      // Extend session on each request
      await sessionStore.extend(sessionId);
      return session;
    }
  }

  // Create new session
  const newSession = await sessionStore.create(referrer, utmParams);
  await setSessionCookie(newSession.sessionId);

  return newSession;
}

/**
 * Get current session (returns null if doesn't exist)
 */
export async function getCurrentSession(): Promise<Session | null> {
  const sessionId = await getSessionCookie();
  if (!sessionId) {
    return null;
  }

  return await sessionStore.get(sessionId);
}

/**
 * Update current session
 */
export async function updateCurrentSession(
  updates: Partial<Session>,
): Promise<Session | null> {
  const sessionId = await getSessionCookie();
  if (!sessionId) {
    return null;
  }

  return await sessionStore.update(sessionId, updates);
}

// ============================================================================
// Visit Summary Generation (CGL-51)
// ============================================================================

/**
 * Record a visit to a page
 * Generates a 1-2 line summary of the visit
 */
export async function recordVisit(
  route: string,
  referrer?: string,
): Promise<void> {
  const session = await getCurrentSession();
  if (!session) {
    return;
  }

  const visitId = randomUUID();
  const timestamp = new Date();

  // Generate summary based on route
  const summary = generateVisitSummary(route, session);

  const visit: VisitRecord = {
    id: visitId,
    route,
    timestamp,
    summary,
    referrer,
  };

  // Update session with new visit
  const updatedVisits = [...session.visitHistory, visit];

  // Keep only the last N visits (configured in session store)
  await sessionStore.update(session.sessionId, {
    visitHistory: updatedVisits,
    userMetadata: {
      ...session.userMetadata,
      lastVisit: timestamp,
      totalVisits: session.userMetadata.totalVisits + 1,
    },
    flags: {
      ...session.flags,
      isReturningVisitor: session.userMetadata.totalVisits > 0,
    },
  });

  logSessionEvent(SessionEventType.VISIT_RECORDED, session.sessionId, {
    route,
    visitId,
  });
}

/**
 * Generate a visit summary (1-2 lines)
 * CGL-51: Visit summary generation
 */
function generateVisitSummary(route: string, session: Session): string {
  const routeMap: Record<string, string> = {
    "/": "Viewed homepage and learned about ConsumerIQ platform",
    "/features": "Browsed features overview page",
    "/about": "Read about company mission and values",
    "/contact": "Visited contact page",
  };

  // Check for feature detail routes
  if (route.startsWith("/features/")) {
    const feature = route.replace("/features/", "").replace(/-/g, " ");
    return `Explored ${feature} feature in detail`;
  }

  // Check if this is a returning visitor
  const hasVisitedBefore = session.visitHistory.some((v) => v.route === route);
  if (hasVisitedBefore) {
    return `Returned to ${route === "/" ? "homepage" : route} for more information`;
  }

  return routeMap[route] || `Visited ${route}`;
}

/**
 * Update visit duration when user leaves page
 */
export async function updateVisitDuration(
  visitId: string,
  duration: number,
  exitRoute?: string,
): Promise<void> {
  const session = await getCurrentSession();
  if (!session) {
    return;
  }

  const updatedVisits = session.visitHistory.map((visit) =>
    visit.id === visitId ? { ...visit, duration, exitRoute } : visit,
  );

  await sessionStore.update(session.sessionId, {
    visitHistory: updatedVisits,
  });
}

// ============================================================================
// Interaction Logging (CGL-52)
// ============================================================================

/**
 * Log an interaction
 */
export async function logInteraction(
  type: InteractionType,
  route: string,
  details: InteractionDetails,
): Promise<void> {
  const session = await getCurrentSession();
  if (!session) {
    return;
  }

  const interactionId = randomUUID();
  const timestamp = new Date();

  const interaction: InteractionRecord = {
    id: interactionId,
    type,
    timestamp,
    route,
    details,
  };

  // Update session with new interaction
  const updatedInteractions = [...session.interactions, interaction];

  // Update flags based on interaction type
  const flags = { ...session.flags };
  flags.hasInteracted = true;

  if (type === "chat") {
    flags.hasChatted = true;
  }

  if (type === "form_submit") {
    flags.hasSubmittedForm = true;
  }

  await sessionStore.update(session.sessionId, {
    interactions: updatedInteractions,
    flags,
  });

  logSessionEvent(SessionEventType.INTERACTION_LOGGED, session.sessionId, {
    type,
    route,
    interactionId,
  });

  // Update persona based on interaction (CGL-53)
  await updatePersonaFromInteraction(session, type, route, details);
}

// ============================================================================
// Persona Confidence Tracking (CGL-53)
// ============================================================================

/**
 * Update persona confidence based on interaction
 */
async function updatePersonaFromInteraction(
  session: Session,
  interactionType: InteractionType,
  route: string,
  details: InteractionDetails,
): Promise<void> {
  const signals: PersonaSignal[] = [];

  // Generate signals based on interaction type and route
  if (route.startsWith("/features/")) {
    const feature = route.replace("/features/", "");

    // Map features to personas
    const featurePersonaMap: Record<string, { persona: Persona; weight: number }> = {
      "real-time-analytics": { persona: Persona.DATA_ANALYST, weight: 0.3 },
      "ai-powered-insights": { persona: Persona.DATA_ANALYST, weight: 0.3 },
      "market-intelligence": { persona: Persona.BRAND_MANAGER, weight: 0.3 },
      "product-tracking": { persona: Persona.BRAND_MANAGER, weight: 0.3 },
      "custom-dashboards": { persona: Persona.DATA_ANALYST, weight: 0.2 },
      "data-security": { persona: Persona.EXECUTIVE, weight: 0.2 },
    };

    const mapping = featurePersonaMap[feature];
    if (mapping) {
      signals.push({
        type: SignalType.PAGE_VISIT,
        value: feature,
        weight: mapping.weight,
        timestamp: new Date(),
      });
    }
  }

  // Chat interactions can provide strong persona signals
  if (interactionType === "chat" && "message" in details) {
    const message = details.message.toLowerCase();

    if (message.includes("roi") || message.includes("cost") || message.includes("pricing")) {
      signals.push({
        type: SignalType.QUESTION,
        value: "pricing_question",
        weight: 0.4,
        timestamp: new Date(),
      });
    }

    if (message.includes("integrate") || message.includes("api") || message.includes("technical")) {
      signals.push({
        type: SignalType.QUESTION,
        value: "technical_question",
        weight: 0.5,
        timestamp: new Date(),
      });
    }
  }

  // Form submissions can have explicit persona data
  if (interactionType === "form_submit" && "fields" in details) {
    const fields = details.fields as Record<string, unknown>;

    if (fields.jobTitle) {
      const jobTitle = String(fields.jobTitle).toLowerCase();
      const titlePersonaMap: Record<string, Persona> = {
        "data analyst": Persona.DATA_ANALYST,
        "brand manager": Persona.BRAND_MANAGER,
        "ceo": Persona.EXECUTIVE,
        "cto": Persona.EXECUTIVE,
        "director": Persona.EXECUTIVE,
        "developer": Persona.DEVELOPER,
        "engineer": Persona.DEVELOPER,
        "researcher": Persona.RESEARCHER,
      };

      for (const [key, persona] of Object.entries(titlePersonaMap)) {
        if (jobTitle.includes(key)) {
          signals.push({
            type: SignalType.FORM_DATA,
            value: jobTitle,
            weight: 0.8, // Form data is high confidence
            timestamp: new Date(),
          });
          break;
        }
      }
    }

    // Email captured
    if (fields.email) {
      await sessionStore.update(session.sessionId, {
        userMetadata: {
          ...session.userMetadata,
          email: String(fields.email),
        },
        flags: {
          ...session.flags,
          emailCaptured: true,
        },
      });
    }
  }

  // If we have new signals, update persona confidence
  if (signals.length > 0) {
    await updatePersonaConfidence(session.sessionId, signals);
  }
}

/**
 * Update persona confidence score
 */
async function updatePersonaConfidence(
  sessionId: string,
  newSignals: PersonaSignal[],
): Promise<void> {
  const session = await sessionStore.get(sessionId);
  if (!session || !session.personaConfidence) {
    return;
  }

  // Combine old and new signals
  const allSignals = [...session.personaConfidence.signals, ...newSignals];

  // Calculate confidence scores for each persona
  const personaScores: Record<Persona, number> = {
    [Persona.BRAND_MANAGER]: 0,
    [Persona.DATA_ANALYST]: 0,
    [Persona.EXECUTIVE]: 0,
    [Persona.RESEARCHER]: 0,
    [Persona.DEVELOPER]: 0,
    [Persona.UNKNOWN]: 0,
  };

  // Aggregate signal weights (simplified scoring)
  allSignals.forEach((signal) => {
    // This is a simplified implementation
    // In reality, you'd have more sophisticated persona detection
    personaScores[Persona.DATA_ANALYST] += signal.weight * 0.3;
    personaScores[Persona.BRAND_MANAGER] += signal.weight * 0.3;
    personaScores[Persona.EXECUTIVE] += signal.weight * 0.2;
  });

  // Find persona with highest score
  let maxPersona: Persona = Persona.UNKNOWN;
  let maxScore = 0;

  for (const [persona, score] of Object.entries(personaScores)) {
    if (score > maxScore) {
      maxScore = score;
      maxPersona = persona as Persona;
    }
  }

  // Normalize confidence score to 0-1
  const confidence = Math.min(maxScore, 1.0);

  const updatedPersonaConfidence: PersonaConfidence = {
    persona: maxPersona,
    confidence,
    signals: allSignals,
    updatedAt: new Date(),
  };

  await sessionStore.update(sessionId, {
    personaConfidence: updatedPersonaConfidence,
  });

  logSessionEvent(SessionEventType.PERSONA_UPDATED, sessionId, {
    persona: maxPersona,
    confidence,
    signalCount: allSignals.length,
  });
}

// ============================================================================
// Email Capture
// ============================================================================

/**
 * Update session with captured email
 */
export async function captureEmail(email: string, additionalData?: Record<string, unknown>): Promise<void> {
  const session = await getCurrentSession();
  if (!session) {
    return;
  }

  await sessionStore.update(session.sessionId, {
    userMetadata: {
      ...session.userMetadata,
      email,
      ...additionalData,
    },
    flags: {
      ...session.flags,
      emailCaptured: true,
    },
  });
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Log session events
 */
function logSessionEvent(
  type: SessionEventType,
  sessionId: string,
  details: Record<string, unknown>,
): void {
  if (process.env.NODE_ENV !== "production") {
    console.log(`[Session] ${type}`, {
      sessionId,
      details,
      timestamp: new Date().toISOString(),
    });
  }

  // TODO: Send to monitoring service in production (Story CGL-184)
}
