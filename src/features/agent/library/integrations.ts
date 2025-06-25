import { db } from "@/database";
import { type IntegrationStrategy } from "@/database/schema";

import { addEntry, createCacheKey, getEntry } from "@/lib/redis";

import { ENTRY_CACHE_EXPIRATION_ONE_HOUR } from "./constants";

export async function getIntegrationByEntityIdAndStrategy(entityId: string, strategy: IntegrationStrategy) {
  const integration = await db.query.IntegrationTable.findFirst({
    where: (IntegrationTable, { and, eq }) =>
      and(eq(IntegrationTable.entityId, entityId), eq(IntegrationTable.name, strategy)),
    with: {
      agent: true,
    },
  });

  if (!integration) {
    console.log("Integration not found for integration entity ID: ", entityId);
    return null;
  }

  const cacheKey = createCacheKey(["integrations", entityId, strategy]);
  await addEntry(cacheKey, integration, ENTRY_CACHE_EXPIRATION_ONE_HOUR);

  return integration;
}

type IntegrationWithAgent = Awaited<ReturnType<typeof getIntegrationByEntityIdAndStrategy>>;

export async function getCachedIntegrationByEntityIdAndStrategy(entityId: string, strategy: IntegrationStrategy) {
  const cacheKey = createCacheKey(["integrations", entityId, strategy]);

  const cachedIntegration = await getEntry<IntegrationWithAgent>(cacheKey);
  if (cachedIntegration) return cachedIntegration;

  const integration = await getIntegrationByEntityIdAndStrategy(entityId, strategy);

  return integration;
}
