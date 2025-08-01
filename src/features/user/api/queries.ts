import "server-only";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { cache } from "react";

import { db } from "@/database";

export const verifySession = cache(async () => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  return { userId };
});

export interface GetCurrentUserParams {
  allData?: boolean;
}

export async function getCurrentUser({ allData = false }: GetCurrentUserParams = {}) {
  const { userId } = await verifySession();

  return {
    userId,
    user: allData ? await getUserById(userId) : undefined,
  };
}

const getUserById = cache(async (userId: string) => {
  return db.query.UserTable.findFirst({
    where: (UserTable, { eq, and, isNull }) => and(eq(UserTable.id, userId), isNull(UserTable.deletedAt)),
  });
});
