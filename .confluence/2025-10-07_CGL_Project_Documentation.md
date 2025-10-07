# CGL (Talk 2 Me) Marketing Website for CIQ GTM Launch - Project Documentation

**Last Updated:** October 7, 2025 (Comprehensive Review Completed)
**Project:** CGL
**Primary Assignee:** Harshal Bhatkar
**Project Reporter:** Kaviya Sree Ravikumar Meenakshi
**Total Tickets:** 235 tickets (CGL-1 through CGL-235)

---

## Executive Summary

The CGL project is building an AI-powered conversational marketing website for the CIQ GTM Launch. The system uses an intelligent Agent to deliver personalized content based on visitor personas, session history, and navigation patterns. All 235 tickets are currently in "To Do" status, indicating the project is in the initial planning and preparation phase.

---

## Project Status Summary

**Current State (as of October 7, 2025):**

* **Total Tickets:** 235 tickets
* **Epic:** 1 (CGL-1: Marketing Website v1)
* **Stories:** Multiple feature stories
* **Subtasks:** Majority of tickets are subtasks supporting parent stories
* **Status Distribution:** 100% in "To Do" status
* **Priority:** Predominantly Medium priority
* **Primary Assignee:** Harshal Bhatkar
* **Project Phase:** Initial planning and architecture definition

---

## Project Epic

### CGL-1: Marketing Website v1

**Type:** Epic
**Status:** To Do
**Description:** Top-level epic encompassing all features and functionality for the v1 marketing website launch.

---

## Core Features & Stories

### 1. Next.js App Structure with Core Routes (CGL-2)

**Description:** Foundation setup for the Next.js application with App Router and core page structure.

**Key Subtasks:**

* CGL-3: Initialize Next.js project with App Router and TypeScript ✅ DONE
* CGL-4: Configure tailwind.css and install shadcn/ui ✅ DONE
* CGL-5: Create root layout with header and footer components ✅ DONE
* CGL-6: Implement navigation component with active state
* CGL-7: Create homepage route (/app/page.tsx)
* CGL-8: Create features index route (/app/features/page.tsx)
* CGL-9: Create dynamic feature detail route (/app/features/[slug]/page.tsx)
* CGL-10: Create about page route (/app/about/page.tsx)
* CGL-11: Create contact page route (/app/contact/page.tsx)
* CGL-12: Implement loading.tsx for each route
* CGL-13: Implement error.tsx for graceful error handling
* CGL-14: Configure metadata API for SEO
* CGL-15: Test routing and navigation flow

### 2. Agent Core with Content Retrieval System (CGL-16)

**Description:** Build the intelligent Agent that powers personalized content delivery using LLM and vector search.

**Key Subtasks:**

* CGL-17: Choose LLM provider and orchestration framework (LangChain, Vercel AI SDK, etc.)
* CGL-18: Design Agent interface and input/output schemas
* CGL-19: Implement Agent main function (accepts context, returns content data)
* CGL-20: Build LLM prompt composition with context injection
* CGL-21: Create cold-start prompt strategy for first-time visitors
* CGL-22: Implement content retrieval from vector database
* CGL-23: Add content grounding guardrails (cite sources only)
* CGL-24: Build determinism controls (temperature, seed management)
* CGL-25: Implement error handling for LLM API failures
* CGL-26: Add logging for Agent decisions and content selections
* CGL-27: Create content data output schema (title, body, cta, related_links)
* CGL-28: Write unit tests for prompt composition
* CGL-29: Write integration tests for Agent with mock vector DB

### 3. Vector Database for Content Storage and Retrieval (CGL-30)

**Description:** Implement semantic search infrastructure for intelligent content matching based on visitor context.

**Key Subtasks:**

* CGL-31: Choose vector database (Pinecone, Weaviate, Supabase pgvector, etc.)
* CGL-32: Define content metadata schema (title, slug, tags, persona, feature, source)
* CGL-33: Design chunking strategy for long-form content
* CGL-34: Implement embedding generation pipeline (OpenAI, Cohere, etc.)
* CGL-35: Build vector database initialization and seeding
* CGL-36: Create semantic search interface for Agent
* CGL-37: Implement relevance scoring and ranking
* CGL-38: Build metadata filtering by persona and topic
* CGL-39: Separate Persona KB and Feature KB collections
* CGL-40: Add content citation/source tracking
* CGL-41: Implement content upsert mechanism for updates
* CGL-42: Optimize query performance (caching, indexing)
* CGL-43: Write unit tests for embedding and retrieval
* CGL-44: Write integration tests for Agent content retrieval

