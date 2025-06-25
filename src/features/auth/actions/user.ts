import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

import { db } from "@/database";
import { type UserInsert, UserTable, type UserUpdate } from "@/database/schema";

import { revalidateUserCache } from "./cache/user";

export async function getCurrentUser({ allData = false } = {}) {
  const { userId } = await auth();

  return {
    userId,
    user: allData && userId ? await getUserByClerkId(userId) : undefined,
  };
}

async function getUserByClerkId(clerkId: string) {
  return db.query.UserTable.findFirst({
    where: (UserTable, { eq }) => eq(UserTable.id, clerkId),
  });
}

export async function insertUser(data: UserInsert) {
  await db.insert(UserTable).values(data).onConflictDoNothing();

  revalidateUserCache(data.id);
}

export async function updateUser(id: string, data: UserUpdate) {
  await db.update(UserTable).set(data).where(eq(UserTable.id, id));

  revalidateUserCache(id);
}

export async function deleteUser(id: string) {
  await db.delete(UserTable).where(eq(UserTable.id, id));

  revalidateUserCache(id);
}
