import { Redis } from "@upstash/redis";

import { env } from "./env/server";

const redis = new Redis({
  url: env.UPSTASH_REDIS_URL,
  token: env.UPSTASH_REDIS_TOKEN,
});

/**
 * Creates a cache key by joining array elements with colons.
 * Used to generate consistent and unique keys for Redis storage.
 */
export function createCacheKey(props: (string | number)[]) {
  return props.map((prop) => String(prop)).join(":");
}

/**
 * Generic function to add any type of entry to the cache.
 * Supports optional expiration time in seconds.
 */
export async function addEntry<T>(cacheKey: string, entry: T, ex?: number) {
  const result = await redis.set(cacheKey, entry, ex ? { ex } : undefined);

  if (result === null) {
    console.error("Failed to add entry to cache", cacheKey);
    return entry;
  }

  if (result === "OK") {
    return entry;
  }

  return result;
}

/**
 * Generic function to retrieve an entry from the cache.
 * Returns the cached value or null if not found.
 */
export async function getEntry<T>(cacheKey: string) {
  const entry = await redis.get<T>(cacheKey);
  return entry;
}
