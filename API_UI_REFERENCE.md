# API & UI Reference - CIQ Talk 2 Me Marketing Website

**Project:** CGL - Talk 2 Me Marketing Website
**Last Updated:** October 7, 2025
**Status:** Initial Setup

---

## Overview

This document serves as a comprehensive reference for all implemented features, API endpoints, UI components, and integrations in the CIQ Talk 2 Me Marketing Website project.

---

## Project Status

**Current Phase:** Foundation - Story 1 (Next.js App Structure)
**Tickets Completed:** 5/235 (CGL-3, CGL-4, CGL-5, CGL-6, CGL-7)
**Last Ticket Worked On:** CGL-7 (Create homepage route)

---

## Implemented Features

### Routes

- ✅ `/` - Homepage
  - Hero section with headline and CTA buttons
  - Features preview with 3 feature cards (Real-Time Analytics, AI-Powered Insights, Secure & Reliable)
  - Call-to-action section with contact links
  - Fully responsive design

### API Endpoints

No API endpoints implemented yet.

### UI Components

#### Layout Components
- ✅ **Header** (`src/components/header.tsx`)
  - Persistent header with logo and navigation
  - Integrates Navigation component
  - Responsive design

- ✅ **Navigation** (`src/components/navigation.tsx`)
  - Client component with active state tracking
  - Uses `usePathname()` hook for route detection
  - Active link styling with visual feedback
  - Links: Home, Features, About, Contact
  - Responsive (hidden on mobile, shown on md+)

- ✅ **Footer** (`src/components/footer.tsx`)
  - Copyright notice with dynamic year
  - Quick links to About and Contact
  - Responsive layout

#### shadcn/ui Components
- ✅ **Button** (`src/components/ui/button.tsx`)
  - Variants: default, destructive, outline, secondary, ghost, link
  - Sizes: default, sm, lg, icon
  - Supports `asChild` prop for composition

### Database Schema

No database schema implemented yet.

### Vector Store Collections

No vector store collections implemented yet.

---

## Dependencies Installed

### Core
- `next@15.5.4` - Next.js framework
- `react@19.1.0` - React library
- `react-dom@19.1.0` - React DOM
- `typescript@^5` - TypeScript

### Styling
- `tailwindcss@^4` - Tailwind CSS v4
- `@tailwindcss/postcss@^4` - Tailwind PostCSS plugin

### shadcn/ui & Utilities
- `@radix-ui/react-slot@^1.2.3` - Radix UI Slot primitive
- `class-variance-authority@^0.7.1` - CVA for variant management
- `clsx@^2.1.1` - Conditional class names
- `tailwind-merge@^3.3.1` - Merge Tailwind classes

---

## Configuration Files

- ✅ `components.json` - shadcn/ui configuration
- ✅ `src/lib/utils.ts` - cn() utility function
- ✅ `src/app/globals.css` - Global styles with shadcn/ui CSS variables
- ✅ `tsconfig.json` - TypeScript config with @/* path alias

---

## Technology Stack Decisions

### Decided
- **Framework:** Next.js 14+ with App Router (from project documentation)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui

### To Be Decided
- **LLM Provider:** TBD (OpenAI, Anthropic, Cohere)
- **Orchestration Framework:** TBD (LangChain, Vercel AI SDK, custom)
- **Vector Database:** TBD (Pinecone, Weaviate, Supabase pgvector)
- **Session Store:** TBD (Redis, Vercel KV, database)
- **Monitoring Solution:** TBD (Vercel Analytics, Datadog, custom)
- **Rate Limiting:** TBD (Vercel Rate Limit, Upstash, custom)

---

## Session History

### October 7, 2025 - Session 1

#### Initialization
- Initialized project with Claude Code
- Downloaded Confluence documentation to `.confluence/` directory
- Created API_UI_REFERENCE.md for tracking implementations

#### CGL-4: Configure tailwind.css and install shadcn/ui ✅
- Configured Tailwind CSS v4 with shadcn/ui CSS variables
- Created `components.json` for shadcn/ui configuration
- Installed dependencies: clsx, tailwind-merge, class-variance-authority, @radix-ui/react-slot
- Created `src/lib/utils.ts` with cn() helper function
- Created Button component (`src/components/ui/button.tsx`)
- Updated homepage to test Button component
- Build successful (compiled in 32.6s)

#### CGL-5: Create root layout with header and footer components ✅
- Created Header component (`src/components/header.tsx`) with navigation links
- Created Footer component (`src/components/footer.tsx`) with copyright and quick links
- Updated root layout (`src/app/layout.tsx`) to include Header and Footer
- Implemented flex layout with sticky header/footer
- Updated metadata (title: "ConsumerIQ - Talk 2 Me")
- Build successful (compiled in 20.8s)

#### CGL-6: Implement navigation component with active state ✅
- Created Navigation component (`src/components/navigation.tsx`) as client component
- Implemented active state detection using `usePathname()` hook
- Active link styling: foreground color for active, muted-foreground for inactive
- Smart route matching: exact match for home ("/"), prefix match for others
- Refactored Header to use Navigation component
- Build successful (compiled in 6.1s)

#### CGL-7: Create homepage route ✅
- Redesigned homepage (`src/app/page.tsx`) with marketing-focused content
- Implemented hero section with headline and CTA buttons
- Added features preview section with 3 feature cards:
  - Real-Time Analytics (chart icon)
  - AI-Powered Insights (lightning icon)
  - Secure & Reliable (lock icon)
- Created CTA section with contact and learn more links
- Removed Next.js boilerplate content
- Fully responsive design with mobile-first approach
- Build successful (compiled in 5.1s)

---

## Next Steps

1. Identify first ticket to work on (likely CGL-2: Next.js App Structure)
2. Begin implementation following ticket-based workflow
3. Update this reference as features are built

---

_This document will be updated after each ticket completion with new endpoints, components, and implementation details._
