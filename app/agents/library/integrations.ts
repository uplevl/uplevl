import { db } from "@/database";
import type * as schema from "@/database/schema";

import { ENTRY_CACHE_EXPIRATION_ONE_HOUR } from "./constants";
import { addEntry, createCacheKey, getEntry } from "./memory";

/**
 * Fetches an integration record from the database for a specific user and strategy.
 * The integration includes its associated agent data for complete context.
 */
async function getIntegrationByEntityIdAndStrategy(entityId: string, strategy: schema.IntegrationStrategy) {
  // Query the database for the first matching integration record
  const integration = await db.query.integrations.findFirst({
    where: (integrations, { and, eq }) => and(eq(integrations.entityId, entityId), eq(integrations.name, strategy)),
    with: {
      agent: true, // Include the associated agent data in the result
    },
  });

  // Return null if no integration is found
  if (!integration) {
    console.log("Integration not found for integration entity ID: ", entityId);
    return null;
  }

  // Cache the integration result for future lookups
  const cacheKey = createCacheKey(["integrations", entityId, strategy]);
  await addEntry(cacheKey, integration, ENTRY_CACHE_EXPIRATION_ONE_HOUR);

  return integration;
}

/**
 * Type representing a complete integration record with its associated agent data.
 * Used for type-safe handling of integration records throughout the application.
 */
type IntegrationWithAgent = Awaited<ReturnType<typeof getIntegrationByEntityIdAndStrategy>>;

/**
 * Retrieves an integration record with caching support.
 * Implements a cache-first strategy to minimize database queries.
 */
export async function getCachedIntegrationByEntityIdAndStrategy(
  entityId: string,
  strategy: schema.IntegrationStrategy,
) {
  // Create a cache key for this specific integration lookup
  const cacheKey = createCacheKey(["integrations", entityId, strategy]);

  // Try to get the integration from cache first
  const cachedIntegration = await getEntry<IntegrationWithAgent>(cacheKey);
  if (cachedIntegration) return cachedIntegration;

  // If not in cache, fetch from database and return
  const integration = await getIntegrationByEntityIdAndStrategy(entityId, strategy);

  return integration;
}
