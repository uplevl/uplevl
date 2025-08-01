import "server-only";

import { cache } from "react";

import { db } from "@/database";

import { verifySession } from "@/features/user/api/queries";

export const getAgentId = cache(async () => {
  const { userId } = await verifySession();

  const agent = await db.query.AgentTable.findFirst({
    where: (AgentTable, { eq, and, isNull }) => and(eq(AgentTable.userId, userId), isNull(AgentTable.deletedAt)),
    columns: {
      id: true,
    },
  });

  return agent?.id ?? null;
});

export async function getAgent() {
  const { userId } = await verifySession();

  const agent = await db.query.AgentTable.findFirst({
    where: (AgentTable, { eq, and, isNull }) => and(eq(AgentTable.userId, userId), isNull(AgentTable.deletedAt)),
    with: {
      offerings: {
        where: (OfferingTable, { isNull }) => isNull(OfferingTable.deletedAt),
        with: {
          prices: {
            where: (OfferingPriceTable, { isNull }) => isNull(OfferingPriceTable.deletedAt),
          },
        },
      },
    },
  });

  return agent ?? null;
}
