"use server";

import { eq, isNull } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/database";
import { type PostInsert, PostTable, type PostUpdate } from "@/database/schema";

export async function getPostsByUserId(userId: string) {
  return db.query.PostTable.findMany({
    where: (PostTable, { eq, and }) => and(eq(PostTable.userId, userId), isNull(PostTable.deletedAt)),
    orderBy: (PostTable, { desc }) => desc(PostTable.createdAt),
  });
}

export async function getPostById(postId: string) {
  return db.query.PostTable.findFirst({
    where: (PostTable, { eq, and, isNull }) => and(eq(PostTable.id, postId), isNull(PostTable.deletedAt)),
  });
}

export type PostWithMeta = NonNullable<Awaited<ReturnType<typeof getPostById>>>;

export async function insertPost(post: PostInsert) {
  await db.insert(PostTable).values(post);
  revalidatePath("/dashboard/posts");
}

export async function updatePost(postId: string, post: PostUpdate) {
  await db.update(PostTable).set(post).where(eq(PostTable.id, postId));
  revalidatePath("/dashboard/posts");
}

export async function deletePost(postId: string) {
  await db.update(PostTable).set({ deletedAt: new Date().toISOString() }).where(eq(PostTable.id, postId));
  revalidatePath("/dashboard/posts");
}