### 4. Session Management and Memory System (CGL-45)

**Description:** Track visitor sessions, build memory across visits, and enable personalization based on interaction history.

**Key Subtasks:**

* CGL-46: Choose session store (Redis, Vercel KV, database, etc.)
* CGL-47: Define session schema (session_id, user_metadata, visit_history, interactions)
* CGL-48: Implement session creation with secure cookie (httpOnly, secure, sameSite)
* CGL-49: Build session middleware for Next.js
* CGL-50: Create session read/write utilities for Server Components
* CGL-51: Implement visit summary generation (1-2 line summaries per page)
* CGL-52: Build interaction logging (clicks, chat, forms)
* CGL-53: Add persona confidence tracking to session
* CGL-54: Implement session retrieval optimization (caching)
* CGL-55: Build session expiration and cleanup logic
* CGL-56: Add session size limits to prevent bloat
* CGL-57: Write unit tests for session operations
* CGL-58: Write integration tests for session across requests

### 5. Server Components with Agent Integration (CGL-59)

**Description:** Implement Server Components that fetch personalized content from the Agent for each page.

**Key Subtasks:**

* CGL-60: Create Agent client utility for Server Components
* CGL-61: Implement session reading in Server Components
* CGL-62: Build content fetching logic for homepage
* CGL-63: Build content fetching logic for features index
* CGL-64: Build content fetching logic for feature detail pages
* CGL-65: Build content fetching logic for about page
* CGL-66: Implement content-to-component mapping logic
* CGL-67: Create reusable content rendering components (Hero, FeatureGrid, etc.)
* CGL-68: Add loading states during navigation
* CGL-69: Implement error boundaries with fallback UI
* CGL-70: Add metadata generation from Agent content
* CGL-71: Optimize Server Component caching strategy
* CGL-72: Write integration tests for full page rendering

### 6. Chat Interface with Server Actions (CGL-73)

**Description:** Build conversational chat widget that answers visitor questions using RAG on content corpus.

**Key Subtasks:**

* CGL-74: Create ChatWidget client component
* CGL-75: Design chat UI with message history and input
* CGL-76: Implement Server Action for chat message handling
* CGL-77: Build chat prompt composition with context
* CGL-78: Implement semantic search for user questions
* CGL-79: Create conversational response generation from retrieved content
* CGL-80: Add conversation memory management
* CGL-81: Build email capture prompt logic
* CGL-82: Implement chat state persistence
* CGL-83: Add typing indicators and loading states
* CGL-84: Create fallback responses for out-of-scope questions
* CGL-85: Build citation display in chat responses
* CGL-86: Add chat history export functionality
* CGL-87: Implement rate limiting for chat
* CGL-88: Write integration tests for chat flow

### 7. Personalization Based on Session Context (CGL-154-163)

**Description:** Dynamic content personalization based on returning visitor history and preferences.

**Key Subtasks:**

* CGL-155: Build context-aware prompt composition for Agent
* CGL-156: Inject visit history summaries into Agent prompt
* CGL-157: Implement personalization logic based on session
* CGL-158: Add persona-aware content filtering
* CGL-159: Generate contextual CTAs based on journey
* CGL-160: Prevent content repetition across visits
* CGL-161: Update session memory with new visit
* CGL-162: Write integration tests for returning visitor flow
* CGL-163: Test personalization across multiple sessions

### 8. Navigation with Context Preservation (CGL-164-173)

**Description:** Fluid navigation that maintains session context and adapts content based on user journey.

**Key Subtasks:**

* CGL-165: Implement Link components with session awareness
* CGL-166: Build referrer tracking in session
* CGL-167: Create context-aware prompts for each route
* CGL-168: Implement navigation breadcrumb component
* CGL-169: Add related content suggestions based on journey
* CGL-170: Build page transition loading states
* CGL-171: Update session memory on each navigation
* CGL-172: Test navigation flow across multiple pages
* CGL-173: Write integration tests for contextual navigation

