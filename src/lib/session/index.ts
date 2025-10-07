/**
 * Session Management - Main Export
 * Story CGL-45: Session Management and Memory System
 *
 * This module provides comprehensive session management with:
 * - Secure cookie-based sessions
 * - Visit history tracking with summaries
 * - Interaction logging
 * - Persona confidence tracking
 * - Session size limits and optimization
 * - Automatic expiration and cleanup
 */

// Export types
export * from "./types";

// Export store
export { SessionStore, sessionStore } from "./store";

// Export cookie utilities
export {
  setSessionCookie,
  getSessionCookie,
  deleteSessionCookie,
  hasSessionCookie,
} from "./cookies";

// Export session utilities
export {
  getOrCreateSession,
  getCurrentSession,
  updateCurrentSession,
  recordVisit,
  updateVisitDuration,
  logInteraction,
  captureEmail,
} from "./utils";

// Export middleware
export {
  initializeSession,
  getUserAgent,
  isBot,
} from "./middleware";
