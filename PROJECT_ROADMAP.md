# CGL Project Roadmap - Epic & Story Analysis

**Project:** CIQ Talk 2 Me Marketing Website (CGL)
**Last Updated:** October 7, 2025
**Total Tickets:** 235 (CGL-1 through CGL-235)
**Completed:** 26/235 (11%)

---

## Epic Overview

### CGL-1: Marketing Website v1 (Epic)

**Description:** AI-powered conversational marketing website for CIQ GTM Launch with intelligent Agent delivering personalized content based on visitor personas, session history, and navigation patterns.

**Vision:** Create a next-generation marketing website that adapts to each visitor's journey, providing relevant information at every step through AI-powered content generation and session memory.

---

## All Stories (13 Total)

### ✅ **COMPLETED STORIES**

#### Story CGL-2: Next.js App Structure with Core Routes
- **Tickets:** CGL-3 through CGL-15 (13 tickets)
- **Status:** ✅ COMPLETE
- **Dependencies:** None (Foundation)
- **Deliverables:**
  - 5 routes: /, /about, /contact, /features, /features/[slug]
  - 14 total pages with loading & error states
  - SEO metadata, responsive navigation
  - Build time: ~6 seconds, 134 KB bundle

#### Story CGL-16: Agent Core with Content Retrieval System
- **Tickets:** CGL-17 through CGL-29 (13 tickets)
- **Status:** ✅ COMPLETE
- **Dependencies:** Story CGL-2
- **Deliverables:**
  - Agent with LLM integration (OpenAI + Vercel AI SDK)
  - Prompt composition with cold-start & returning visitor strategies
  - Mock vector store for content retrieval
  - Logging, error handling, determinism controls
  - Ready for real vector DB integration

---

## 🚀 **PHASE 1: FOUNDATION (Core Infrastructure)**

These stories establish the core infrastructure and must be completed sequentially.

### **NEXT PRIORITY** → Story CGL-30: Vector Database for Content Storage
- **Tickets:** CGL-31 through CGL-44 (14 tickets)
- **Dependencies:** Story CGL-16 (Agent Core)
- **Why First:**
  - Required by all subsequent stories for content retrieval
  - Agent currently uses mock vector store
  - Blocks personalization, chat, and dynamic content features
- **Deliverables:**
  - Choose vector DB (Pinecone, Weaviate, or Supabase pgvector)
  - Content metadata schema & chunking strategy
  - Embedding generation pipeline
  - Semantic search with persona/topic filtering
  - Separate Persona KB and Feature KB collections
- **Key Tasks:**
  - CGL-31: Choose vector database ⚠️ DECISION NEEDED
  - CGL-32: Define content metadata schema
  - CGL-34: Implement embedding generation
  - CGL-35: Build vector DB initialization
  - CGL-36: Create semantic search interface

### **SECOND PRIORITY** → Story CGL-45: Session Management and Memory System
- **Tickets:** CGL-46 through CGL-58 (13 tickets)
- **Dependencies:** Story CGL-2 (App Structure)
- **Why Second:**
  - Required for personalization and context-aware content
  - Can start while vector DB work is in progress
  - Enables all personalization features
- **Deliverables:**
  - Choose session store (Redis, Vercel KV, or database)
  - Session schema with visit history & interactions
  - Secure cookie implementation
  - Session middleware for Next.js
  - Visit summary generation & persona tracking
- **Key Tasks:**
  - CGL-46: Choose session store ⚠️ DECISION NEEDED
  - CGL-47: Define session schema
  - CGL-48: Implement session creation
  - CGL-49: Build session middleware
  - CGL-51: Implement visit summary generation

---

## 📊 **PHASE 2: CONTENT & PERSONALIZATION**

These stories activate the Agent to deliver personalized content.

### **THIRD PRIORITY** → Story CGL-59: Server Components with Agent Integration
- **Tickets:** CGL-60 through CGL-72 (13 tickets)
- **Dependencies:** Story CGL-16 (Agent), Story CGL-30 (Vector DB), Story CGL-45 (Session)
- **Why Third:**
  - Brings the Agent to life on actual pages
  - Makes content dynamic and personalized
  - Core value proposition of the project
- **Deliverables:**
  - Agent client utility for Server Components
  - Content fetching for all pages (home, features, about)
  - Content-to-component mapping
  - Reusable rendering components
  - Metadata generation from Agent

### Story CGL-154-163: Personalization Based on Session Context
- **Tickets:** CGL-155 through CGL-163 (9 tickets)
- **Dependencies:** Story CGL-59 (Server Components), Story CGL-45 (Session)
- **Deliverables:**
  - Context-aware prompt composition
  - Visit history injection into prompts
  - Persona-aware content filtering
  - Contextual CTAs based on journey
  - Content repetition prevention

### Story CGL-164-173: Navigation with Context Preservation
- **Tickets:** CGL-165 through CGL-173 (9 tickets)
- **Dependencies:** Story CGL-45 (Session)
- **Deliverables:**
  - Session-aware Link components
  - Referrer tracking
  - Context-aware prompts per route
  - Related content suggestions
  - Session memory updates on navigation

---

## 💬 **PHASE 3: INTERACTIVE FEATURES**

These stories add conversational capabilities.

### Story CGL-73: Chat Interface with Server Actions
- **Tickets:** CGL-74 through CGL-88 (15 tickets)
- **Dependencies:** Story CGL-16 (Agent), Story CGL-30 (Vector DB), Story CGL-45 (Session)
- **Deliverables:**
  - ChatWidget client component
  - Server Action for chat message handling
  - Conversational response generation with RAG
  - Email capture prompt logic
  - Rate limiting for chat

