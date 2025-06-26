"use server";

import { auth } from "@clerk/nextjs/server";
import { eq, isNull } from "drizzle-orm";

import { db } from "@/database";
import { type UserInsert, UserTable, type UserUpdate } from "@/database/schema";

export async function getCurrentUser({ allData = false } = {}) {
  const { userId } = await auth();

  return {
    userId,
    user: allData && userId ? await getUserByClerkId(userId) : undefined,
  };
}

async function getUserByClerkId(clerkId: string) {
  return db.query.UserTable.findFirst({
    where: (UserTable, { eq, and }) => and(eq(UserTable.id, clerkId), isNull(UserTable.deletedAt)),
  });
}

export async function insertUser(data: UserInsert) {
  await db.insert(UserTable).values(data).onConflictDoNothing();
}

export async function updateUser(id: string, data: UserUpdate) {
  await db.update(UserTable).set(data).where(eq(UserTable.id, id));
}

export async function deleteUser(id: string) {
  await db.update(UserTable).set({ deletedAt: new Date().toISOString() }).where(eq(UserTable.id, id));
}
