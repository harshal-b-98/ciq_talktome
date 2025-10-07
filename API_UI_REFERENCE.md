# API & UI Reference - CIQ Talk 2 Me Marketing Website

**Project:** CGL - Talk 2 Me Marketing Website
**Last Updated:** October 7, 2025
**Status:** Initial Setup

---

## Overview

This document serves as a comprehensive reference for all implemented features, API endpoints, UI components, and integrations in the CIQ Talk 2 Me Marketing Website project.

---

## Project Status

**Current Phase:** Foundation - Story CGL-2 Complete (Next.js App Structure)
**Tickets Completed:** 13/235 (CGL-3 through CGL-15)
**Last Ticket Worked On:** CGL-15 (Test routing and navigation flow)
**Story CGL-2 Status:** ✅ COMPLETE

---

## Implemented Features

### Routes

- ✅ `/` - Homepage
  - Hero section with headline and CTA buttons
  - Features preview with 3 feature cards (Real-Time Analytics, AI-Powered Insights, Secure & Reliable)
  - Call-to-action section with contact links
  - Fully responsive design

- ✅ `/features` - Features Index Page
  - Page header with title and description
  - 6 feature cards in responsive grid (3 columns on lg, 2 on md, 1 on mobile):
    - Real-Time Analytics
    - AI-Powered Insights
    - Market Intelligence
    - Product Tracking
    - Custom Dashboards
    - Enterprise Security
  - Each card has icon, title, description, and "Learn More" button
  - CTA section with demo request

- ✅ `/features/[slug]` - Dynamic Feature Detail Pages (6 pages)
  - Static generation with `generateStaticParams`
  - Breadcrumb navigation (Home > Features > Feature Name)
  - Feature header with title and description
  - Two-column layout (Key Features & Benefits)
  - Detailed content for each feature:
    - real-time-analytics
    - ai-powered-insights
    - market-intelligence
    - product-tracking
    - custom-dashboards
    - data-security
  - CTA section with demo scheduling
  - 404 handling with `notFound()` for invalid slugs
  - Dynamic metadata generation with `generateMetadata`

- ✅ `/about` - About Page
  - Company mission statement
  - Company story and background
  - 6 value cards with icons:
    - Innovation First
    - Customer Success
    - Data Privacy
    - Accuracy & Reliability
    - Transparency
    - Global Perspective
  - Team section
  - CTA section with contact and features links
  - Fully responsive layout

- ✅ `/contact` - Contact Page
  - Contact form with validation:
    - Full name, email, company name (required)
    - Phone number (optional)
    - Interest dropdown (demo, pricing, trial, partnership, support, other)
    - Message textarea (required)
  - Contact information cards:
    - Email addresses (sales, support)
    - Phone numbers (sales, support)
    - Office address
    - Business hours
  - Social media links (LinkedIn, Twitter, YouTube)
  - Two-column responsive layout

### API Endpoints

No API endpoints implemented yet.

### Loading States

- ✅ **Root Loading** (`src/app/loading.tsx`)
  - Centered spinner with "Loading..." text
- ✅ **About Loading** (`src/app/about/loading.tsx`)
  - Centered spinner with "Loading about page..." text
- ✅ **Contact Loading** (`src/app/contact/loading.tsx`)
  - Centered spinner with "Loading contact page..." text
- ✅ **Features Loading** (`src/app/features/loading.tsx`)
  - Centered spinner with "Loading features..." text
- ✅ **Feature Detail Loading** (`src/app/features/[slug]/loading.tsx`)
  - Centered spinner with "Loading feature details..." text

### Error Boundaries

- ✅ **Root Error** (`src/app/error.tsx`)
  - Client component with error logging
  - Error icon and message
  - "Try Again" and "Go Home" buttons
- ✅ **About Error** (`src/app/about/error.tsx`)
  - Context-specific error message for about page
- ✅ **Contact Error** (`src/app/contact/error.tsx`)
  - Context-specific error message for contact page
- ✅ **Features Error** (`src/app/features/error.tsx`)
  - Context-specific error message for features page
- ✅ **Feature Detail Error** (`src/app/features/[slug]/error.tsx`)
  - Context-specific error message with "View All Features" button

### SEO Metadata

- ✅ **Homepage Metadata** (`src/app/page.tsx`)
  - Title: "ConsumerIQ - AI-Powered Market Intelligence"
  - Description and keywords optimized for SEO
- ✅ **About Metadata** (`src/app/about/page.tsx`)
  - Title: "About Us - ConsumerIQ"
- ✅ **Contact Metadata** (`src/app/contact/page.tsx`)
  - Title: "Contact Us - ConsumerIQ"
- ✅ **Features Metadata** (`src/app/features/page.tsx`)
  - Title: "Features - ConsumerIQ"
- ✅ **Feature Detail Metadata** (`src/app/features/[slug]/page.tsx`)
  - Dynamic metadata with `generateMetadata`
  - Feature-specific titles and descriptions

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

