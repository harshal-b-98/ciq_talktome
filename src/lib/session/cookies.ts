/**
 * Cookie Management Utilities
 * CGL-48: Implement session creation with secure cookie (httpOnly, secure, sameSite)
 */

import { cookies } from "next/headers";
import type { CookieConfig } from "./types";
import { DEFAULT_COOKIE_CONFIG } from "./types";

// ============================================================================
// Cookie Configuration
// ============================================================================

const cookieConfig: CookieConfig = DEFAULT_COOKIE_CONFIG as CookieConfig;

// ============================================================================
// Cookie Operations
// ============================================================================

/**
 * Set session cookie
 */
export async function setSessionCookie(sessionId: string): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set(cookieConfig.name, sessionId, {
    httpOnly: cookieConfig.httpOnly,
    secure: cookieConfig.secure,
    sameSite: cookieConfig.sameSite,
    maxAge: cookieConfig.maxAge,
    path: cookieConfig.path,
  });
}

/**
 * Get session ID from cookie
 */
export async function getSessionCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(cookieConfig.name);
  return cookie?.value;
}

/**
 * Delete session cookie
 */
export async function deleteSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(cookieConfig.name);
}

/**
 * Check if session cookie exists
 */
export async function hasSessionCookie(): Promise<boolean> {
  const sessionId = await getSessionCookie();
  return !!sessionId;
}
