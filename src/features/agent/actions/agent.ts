"use server";

import { auth } from "@clerk/nextjs/server";
import { eq, isNull } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { db } from "@/database";
import { type AgentInsert, AgentTable, type AgentUpdate } from "@/database/schema";

export async function getCurrentAgentId() {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const agent = await db.query.AgentTable.findFirst({
    where: (AgentTable, { eq, and, isNull }) => and(eq(AgentTable.userId, userId), isNull(AgentTable.deletedAt)),
    columns: {
      id: true,
    },
  });

  if (!agent) {
    return redirect("/onboarding");
  }

  return agent.id;
}

export async function getAgentByClerkId(clerkId: string) {
  return db.query.AgentTable.findFirst({
    where: (AgentTable, { eq, and }) => and(eq(AgentTable.userId, clerkId), isNull(AgentTable.deletedAt)),
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
}

export type AgentWithOfferings = NonNullable<Awaited<ReturnType<typeof getAgentByClerkId>>>;

export async function insertAgent(data: AgentInsert) {
  await db.insert(AgentTable).values(data).returning({ id: AgentTable.id });
}

export async function updateAgent(agentId: string, data: AgentUpdate) {
  await db.update(AgentTable).set(data).where(eq(AgentTable.id, agentId)).returning({ userId: AgentTable.userId });
  revalidatePath("/dashboard/agent");
}

export async function deleteAgent(agentId: string) {
  await db.update(AgentTable).set({ deletedAt: new Date().toISOString() }).where(eq(AgentTable.id, agentId));
  revalidatePath("/dashboard/agent");
}
