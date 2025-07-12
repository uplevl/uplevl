import "server-only";

import { db } from "@/database";

import { verifySession } from "../user/queries";

export async function getPosts() {
  const { userId } = await verifySession();

  return db.query.PostTable.findMany({
    where: (PostTable, { eq, and, isNull }) => and(eq(PostTable.userId, userId), isNull(PostTable.deletedAt)),
    orderBy: (PostTable, { desc }) => desc(PostTable.createdAt),
  });
}

export async function getPostById(postId: string) {
  await verifySession();

  return db.query.PostTable.findFirst({
    where: (PostTable, { eq, and, isNull }) => and(eq(PostTable.id, postId), isNull(PostTable.deletedAt)),
  });
}
