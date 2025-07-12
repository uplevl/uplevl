"use server";

import { eq } from "drizzle-orm";

import { db } from "@/database";
import { type UserInsert, UserTable, type UserUpdate } from "@/database/schema";

import { verifySession } from "./queries";

export async function insertUser(data: UserInsert) {
  await verifySession();
  await db.insert(UserTable).values(data).onConflictDoNothing();
}

export async function updateUser(id: string, data: UserUpdate) {
  await verifySession();
  await db.update(UserTable).set(data).where(eq(UserTable.id, id));
}

export async function deleteUser(id: string) {
  await verifySession();
  await db.update(UserTable).set({ deletedAt: new Date().toISOString() }).where(eq(UserTable.id, id));
}
