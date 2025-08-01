"use server";

import { eq } from "drizzle-orm";
import type z from "zod/v4";

import { db } from "@/database";
import { UserTable } from "@/database/schema";
import { UserInsertSchema, type UserUpdateSchema } from "@/database/validation/users.validation";

import { verifySession } from "./queries";

export async function insertUser(data: z.infer<typeof UserInsertSchema>) {
  const parsedData = UserInsertSchema.parse(data);
  await db.insert(UserTable).values(parsedData).onConflictDoNothing();
}

export async function updateUser(id: string, data: z.infer<typeof UserUpdateSchema>) {
  await verifySession();
  await db.update(UserTable).set(data).where(eq(UserTable.id, id));
}

export async function deleteUser(id: string) {
  await verifySession();
  await db.update(UserTable).set({ deletedAt: new Date().toISOString() }).where(eq(UserTable.id, id));
}
