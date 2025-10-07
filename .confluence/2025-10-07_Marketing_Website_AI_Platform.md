# Marketing Website - AI-Driven Platform

This section documents the development of the ConsumerIQ AI-Driven Marketing Website, an intelligent platform that personalizes content based on user behavior, session history, and persona classification.

## Project Overview

**Epic:** [CGL-1 - Marketing Website v1](https://twenty20systems.atlassian.net/browse/CGL-1)

**Goal:** Build an AI-powered marketing website using Next.js App Router where content is intelligently generated and personalized by an LLM-orchestrated Agent.

### Key Capabilities

* Anonymous users load pages with AI-generated content via Server Components
* Returning users experience personalized content based on session history
* Users interact via navigation, chat messages, and form submissions
* All content grounded in curated FAQ/marketing material (no fabrication)
* Session memory maintains context across page views
* Persona classification adapts content tone and feature recommendations
* Email capture flow triggers at optimal confidence threshold

## Technical Architecture

### Core Technologies

* **Framework:** Next.js 14+ with App Router
* **AI/LLM:** Vercel AI SDK / LangChain with Claude/GPT
* **Database:** Supabase PostgreSQL
* **Vector Store:** Pinecone / Weaviate / pgvector
* **Session Store:** Redis / Vercel KV
* **UI Components:** Shadcn/ui with Tailwind CSS
* **Deployment:** Vercel

### System Components

1. **Presentation Layer:** Next.js Server Components with dynamic routing
2. **AI Agent:** LLM-orchestrated content recommendations with three tools:


    * Content Index (Vector DB)
    * Memory & Session Store
    * Persona Classifier

3. **Data Layer:** Multi-storage architecture for sources, sessions, and targets
4. **Security Layer:** Rate limiting, input sanitization, prompt injection protection

---

## Project Structure

### Foundation Phase (Stories 1-7)

Core infrastructure, data layer, and integration capabilities

| **Story 1** | [Next.js App Structure with Core Routes](https://twenty20systems.atlassian.net/browse/CGL-2) | 13 subtasks |
| --- | --- | --- |
| **Story 2** | [Agent Core with Content Retrieval](https://twenty20systems.atlassian.net/browse/CGL-16) | 13 subtasks |
| **Story 3** | [Vector Database Storage & Retrieval](https://twenty20systems.atlassian.net/browse/CGL-30) | 14 subtasks |
| **Story 4** | [Session Management & Memory](https://twenty20systems.atlassian.net/browse/CGL-45) | 13 subtasks |
| **Story 5** | [Server Components with Agent](https://twenty20systems.atlassian.net/browse/CGL-59) | 13 subtasks |
| **Story 6** | [Chat Interface with Server Actions](https://twenty20systems.atlassian.net/browse/CGL-73) | 13 subtasks |
| **Story 7** | [Form Handling with Server Actions](https://twenty20systems.atlassian.net/browse/CGL-87) | 14 subtasks |

### Enhancement Phase (Stories 8-16)

Personalization, user journeys, quality, and security features

| **Story 8** | [Persona Classification System](https://twenty20systems.atlassian.net/browse/CGL-102) | 13 subtasks |
| --- | --- | --- |
| **Story 9** | [Email Capture Flow](https://twenty20systems.atlassian.net/browse/CGL-116) | 11 subtasks |
| **Story 10** | [Persona & Feature Knowledge Bases](https://twenty20systems.atlassian.net/browse/CGL-128) | 13 subtasks |
| **Story 11** | [Anonymous First-Time Visit Flow](https://twenty20systems.atlassian.net/browse/CGL-142) | 10 subtasks |
| **Story 12** | [Returning Visitor Flow](https://twenty20systems.atlassian.net/browse/CGL-153) | 10 subtasks |
| **Story 13** | [Navigation with Context](https://twenty20systems.atlassian.net/browse/CGL-164) | 9 subtasks |
| **Story 14** | [Conversation Summary Feature](https://twenty20systems.atlassian.net/browse/CGL-174) | 9 subtasks |
| **Story 15** | [Logging, Monitoring & Analytics](https://twenty20systems.atlassian.net/browse/CGL-184) | 12 subtasks |
| **Story 16** | [Security & Rate Limiting](https://twenty20systems.atlassian.net/browse/CGL-197) | 13 subtasks |

### Future Integrations (Stories 17-18)

CRM and CMS pipeline integrations for production operations

| **Story 17** | [Email Capture to CRM Integration](https://twenty20systems.atlassian.net/browse/CGL-211) | 11 subtasks |
| --- | --- | --- |
| **Story 18** | [CMS to Vector Store Pipeline](https://twenty20systems.atlassian.net/browse/CGL-223) | 12 subtasks |

---

## Total Project Scope

**Total Stories:** 18

**Total Subtasks:** 210+

**Estimated Timeline:** 12-16 weeks

## Dependencies Flow

```
Story 1 (App Structure)
  ├─> Story 5 (Server Components)

Story 3 (Vector DB)
  ├─> Story 2 (Agent Core)
  └─> Story 10 (Knowledge Bases)

Story 2 (Agent Core)
  ├─> Story 5 (Server Components)
  ├─> Story 6 (Chat Interface)
  ├─> Story 8 (Persona Classification)
  └─> Story 11 (First-Time Visit)

Story 4 (Session Management)
  ├─> Story 5 (Server Components)
  ├─> Story 6 (Chat Interface)
  ├─> Story 11 (First-Time Visit)
  ├─> Story 12 (Returning Visitor)
  └─> Story 14 (Summary)

Story 5 (Server Components)
  ├─> Story 11 (First-Time Visit)
  ├─> Story 12 (Returning Visitor)
  └─> Story 13 (Navigation)

Story 7 (Forms)
  └─> Story 9 (Email Capture)

Story 8 (Persona)
  └─> Story 9 (Email Capture)
```

---

## Team

* **Project:** CIQ - GTM Launch
* **Team:** CIQ - Marketing
* **Assignee:** Harshal Bhatkar
* **Jira Board:** [CGL Board](https://twenty20systems.atlassian.net/jira/software/c/projects/CGL/boards)

---

_Last Updated: October 6, 2025_
