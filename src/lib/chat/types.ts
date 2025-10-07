/**
 * Chat Types
 * CGL-73: Chat Interface with Server Actions
 */

import type { Citation } from "../agent/types";

// ============================================================================
// Chat Message Types
// ============================================================================

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  citations?: Citation[];
  timestamp: Date;
}

// ============================================================================
// Chat Request/Response Types
// ============================================================================

export interface ChatRequest {
  message: string;
  sessionId: string;
  route: string; // Current page context
  chatHistory?: ChatMessage[];
}

export interface ChatResponse {
  message: string;
  citations: Citation[];
  messageId: string;
  timestamp: Date;
  success: boolean;
  error?: string;
}

// ============================================================================
// Chat Agent Types
// ============================================================================

export interface ChatAgentInput {
  userMessage: string;
  chatHistory: ChatMessage[];
  route: string;
  sessionContext?: {
    sessionId: string;
    visitHistory?: string[];
    personaHints?: string[];
  };
}

export interface ChatAgentOutput {
  response: string;
  citations: Citation[];
  personaSignals?: string[];
  recommendedContent?: string[];
}
