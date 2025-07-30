import "server-only";

import { redirect } from "next/navigation";
import { cache } from "react";

import { db } from "@/database";

import { verifySession } from "../user/queries";

export const getAgentId = cache(async () => {
  const { userId } = await verifySession();

  const agent = await db.query.AgentTable.findFirst({
    where: (AgentTable, { eq, and, isNull }) => and(eq(AgentTable.userId, userId), isNull(AgentTable.deletedAt)),
    columns: {
      id: true,
    },
  });

  if (!agent) {
    return redirect("/onboarding");
  }

  return { agentId: agent.id };
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

  if (!agent) {
    return redirect("/onboarding");
  }

  return agent;
}
