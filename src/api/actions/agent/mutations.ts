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
  await db.insert(AgentTable).values(parsedData).returning({ id: AgentTable.id });
}

export async function updateAgent({ agentId, ...data }: AgentUpdate & { agentId: string }) {
  await verifySession();
  const parsedData = AgentUpdateSchema.parse(data);
  await db
    .update(AgentTable)
    .set(parsedData)
    .where(eq(AgentTable.id, agentId))
    .returning({ userId: AgentTable.userId });
}

export async function deleteAgent(agentId: string) {
  await verifySession();
  await db.update(AgentTable).set({ deletedAt: new Date().toISOString() }).where(eq(AgentTable.id, agentId));
}
