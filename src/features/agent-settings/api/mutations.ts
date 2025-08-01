"use server";

import { eq } from "drizzle-orm";
import type z from "zod/v4";

import { db } from "@/database";
import { AgentTable } from "@/database/schema";
import { AgentInsertSchema, AgentUpdateSchema } from "@/database/validation/agent.validation";

import { verifySession } from "@/features/user/api/queries";

export async function insertAgent(data: z.infer<typeof AgentInsertSchema>) {
  await verifySession();
  const parsedData = AgentInsertSchema.parse(data);
  return await db.insert(AgentTable).values(parsedData).returning({ id: AgentTable.id });
}

export async function updateAgent({ agentId, ...data }: z.infer<typeof AgentUpdateSchema> & { agentId: string }) {
  await verifySession();
  const parsedData = AgentUpdateSchema.parse(data);
  return await db.update(AgentTable).set(parsedData).where(eq(AgentTable.id, agentId)).returning({ id: AgentTable.id });
}

export async function deleteAgent(agentId: string) {
  await verifySession();
  return await db
    .update(AgentTable)
    .set({ deletedAt: new Date().toISOString() })
    .where(eq(AgentTable.id, agentId))
    .returning({ id: AgentTable.id });
}
