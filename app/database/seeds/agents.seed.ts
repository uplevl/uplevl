import { env } from "@/env";

import { db } from "@/database";
import * as schema from "@/database/schema";

import agents from "./data/agents.data.json";

export async function agentsSeed() {
  await db.transaction(async (tx) => {
    console.log("Seeding agents...");

    let numberOfAgents = 0;

    for (const { offerings, ...agent } of agents) {
      // Insert Agent
      const insertedAgent = await tx
        .insert(schema.agents)
        .values({
          ...agent,
          userId: env.SEED_CLERK_USER_ID,
        })
        .returning({ id: schema.agents.id, uuid: schema.agents.uuid });

      if (!insertedAgent) {
        throw new Error(`Agent could not be created`);
      }

      numberOfAgents++;

      console.log("  Seeding offerings...");
      let numberOfOfferings = 0;

      // Insert Offerings
      for (const { prices, ...offering } of offerings) {
        const insertedOfferings = await tx
          .insert(schema.offerings)
          .values({
            ...offering,
            agentId: insertedAgent[0].uuid,
          })
          .returning({ id: schema.offerings.id });

        if (insertedOfferings.length === 0) {
          throw new Error(`Offerings could not be created`);
        }

        numberOfOfferings++;

        // Insert Offerings Prices
        const pricesData: schema.OfferingPriceInsert[] = prices.map((price) => ({
          ...price,
          offeringId: insertedOfferings[0].id,
        }));

        const insertedOfferingsPrices = await tx
          .insert(schema.offeringsPrices)
          .values(pricesData)
          .returning({ id: schema.offeringsPrices.id });

        if (insertedOfferingsPrices.length === 0) {
          throw new Error(`Offerings prices could not be created`);
        }
      }

      console.log("    ... Offerings seeded successfully: ", numberOfOfferings);

      console.log("  Seeding integration...");

      // Insert Instagram Integration
      const insertedIntegration = await tx
        .insert(schema.integrations)
        .values({
          userId: env.SEED_CLERK_USER_ID,
          agentId: insertedAgent[0].uuid,
          name: schema.INTEGRATION_STRATEGIES.INSTAGRAM,
          token: env.SEED_INTEGRATION_INSTAGRAM_TOKEN,
          entityId: env.SEED_INTEGRATION_INSTAGRAM_ENTITY_ID,
        })
        .returning({ id: schema.integrations.id });

      if (insertedIntegration.length === 0) {
        throw new Error(`Integration could not be created`);
      }

      console.log("    ... Integration seeded successfully: ", insertedIntegration.length);
    }

    console.log("  ... Agents seeded successfully: ", numberOfAgents);
  });
}
