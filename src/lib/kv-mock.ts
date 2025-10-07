/**
 * Mock Vercel KV for Local Development
 * This file provides a mock implementation of Vercel KV for local development
 * when KV_REST_API_URL and KV_REST_API_TOKEN are not set
 */

// In-memory store for development
const store = new Map<string, { value: unknown; expiresAt: number | null }>();

// Cleanup expired entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (entry.expiresAt && entry.expiresAt < now) {
      store.delete(key);
    }
  }
}, 60000); // Clean up every minute

export const kv = {
  async get<T = unknown>(key: string): Promise<T | null> {
    const entry = store.get(key);
    if (!entry) {
      return null;
    }

    // Check expiration
    if (entry.expiresAt && entry.expiresAt < Date.now()) {
      store.delete(key);
      return null;
    }

    return entry.value as T;
  },

  async set(
    key: string,
    value: unknown,
    options?: { ex?: number; px?: number; exat?: number; pxat?: number },
  ): Promise<string> {
    let expiresAt: number | null = null;

    if (options?.ex) {
      // Expire in seconds
      expiresAt = Date.now() + options.ex * 1000;
    } else if (options?.px) {
      // Expire in milliseconds
      expiresAt = Date.now() + options.px;
    } else if (options?.exat) {
      // Expire at Unix timestamp (seconds)
      expiresAt = options.exat * 1000;
    } else if (options?.pxat) {
      // Expire at Unix timestamp (milliseconds)
      expiresAt = options.pxat;
    }

    store.set(key, { value, expiresAt });
    return "OK";
  },

  async del(...keys: string[]): Promise<number> {
    let deleted = 0;
    for (const key of keys) {
      if (store.delete(key)) {
        deleted++;
      }
    }
    return deleted;
  },

  async expire(key: string, seconds: number): Promise<number> {
    const entry = store.get(key);
    if (!entry) {
      return 0;
    }

    entry.expiresAt = Date.now() + seconds * 1000;
    return 1;
  },

  async ttl(key: string): Promise<number> {
    const entry = store.get(key);
    if (!entry) {
      return -2; // Key doesn't exist
    }

    if (!entry.expiresAt) {
      return -1; // No expiration set
    }

    const remaining = Math.floor((entry.expiresAt - Date.now()) / 1000);
    return remaining > 0 ? remaining : -2;
  },

  async exists(...keys: string[]): Promise<number> {
    let count = 0;
    for (const key of keys) {
      if (store.has(key)) {
        count++;
      }
    }
    return count;
  },

  async keys(pattern: string): Promise<string[]> {
    // Simple pattern matching (only supports *)
    const regex = new RegExp("^" + pattern.replace(/\*/g, ".*") + "$");
    return Array.from(store.keys()).filter((key) => regex.test(key));
  },

  // Get store size for debugging
  getSize(): number {
    return store.size;
  },

  // Clear all data (for testing)
  clear(): void {
    store.clear();
  },
};

console.log("[KV Mock] Using in-memory mock for local development");
console.log("[KV Mock] Set KV_REST_API_URL and KV_REST_API_TOKEN to use real Vercel KV");
