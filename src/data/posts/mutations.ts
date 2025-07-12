"use server";

import { eq } from "drizzle-orm";

import { db } from "@/database";
import { type PostInsert, PostTable, type PostUpdate } from "@/database/schema";

import { verifySession } from "@/data/user/queries";

export async function insertPost(post: PostInsert) {
  await verifySession();
  await db.insert(PostTable).values(post);
}

export async function updatePost(postId: string, post: PostUpdate) {
  await verifySession();
  await db.update(PostTable).set(post).where(eq(PostTable.id, postId));
}

export async function deletePost(postId: string) {
  await verifySession();
  await db.update(PostTable).set({ deletedAt: new Date().toISOString() }).where(eq(PostTable.id, postId));
}
