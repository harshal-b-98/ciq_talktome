/**
 * Vercel KV Client
 * Uses mock KV for local development when environment variables are not set
 *
 * ⚠️ DEPRECATED: This module is deprecated in favor of iron-session cookie-based sessions.
 * Session management now uses encrypted cookies (src/lib/session/cookie-session.ts)
 * instead of Redis/KV storage. This file is kept for backward compatibility with
 * legacy session utilities but should not be used in new code.
 *
 * See: src/lib/session/cookie-session.ts for the new implementation
 */

// For now, always use mock KV in development
// In production with real Vercel KV, replace this import with:
// export { kv } from "@vercel/kv";

import { kv as kvMock } from "./kv-mock";

export const kv = kvMock;

// TODO: When deploying to Vercel with real KV:
// 1. Set KV_REST_API_URL and KV_REST_API_TOKEN environment variables
// 2. Uncomment the line above and remove the mock import
//
// NOTE: This is now deprecated in favor of iron-session cookies
