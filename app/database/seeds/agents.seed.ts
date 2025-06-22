import { env } from "@/env";

import { db } from "@/database";
import {
  AgentTable,
  INTEGRATION_STRATEGIES,
  IntegrationTable,
  type OfferingPriceInsert,
  OfferingPriceTable,
  OfferingTable,
} from "@/database/schema";

import agents from "./data/agents.data.json";

export async function agentsSeed() {
  // Validate and cache required environment variables
  const { SEED_CLERK_USER_ID, SEED_INTEGRATION_INSTAGRAM_TOKEN, SEED_INTEGRATION_INSTAGRAM_ENTITY_ID } = env;

  if (!SEED_CLERK_USER_ID || !SEED_INTEGRATION_INSTAGRAM_TOKEN || !SEED_INTEGRATION_INSTAGRAM_ENTITY_ID) {
    throw new Error(
      `Missing required environment variables for seeding: ${[
        !SEED_CLERK_USER_ID && "SEED_CLERK_USER_ID",
        !SEED_INTEGRATION_INSTAGRAM_TOKEN && "SEED_INTEGRATION_INSTAGRAM_TOKEN",
        !SEED_INTEGRATION_INSTAGRAM_ENTITY_ID && "SEED_INTEGRATION_INSTAGRAM_ENTITY_ID",
      ]
        .filter(Boolean)
        .join(", ")}`,
    );
  }

  await db.transaction(async (tx) => {
    console.log("Seeding agents...");

    let numberOfAgents = 0;

    for (const { offerings, ...agent } of agents) {
      // Insert Agent
      const insertedAgent = await tx
        .insert(AgentTable)
        .values({
          ...agent,
          userId: SEED_CLERK_USER_ID,
        })
        .returning({ id: AgentTable.id, uuid: AgentTable.uuid });

      if (insertedAgent.length === 0) {
        throw new Error(`Agent could not be created`);
      }

      numberOfAgents++;

      console.log("  Seeding offerings...");
      let numberOfOfferings = 0;

      // Insert Offerings
      for (const { prices, ...offering } of offerings) {
        const insertedOfferings = await tx
          .insert(OfferingTable)
          .values({
            ...offering,
            agentId: insertedAgent[0].uuid,
          })
          .returning({ id: OfferingTable.id });

        if (insertedOfferings.length === 0) {
          throw new Error(`Offerings could not be created`);
        }

        numberOfOfferings++;

        // Insert Offerings Prices
        const pricesData: OfferingPriceInsert[] = prices.map((price) => ({
          ...price,
          offeringId: insertedOfferings[0].id,
        }));

        const insertedOfferingsPrices = await tx
          .insert(OfferingPriceTable)
          .values(pricesData)
          .returning({ id: OfferingPriceTable.id });

        if (insertedOfferingsPrices.length === 0) {
          throw new Error(`Offerings prices could not be created`);
        }
      }

      console.log("    ... Offerings seeded successfully: ", numberOfOfferings);

      console.log("  Seeding integration...");

      // Insert Instagram Integration
      const insertedIntegration = await tx
        .insert(IntegrationTable)
        .values({
          userId: SEED_CLERK_USER_ID,
          agentId: insertedAgent[0].uuid,
          name: INTEGRATION_STRATEGIES.INSTAGRAM,
          token: SEED_INTEGRATION_INSTAGRAM_TOKEN,
          entityId: SEED_INTEGRATION_INSTAGRAM_ENTITY_ID,
        })
        .returning({ id: IntegrationTable.id });

      if (insertedIntegration.length === 0) {
        throw new Error(`Integration could not be created`);
      }

      console.log("    ... Integration seeded successfully: ", insertedIntegration.length);
    }

    console.log("  ... Agents seeded successfully: ", numberOfAgents);
  });
}
