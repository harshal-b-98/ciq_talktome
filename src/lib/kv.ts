/**
 * Vercel KV Client
 * Uses mock KV for local development when environment variables are not set
 */

// For now, always use mock KV in development
// In production with real Vercel KV, replace this import with:
// export { kv } from "@vercel/kv";

import { kv as kvMock } from "./kv-mock";

export const kv = kvMock;

// TODO: When deploying to Vercel with real KV:
// 1. Set KV_REST_API_URL and KV_REST_API_TOKEN environment variables
// 2. Uncomment the line above and remove the mock import
