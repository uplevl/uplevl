"use server";

import { and, eq, notInArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/database";
import {
  type OfferingInsert,
  type OfferingPriceInsert,
  OfferingPriceTable,
  type OfferingPriceUpdate,
  OfferingTable,
  type OfferingUpdate,
} from "@/database/schema";

export async function insertOffering({ prices, ...data }: OfferingInsert & { prices: OfferingPriceInsert[] }) {
  await db.transaction(async (tx) => {
    const [offering] = await tx.insert(OfferingTable).values(data).returning({ id: OfferingTable.id });
    await tx.insert(OfferingPriceTable).values(prices.map((price) => ({ ...price, offeringId: offering.id })));
  });
}

export async function updateOffering(
  offeringId: number,
  { prices, ...data }: OfferingUpdate & { prices: OfferingPriceUpdate[] },
) {
  await db.transaction(async (tx) => {
    const [offering] = await tx
      .update(OfferingTable)
      .set(data)
      .where(eq(OfferingTable.id, offeringId))
      .returning({ id: OfferingTable.id });

    // Collect all price IDs from the input array
    const priceIds = prices.map((p) => p.id).filter((id): id is number => id !== undefined);

    // Delete prices that are not in the input array
    if (priceIds.length > 0) {
      // Delete prices that are not in the input array
      await tx
        .delete(OfferingPriceTable)
        .where(and(eq(OfferingPriceTable.offeringId, offering.id), notInArray(OfferingPriceTable.id, priceIds)));
    } else {
      // Delete all prices for this offering when all input prices are new
      await tx.delete(OfferingPriceTable).where(eq(OfferingPriceTable.offeringId, offering.id));
    }

    // Separate prices into updates and inserts
    const pricesToUpdate: Array<{ id: number; data: OfferingPriceUpdate }> = [];
    const pricesToInsert: Array<OfferingPriceInsert> = [];

    for (const { id: priceId, ...price } of prices) {
      if (!price.price) {
        throw new Error("Price value is required");
      }

      const validatedPrice = {
        tier: price.tier,
        price: price.price,
        unit: price.unit,
      };

      if (priceId) {
        pricesToUpdate.push({ id: priceId, data: validatedPrice });
      } else {
        pricesToInsert.push({ ...validatedPrice, offeringId: offering.id });
      }
    }

    // Batch update existing prices
    if (pricesToUpdate.length > 0) {
      const updateResults = await Promise.all(
        pricesToUpdate.map(({ id, data }) =>
          tx
            .update(OfferingPriceTable)
            .set(data)
            .where(eq(OfferingPriceTable.id, id))
            .returning({ id: OfferingPriceTable.id }),
        ),
      );

      if (updateResults.some((result) => result.length === 0)) {
        throw new Error("Failed to update one or more prices");
      }
    }

    // Batch insert new prices
    if (pricesToInsert.length > 0) {
      const insertResult = await tx
        .insert(OfferingPriceTable)
        .values(pricesToInsert)
        .returning({ id: OfferingPriceTable.id });

      if (insertResult.length !== pricesToInsert.length) {
        throw new Error("Failed to insert one or more prices");
      }
    }
  });

  revalidatePath("/dashboard/agent");
}

export async function deleteOffering(agentId: string, offeringId: number) {
  await db.update(OfferingTable).set({ deletedAt: new Date().toISOString() }).where(eq(OfferingTable.id, offeringId));

  revalidatePath("/dashboard/agent");
}
