"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/database";
import { type AgentInsert, AgentTable, type AgentUpdate } from "@/database/schema";

export async function getAgentByClerkId(clerkId: string) {
  return db.query.AgentTable.findFirst({
    where: (AgentTable, { eq }) => eq(AgentTable.userId, clerkId),
    with: {
      offerings: {
        with: {
          prices: true,
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
  await db.delete(AgentTable).where(eq(AgentTable.id, agentId));
  revalidatePath("/dashboard/agent");
}
