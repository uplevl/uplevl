"use server";

import { eq } from "drizzle-orm";
import type z from "zod/v4";

import { db } from "@/database";
import { PostTable } from "@/database/schema";
import { PostInsertSchema, PostUpdateSchema } from "@/database/validation/posts.validation";

import { verifySession } from "@/features/user/api/queries";

type PostInsertInput = Omit<z.infer<typeof PostInsertSchema>, "userId">;
type PostUpdateInput = z.infer<typeof PostUpdateSchema>;

export async function insertPost(input: PostInsertInput) {
  const { userId } = await verifySession();

  const parsedData = PostInsertSchema.omit({ userId: true }).parse(input);
  return await db
    .insert(PostTable)
    .values({ ...parsedData, userId })
    .returning({ id: PostTable.id });
}

export async function updatePost(postId: string, input: PostUpdateInput) {
  await verifySession();

  const parsedData = PostUpdateSchema.parse(input);
  return await db.update(PostTable).set(parsedData).where(eq(PostTable.id, postId)).returning({ id: PostTable.id });
}

export async function deletePost(postId: string) {
  await verifySession();

  return await db
    .update(PostTable)
    .set({ deletedAt: new Date().toISOString() })
    .where(eq(PostTable.id, postId))
    .returning({ id: PostTable.id });
}