### 9. Conversation Summary Feature (CGL-174-183)

**Description:** Allows users to request a summary of their session for review and sharing.

**Key Subtasks:**

* CGL-175: Design summary request UI
* CGL-176: Implement Server Action for summary generation
* CGL-177: Retrieve session history from memory store
* CGL-178: Build summary composition prompt for Agent
* CGL-179: Create summary formatting logic
* CGL-180: Design summary display component
* CGL-181: Add optional email/download functionality
* CGL-182: Write integration tests for summary generation
* CGL-183: Test summary quality with various session lengths

### 10. Logging, Monitoring, and Analytics (CGL-184-196)

**Description:** Comprehensive observability system to track user behavior, system performance, and debug issues.

**Key Subtasks:**

* CGL-185: Choose logging/monitoring solution
* CGL-186: Define logging schema (event_type, session_id, timestamp, metadata)
* CGL-187: Implement structured logging throughout application
* CGL-188: Add Agent decision and content selection logging
* CGL-189: Log LLM prompts/responses with PII masking
* CGL-190: Capture performance metrics (Core Web Vitals, custom)
* CGL-191: Build analytics dashboard or configure third-party
* CGL-192: Implement error tracking and alerting
* CGL-193: Add log retention and archival strategy
* CGL-194: Create common debugging queries
* CGL-195: Document logging and monitoring setup
* CGL-196: Test logging in development and production

### 11. Security, Rate Limiting, and Input Sanitization (CGL-197-210)

**Description:** Comprehensive security measures to protect against attacks, abuse, and ensure data safety.

**Key Subtasks:**

* CGL-198: Choose rate limiting solution
* CGL-199: Implement input validation schemas for all Server Actions
* CGL-200: Build rate limiting middleware (per session, per IP)
* CGL-201: Create input sanitization for user text
* CGL-202: Implement prompt injection detection
* CGL-203: Configure secure session cookies
* CGL-204: Add PII masking in logs
* CGL-205: Set up CORS policies for API routes
* CGL-206: Implement authentication for sensitive endpoints
* CGL-207: Configure security headers (CSP, HSTS, etc.)
* CGL-208: Set up automated security scanning
* CGL-209: Write security test suite
* CGL-210: Document security practices

### 12. Email Capture to CRM Integration (CGL-211-222) 🔮 FUTURE

**Description:** Automatically captures visitor emails and syncs them to CRM with conversation context and metadata.

**Key Subtasks:**

* CGL-212: Choose CRM (HubSpot, Salesforce, custom)
* CGL-213: Define CRM contact schema
* CGL-214: Build CRM API client
* CGL-215: Implement upsert logic (create or update)
* CGL-216: Add persona and session metadata to contact
* CGL-217: Create email service integration
* CGL-218: Build conversation summary email template
* CGL-219: Implement email sending to visitor
* CGL-220: Add CRM upsert logging
* CGL-221: Build error handling and retry logic
* CGL-222: Write integration tests for CRM flow

**Acceptance Criteria:**

* Email capture triggers CRM upsert flow
* Contact record includes email, persona, session_id, timestamps
* CRM upsert is idempotent (updates existing or creates new)
* Optional: visitor receives conversation summary via email
* CRM upsert status logged
* Errors handled gracefully with retry logic
* Confirmation shown to user

### 13. CMS to Vector Store Reindexing Pipeline (CGL-223-235) 🔮 FUTURE

**Description:** Automated reindexing system that syncs CMS updates to the vector store for AI-powered content retrieval.

**Key Subtasks:**

* CGL-224: Choose CMS integration approach
* CGL-225: Design CMS webhook for content updates
* CGL-226: Implement webhook listener
* CGL-227: Build content export from CMS
* CGL-228: Create content chunking strategy
* CGL-229: Implement embedding generation pipeline
* CGL-230: Build vector DB upsert with metadata
* CGL-231: Add optional LLM QA for brand checking
* CGL-232: Build reindex status logging
* CGL-233: Add error handling and notifications
* CGL-234: Write integration tests for CMS-to-vector flow
* CGL-235: Test incremental vs full reindex

**Acceptance Criteria:**

