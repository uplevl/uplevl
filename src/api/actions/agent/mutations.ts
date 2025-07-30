"use server";

import { eq } from "drizzle-orm";

import { db } from "@/database";
import {
  type AgentInsert,
  AgentInsertSchema,
  AgentTable,
  type AgentUpdate,
  AgentUpdateSchema,
} from "@/database/schema";

import { verifySession } from "../user/queries";

export async function insertAgent(data: AgentInsert) {
  await verifySession();
  const parsedData = AgentInsertSchema.parse(data);
  return await db.insert(AgentTable).values(parsedData).returning({ id: AgentTable.id });
}

export async function updateAgent({ agentId, ...data }: AgentUpdate & { agentId: string }) {
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