### Story CGL-174-183: Conversation Summary Feature
- **Tickets:** CGL-175 through CGL-183 (9 tickets)
- **Dependencies:** Story CGL-45 (Session), Story CGL-73 (Chat)
- **Deliverables:**
  - Summary request UI
  - Server Action for summary generation
  - Summary composition from session history
  - Optional email/download functionality

---

## 🔒 **PHASE 4: OBSERVABILITY & SECURITY**

These stories ensure production readiness.

### Story CGL-184-196: Logging, Monitoring, and Analytics
- **Tickets:** CGL-185 through CGL-196 (12 tickets)
- **Dependencies:** None (can be done in parallel)
- **Deliverables:**
  - Choose monitoring solution ⚠️ DECISION NEEDED
  - Structured logging throughout app
  - Agent decision logging
  - Performance metrics (Core Web Vitals)
  - Analytics dashboard
  - Error tracking and alerting

### Story CGL-197-210: Security, Rate Limiting, and Input Sanitization
- **Tickets:** CGL-198 through CGL-210 (13 tickets)
- **Dependencies:** None (can be done in parallel)
- **Deliverables:**
  - Rate limiting middleware
  - Input validation schemas
  - Input sanitization
  - Prompt injection detection
  - Secure session cookies
  - Security headers (CSP, HSTS)
  - Automated security scanning

---

## 🔮 **PHASE 5: ADVANCED INTEGRATIONS (FUTURE)**

These stories are marked for future phases.

### Story CGL-211-222: Email Capture to CRM Integration
- **Tickets:** CGL-212 through CGL-222 (11 tickets)
- **Status:** 🔮 FUTURE
- **Dependencies:** Story CGL-73 (Chat), Story CGL-45 (Session)
- **Deliverables:**
  - CRM integration (HubSpot/Salesforce)
  - Email capture flow
  - Conversation summary emails
  - CRM upsert with persona metadata

### Story CGL-223-235: CMS to Vector Store Reindexing Pipeline
- **Tickets:** CGL-224 through CGL-235 (12 tickets)
- **Status:** 🔮 FUTURE
- **Dependencies:** Story CGL-30 (Vector DB)
- **Deliverables:**
  - CMS webhook integration
  - Content export & chunking
  - Automated embedding generation
  - Vector DB upsert pipeline
  - Optional LLM QA for brand compliance

---

## 🎯 **RECOMMENDED EXECUTION ORDER**

### **Immediate Next Steps (Phase 1 - Foundation)**

1. **Story CGL-30: Vector Database** (CGL-31 to CGL-44)
   - Critical blocker for all content features
   - Replaces mock vector store
   - Enables real semantic search

2. **Story CGL-45: Session Management** (CGL-46 to CGL-58)
   - Can start in parallel with vector DB
   - Required for personalization
   - Enables memory across visits

### **After Foundation (Phase 2 - Content & Personalization)**

3. **Story CGL-59: Server Components with Agent** (CGL-60 to CGL-72)
   - Brings Agent to life on pages
   - Core value proposition

4. **Story CGL-154-163: Personalization** (parallel with #3)
   - Enhances content relevance
   - Leverages session history

5. **Story CGL-164-173: Navigation Context** (parallel with #3)
   - Improves user journey tracking
   - Lightweight implementation

### **Interactive Layer (Phase 3)**

6. **Story CGL-73: Chat Interface** (CGL-74 to CGL-88)
   - Major feature addition
   - Requires foundation stories

7. **Story CGL-174-183: Conversation Summary**
   - Builds on chat feature
   - Nice-to-have enhancement

### **Production Readiness (Phase 4)**

8. **Story CGL-184-196: Monitoring & Analytics** (parallel)
   - Essential for production
   - Can be implemented incrementally

9. **Story CGL-197-210: Security & Rate Limiting** (parallel)
   - Critical before launch
   - Can be implemented incrementally

### **Future Enhancements (Phase 5)**

10. **Story CGL-211-222: CRM Integration** (future)
11. **Story CGL-223-235: CMS Pipeline** (future)

---

## 🚨 **CRITICAL DECISIONS REQUIRED**

Before continuing, these technology decisions must be made:

1. **Vector Database Selection** (Story CGL-30)
   - Options: Pinecone, Weaviate, Supabase pgvector
   - Impact: All content retrieval features

2. **Session Store Selection** (Story CGL-45)
   - Options: Redis, Vercel KV, PostgreSQL
   - Impact: All personalization features

3. **Monitoring Solution** (Story CGL-184)
   - Options: Vercel Analytics, Datadog, custom
   - Impact: Observability and debugging

4. **Rate Limiting Solution** (Story CGL-197)
   - Options: Vercel Rate Limit, Upstash, custom middleware
   - Impact: Security and abuse prevention

---

## 📈 **Progress Tracking**

**Current Status:**
- ✅ Phase 1: 2/4 stories complete (CGL-2, CGL-16)
- ⏳ Phase 1: 2/4 stories remaining (CGL-30, CGL-45)
- 📅 Phases 2-5: 9 stories pending

**Completion:**
- 26/235 tickets completed (11%)
- 209/235 tickets remaining (89%)
- 2/13 stories completed (15%)
- 11/13 stories remaining (85%)

**Next Milestone:**
Complete Phase 1 (Foundation) by finishing stories CGL-30 and CGL-45
