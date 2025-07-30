"use server";

import { eq } from "drizzle-orm";

import { db } from "@/database";
import { type PostInsert, PostInsertSchema, PostTable, type PostUpdate, PostUpdateSchema } from "@/database/schema";

import { verifySession } from "@/api/actions/user/queries";

export async function insertPost(post: Omit<PostInsert, "userId">) {
  const { userId } = await verifySession();
  const parsedData = PostInsertSchema.parse(post);
  await db.insert(PostTable).values({ ...parsedData, userId });
}

export async function updatePost(postId: string, post: Omit<PostUpdate, "userId" | "agentId">) {
  await verifySession();
  const parsedData = PostUpdateSchema.parse(post);
  await db.update(PostTable).set(parsedData).where(eq(PostTable.id, postId));
}

export async function deletePost(postId: string) {
  await verifySession();
  await db.update(PostTable).set({ deletedAt: new Date().toISOString() }).where(eq(PostTable.id, postId));
}
