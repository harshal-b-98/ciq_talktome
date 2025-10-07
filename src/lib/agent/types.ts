/**
 * Agent Types and Interfaces
 * CGL-18: Design Agent interface and input/output schemas
 */

// ============================================================================
// Session Context Types
// ============================================================================

export interface SessionContext {
  sessionId: string;
  visitHistory?: VisitSummary[];
  interactions?: Interaction[];
  personaConfidence?: PersonaConfidence;
  metadata?: Record<string, unknown>;
}

export interface VisitSummary {
  route: string;
  timestamp: Date;
  summary: string;
  duration?: number;
}

export interface Interaction {
  type: "click" | "chat" | "form" | "scroll";
  timestamp: Date;
  details: Record<string, unknown>;
}

export interface PersonaConfidence {
  persona: "brand_manager" | "data_analyst" | "executive" | "researcher" | "unknown";
  confidence: number; // 0-1
  signals: string[];
}

// ============================================================================
// Agent Input Types
// ============================================================================

export interface AgentInput {
  route: string;
  sessionContext?: SessionContext;
  userQuery?: string;
  additionalContext?: Record<string, unknown>;
}

// ============================================================================
// Agent Output Types (CGL-27: Content data output schema)
// ============================================================================

export interface AgentOutput {
  content: ContentData;
  metadata: ContentMetadata;
  citations: Citation[];
}

export interface ContentData {
  title: string;
  body: string;
  cta?: CallToAction;
  relatedLinks?: RelatedLink[];
  sections?: ContentSection[];
}

export interface ContentSection {
  id: string;
  title: string;
  body: string;
  order: number;
}

export interface CallToAction {
  text: string;
  href: string;
  variant?: "default" | "outline" | "secondary";
}

export interface RelatedLink {
  title: string;
  href: string;
  description?: string;
}

export interface ContentMetadata {
  personaRelevance?: number;
  sourceCount: number;
  generationTime: number;
  modelUsed: string;
  temperature: number;
}

export interface Citation {
  source: string;
  sourceType: "feature" | "persona" | "general";
  snippet?: string;
  relevance: number;
}

// ============================================================================
// Prompt Context Types (CGL-20: Prompt composition)
// ============================================================================

export interface PromptContext {
  route: string;
  sessionHistory: string;
  personaInfo: string;
  userQuery?: string;
  isFirstVisit: boolean;
}

// ============================================================================
// Vector Search Types (CGL-22: Content retrieval)
// ============================================================================

export interface VectorSearchQuery {
  query: string;
  topK?: number;
  filter?: VectorSearchFilter;
}

export interface VectorSearchFilter {
  persona?: string[];
  feature?: string[];
  sourceType?: string[];
}

export interface VectorSearchResult {
  id: string;
  content: string;
  metadata: VectorMetadata;
  score: number;
}

export interface VectorMetadata {
  title: string;
  slug?: string;
  tags?: string[];
  persona?: string[];
  feature?: string[];
  sourceType: string;
  lastUpdated: Date;
}

// ============================================================================
// Agent Configuration Types (CGL-24: Determinism controls)
// ============================================================================

export interface AgentConfig {
  modelName: string;
  temperature: number;
  maxTokens: number;
  seed?: number;
  topP?: number;
  enableLogging: boolean;
  enableCitations: boolean;
}

// ============================================================================
// Error Types (CGL-25: Error handling)
// ============================================================================

export class AgentError extends Error {
  constructor(
    message: string,
    public code: AgentErrorCode,
    public originalError?: Error,
  ) {
    super(message);
    this.name = "AgentError";
  }
}

export enum AgentErrorCode {
  LLM_API_FAILURE = "LLM_API_FAILURE",
  VECTOR_SEARCH_FAILURE = "VECTOR_SEARCH_FAILURE",
  INVALID_INPUT = "INVALID_INPUT",
  CONTENT_GENERATION_FAILURE = "CONTENT_GENERATION_FAILURE",
  TIMEOUT = "TIMEOUT",
  RATE_LIMIT_EXCEEDED = "RATE_LIMIT_EXCEEDED",
}

// ============================================================================
// Logging Types (CGL-26: Agent logging)
// ============================================================================

export interface AgentLog {
  timestamp: Date;
  sessionId: string;
  route: string;
  eventType: AgentLogEventType;
  details: Record<string, unknown>;
  duration?: number;
  success: boolean;
  error?: string;
}

export enum AgentLogEventType {
  AGENT_INVOKED = "AGENT_INVOKED",
  PROMPT_COMPOSED = "PROMPT_COMPOSED",
  VECTOR_SEARCH = "VECTOR_SEARCH",
  LLM_REQUEST = "LLM_REQUEST",
  LLM_RESPONSE = "LLM_RESPONSE",
  CONTENT_GENERATED = "CONTENT_GENERATED",
  ERROR_OCCURRED = "ERROR_OCCURRED",
}
