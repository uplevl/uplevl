"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/database";
import {
  type IntegrationInsert,
  type IntegrationStrategy,
  IntegrationTable,
  type IntegrationUpdate,
} from "@/database/schema";

export async function getIntegrationsByUserId(userId: string) {
  return db.query.IntegrationTable.findMany({
    where: (IntegrationTable, { eq, and, isNull }) =>
      and(eq(IntegrationTable.userId, userId), isNull(IntegrationTable.deletedAt)),
  });
}

export async function getIntegrationByUserIdAndStrategy(userId: string, strategy: IntegrationStrategy) {
  return db.query.IntegrationTable.findFirst({
    where: (IntegrationTable, { eq, and, isNull }) =>
      and(eq(IntegrationTable.userId, userId), eq(IntegrationTable.name, strategy), isNull(IntegrationTable.deletedAt)),
  });
}

export async function insertIntegration(data: IntegrationInsert) {
  await db.insert(IntegrationTable).values(data).returning({ id: IntegrationTable.id });
}

export async function updateIntegration(id: number, data: IntegrationUpdate) {
  await db.update(IntegrationTable).set(data).where(eq(IntegrationTable.id, id)).returning({ id: IntegrationTable.id });
  revalidatePath("/dashboard/integrations");
}

export async function deleteIntegration(id: number) {
  await db.update(IntegrationTable).set({ deletedAt: new Date().toISOString() }).where(eq(IntegrationTable.id, id));
  revalidatePath("/dashboard/integrations");
}
