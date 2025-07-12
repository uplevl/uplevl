"use server";

import { eq } from "drizzle-orm";

import { db } from "@/database";
import { type AgentInsert, AgentTable, type AgentUpdate } from "@/database/schema";

import { verifySession } from "../user/queries";

export async function insertAgent(data: AgentInsert) {
  await verifySession();
  await db.insert(AgentTable).values(data).returning({ id: AgentTable.id });
}

export async function updateAgent(agentId: string, data: AgentUpdate) {
  await verifySession();
  await db.update(AgentTable).set(data).where(eq(AgentTable.id, agentId)).returning({ userId: AgentTable.userId });
}

export async function deleteAgent(agentId: string) {
  await verifySession();
  await db.update(AgentTable).set({ deletedAt: new Date().toISOString() }).where(eq(AgentTable.id, agentId));
}
