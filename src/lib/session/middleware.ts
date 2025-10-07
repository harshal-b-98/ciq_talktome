/**
 * Session Middleware for Next.js
 * CGL-49: Build session middleware for Next.js
 *
 * Note: This is a utility for Server Components, not traditional middleware
 * Next.js 15 Server Components handle sessions per-request
 */

import { headers } from "next/headers";
import { getOrCreateSession, recordVisit } from "./utils";
import type { Session } from "./types";

// ============================================================================
// Session Middleware for Server Components
// ============================================================================

/**
 * Initialize session for a Server Component request
 * Call this at the start of page.tsx Server Components
 *
 * @param route - Current route path
 * @returns Session object
 *
 * @example
 * ```typescript
 * export default async function HomePage() {
 *   const session = await initializeSession('/');
 *
 *   // Use session data for personalization
 *   const isReturning = session.flags.isReturningVisitor;
 *
 *   return <div>...</div>;
 * }
 * ```
 */
export async function initializeSession(route: string): Promise<Session> {
  // Get headers to extract referrer and UTM params
  const headersList = await headers();
  const referrer = headersList.get("referer") || undefined;

  // Parse UTM params from referrer if available
  const utmParams = extractUTMParams(referrer);

  // Get or create session
  const session = await getOrCreateSession(referrer, utmParams);

  // Record the visit
  await recordVisit(route, referrer);

  return session;
}

/**
 * Extract UTM parameters from URL
 */
function extractUTMParams(url?: string): Record<string, string> | undefined {
  if (!url) {
    return undefined;
  }

  try {
    const parsedUrl = new URL(url);
    const utmParams: Record<string, string> = {};

    const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

    utmKeys.forEach((key) => {
      const value = parsedUrl.searchParams.get(key);
      if (value) {
        utmParams[key] = value;
      }
    });

    return Object.keys(utmParams).length > 0 ? utmParams : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Get user agent for bot detection
 */
export async function getUserAgent(): Promise<string | null> {
  const headersList = await headers();
  return headersList.get("user-agent");
}

/**
 * Detect if request is from a bot
 */
export async function isBot(): Promise<boolean> {
  const userAgent = await getUserAgent();
  if (!userAgent) {
    return false;
  }

  const botPatterns = [
    /bot/i,
    /crawler/i,
    /spider/i,
    /crawling/i,
    /google/i,
    /bing/i,
    /yahoo/i,
    /duckduckgo/i,
  ];

  return botPatterns.some((pattern) => pattern.test(userAgent));
}