* CMS publish triggers reindex webhook
* Indexer exports updated content from CMS
* Content chunked appropriately for embedding
* Embeddings generated for all chunks
* Vector DB updated with new embeddings and metadata
* Optional: LLM QA checks content for brand compliance
* Agent retrieval uses refreshed corpus automatically
* Reindex process logs status and errors

---

## Technical Stack & Architecture

### Frontend

* **Framework:** Next.js 14+ with App Router
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **UI Components:** shadcn/ui
* **State Management:** React hooks and session management

### Backend

* **API Layer:** Next.js Server Actions
* **AI/LLM Integration:** Agent-based architecture with RAG
* **LLM Provider:** TBD (OpenAI, Anthropic, or alternatives)
* **Orchestration:** TBD (LangChain, Vercel AI SDK, or custom)
* **Vector Database:** TBD (Pinecone, Weaviate, Supabase pgvector)
* **Session Store:** TBD (Redis, Vercel KV, or database)
* **Session Management:** Secure cookie-based with memory store

### Infrastructure

* **Hosting:** Vercel (inferred from references)
* **CMS:** TBD - webhook-based integration planned
* **CRM:** TBD - HubSpot, Salesforce, or custom
* **Monitoring:** TBD - Vercel Analytics, Datadog, or alternatives
* **Email Service:** TBD - for visitor communication

### Security

* Input validation with schemas
* Rate limiting per session and IP
* PII masking in logs
* Prompt injection detection
* Secure session cookies (httpOnly, secure, sameSite)
* CORS policies
* Security headers (CSP, HSTS)
* Automated security scanning

---

## Technology Decisions Required

The following technology selections need to be made before implementation:

1. **LLM Provider & Orchestration**

    * Provider: OpenAI, Anthropic Claude, Cohere, or alternatives
    * Framework: LangChain, Vercel AI SDK, or custom

2. **Vector Database**

    * Options: Pinecone, Weaviate, Supabase pgvector, or alternatives

3. **Session Store**

    * Options: Redis, Vercel KV, PostgreSQL, or alternatives

4. **CMS Platform** (Future)

    * Webhook-capable CMS for content management

5. **CRM Platform** (Future)

    * Options: HubSpot, Salesforce, or custom solution

6. **Monitoring & Analytics**

    * Options: Vercel Analytics, Datadog, custom solution

7. **Rate Limiting Solution**

    * Options: Vercel Rate Limit, Upstash, custom middleware

8. **Email Service** (Future)

    * Options: SendGrid, Postmark, AWS SES, or alternatives


---

## Project Labels & Categories

### Backend Labels

* backend
* infrastructure
* security
* observability
* integration
* crm
* content

### Frontend Labels

* frontend
* ui
* navigation
* summary
* chat

### Feature Labels

* future - Features planned for later phases (CGL-211, CGL-223)

---

## Project Timeline & Milestones

### Phase 1: Foundation (Core Infrastructure)

**Estimated Stories:** CGL-2, CGL-16, CGL-30, CGL-45

* Next.js application setup
* Basic Agent and vector DB integration
* Session management foundation
* Initial content structure

### Phase 2: Content & Personalization

**Estimated Stories:** CGL-59, CGL-154, CGL-164

* Server Components with Agent
* Context-aware personalization
* Navigation with memory
* Dynamic content delivery

### Phase 3: Interactive Features

**Estimated Stories:** CGL-73, CGL-174

* Chat interface with RAG
* Conversation summaries
* Enhanced user engagement

### Phase 4: Observability & Security

**Estimated Stories:** CGL-184, CGL-197

* Comprehensive logging and monitoring
* Security hardening
* Rate limiting and input validation
* Performance optimization

### Phase 5: Advanced Integrations (FUTURE)

**Estimated Stories:** CGL-211, CGL-223

* CRM integration with email capture
* CMS-to-vector reindexing pipeline
* Production-ready automation

---

## Success Metrics

### User Engagement

* Session duration and return visits
* Chat interaction rates
* Email capture conversion
* Navigation patterns and page views

### Content Performance

* Content relevance scores
* Search result quality
* Personalization effectiveness
* Agent response accuracy

### Technical Performance

* Page load times (Core Web Vitals)
* API response times
* Cache hit rates
* Error rates and availability

### Business Metrics

* Lead generation (email captures)
* CRM contact quality
* Conversion funnel progression
* User satisfaction indicators
