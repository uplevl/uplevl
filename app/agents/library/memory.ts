import type { CoreMessage } from "ai";

import { redis } from "@/lib/redis";

import { MESSAGE_CACHE_EXPIRATION } from "./constants";

/**
 * Creates a cache key by joining array elements with colons.
 * Used to generate consistent and unique keys for Redis storage.
 */
export function createCacheKey(props: string[]) {
  return props.join(":");
}

/**
 * Properties required for adding messages to the cache.
 */
interface AddMessagesProps {
  /** The cache key under which messages will be stored */
  cacheKey: string;
  /** Array of messages to be cached */
  messages: CoreMessage[];
}

/**
 * Adds an array of messages to the cache with a specified expiration time.
 * Uses the global MESSAGE_CACHE_EXPIRATION constant for TTL.
 */
export async function addMessages(props: AddMessagesProps) {
  const { messages, cacheKey } = props;

  return addEntry(cacheKey, messages, MESSAGE_CACHE_EXPIRATION);
}

export async function getMessages(cacheKey: string) {
  const result = await getEntry<CoreMessage[]>(cacheKey);
  return result ?? [];
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

// TODO: Add a functions to get and store the summary of a conversation.