#### CGL-8: Create features index route ✅
- Created features directory (`src/app/features/`)
- Implemented features index page (`src/app/features/page.tsx`)
- Page header with title and subtitle
- 6 detailed feature cards with icons:
  - Real-Time Analytics, AI-Powered Insights, Market Intelligence
  - Product Tracking, Custom Dashboards, Enterprise Security
- Each card includes:
  - Icon with primary color
  - Title and description
  - "Learn More" button linking to `/features/[slug]`
- Responsive grid layout (lg:3 cols, md:2 cols, mobile:1 col)
- CTA section with "Request a Demo" and "Learn About Us" buttons
- Build successful (compiled in 5.5s, added /features route)

#### CGL-9: Create dynamic feature detail route ✅
- Created dynamic route (`src/app/features/[slug]/page.tsx`)
- Implemented `generateStaticParams` for SSG (6 feature pages)
- Feature data structure with detailed content:
  - Title, description, key features list, benefits list
  - 6 features: real-time-analytics, ai-powered-insights, market-intelligence, product-tracking, custom-dashboards, data-security
- Page structure:
  - Breadcrumb navigation (Home > Features > Feature Name)
  - Hero section with feature title and description
  - Two-column grid layout:
    - Left: Key Features with checkmark icons
    - Right: Benefits with lightning icons
  - CTA section with demo and "View All Features" buttons
- 404 handling with `notFound()` for invalid slugs
- Fully responsive layout
- Build successful (compiled in 5.7s, 12 total pages including 6 dynamic routes)

#### CGL-10: Create about page route ✅
- Created `/about` page (`src/app/about/page.tsx`)
- Company mission section with border card
- Company story with two paragraphs
- 6 value cards in responsive grid (lg:3 cols, md:2 cols, mobile:1 col):
  - Innovation First, Customer Success, Data Privacy
  - Accuracy & Reliability, Transparency, Global Perspective
- Each value card has icon, title, and description
- Team section with border card
- CTA section with "Get in Touch" and "Explore Our Platform" buttons
- Build successful (added /about route)

#### CGL-11: Create contact page route ✅
- Created `/contact` page (`src/app/contact/page.tsx`)
- Two-column layout (form left, info right)
- Contact form with fields:
  - Full name, email, company (required)
  - Phone (optional)
  - Interest dropdown with 6 options
  - Message textarea (required)
  - Submit button
- Contact information section with 4 cards:
  - Email addresses (sales, support)
  - Phone numbers (sales, support)
  - Office address (San Francisco)
  - Business hours
- Social media links section (LinkedIn, Twitter, YouTube)
- Form uses native HTML input styling with Tailwind
- Build successful (added /contact route, 14 total pages)

#### CGL-12: Implement loading.tsx for each route ✅
- Created `loading.tsx` for root app
- Created `loading.tsx` for /about, /contact, /features, /features/[slug]
- Consistent loading UI across all routes:
  - Centered spinner with primary color
  - Context-specific loading text
  - Min-height 400px for proper centering
- Uses Tailwind animate-spin for spinner animation

#### CGL-13: Implement error.tsx for graceful error handling ✅
- Created `error.tsx` for root app (client component)
- Created `error.tsx` for /about, /contact, /features, /features/[slug]
- Consistent error UI across all routes:
  - Error icon in destructive color
  - Context-specific error message
  - "Try Again" button (calls reset function)
  - "Go Home" or contextual navigation button
- Error logging with useEffect
- Proper TypeScript types for error boundary props

#### CGL-14: Configure metadata API for SEO ✅
- Added metadata exports to homepage:
  - Title: "ConsumerIQ - AI-Powered Market Intelligence"
  - Description and keywords for SEO
- Added metadata to /about page:
  - Title: "About Us - ConsumerIQ"
- Added metadata to /contact page:
  - Title: "Contact Us - ConsumerIQ"
- Added metadata to /features page:
  - Title: "Features - ConsumerIQ"
- Implemented `generateMetadata` for /features/[slug]:
  - Dynamic titles like "Real-Time Analytics - ConsumerIQ"
  - Feature-specific descriptions
  - Proper handling for invalid slugs
- All metadata includes relevant keywords for SEO

#### CGL-15: Test routing and navigation flow ✅
- Verified build generates all 14 pages successfully
- Confirmed navigation component works with active state detection
- All routes have proper metadata, loading states, and error boundaries
- Static pages: /, /about, /contact, /features (4 pages)
- SSG pages: /features/[slug] (6 pages)
- Build successful (5.9s compilation)
- Total: 14 pages generated

**Story CGL-2 Complete:** Next.js App Structure with Core Routes ✅
- All 13 subtasks completed (CGL-3 through CGL-15)
- 5 main routes implemented with full error handling and loading states
- SEO metadata configured for all pages
- Fully responsive design across all routes
- Build time: ~6 seconds
- Total bundle size: ~134 KB First Load JS

---

## Next Steps

1. Identify first ticket to work on (likely CGL-2: Next.js App Structure)
2. Begin implementation following ticket-based workflow
3. Update this reference as features are built

---

_This document will be updated after each ticket completion with new endpoints, components, and implementation details._
