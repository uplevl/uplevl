import "server-only";

/**
 * The time to live for an entry in the cache: 1 day
 */
export const ENTRY_CACHE_EXPIRATION = 60 * 60 * 24;

/**
 * The time to live for an entry in the cache: 1 hour
 */
export const ENTRY_CACHE_EXPIRATION_ONE_HOUR = 60 * 60;

/**
 * The time to live for a message in the cache: 90 days
 */
export const MESSAGE_CACHE_EXPIRATION = 60 * 60 * 24 * 90;
