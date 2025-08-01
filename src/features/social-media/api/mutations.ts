"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import type { z } from "zod/v4";

import { db } from "@/database";
import { IntegrationTable, PostsCommentsTable } from "@/database/schema";
import { IntegrationInsertSchema, IntegrationUpdateSchema } from "@/database/validation/integeration.validation";
import {
  type PostsCommentsInsertSchema,
  type PostsCommentsUpdateSchema,
} from "@/database/validation/posts-comments.validation";

import { verifySession } from "@/features/user/api/queries";

type CommentInsertInput = z.infer<typeof PostsCommentsInsertSchema>;
type CommentUpdateInput = z.infer<typeof PostsCommentsUpdateSchema>;

export async function insertComment(input: CommentInsertInput) {
  return await db.insert(PostsCommentsTable).values(input).returning({ id: PostsCommentsTable.id });
}

export async function updateComment(agentId: string, commentId: string, input: CommentUpdateInput) {
  return await db
    .update(PostsCommentsTable)
    .set(input)
    .where(and(eq(PostsCommentsTable.commentId, commentId), eq(PostsCommentsTable.agentId, agentId)))
    .returning({ id: PostsCommentsTable.id });
}

export async function insertIntegration(data: z.infer<typeof IntegrationInsertSchema>) {
  await verifySession();

  const parsedData = IntegrationInsertSchema.parse(data);

  await db
    .insert(IntegrationTable)
    .values(parsedData)
    .returning({ id: IntegrationTable.id })
    .onConflictDoUpdate({
      target: [IntegrationTable.entityId, IntegrationTable.name],
      set: {
        ...parsedData,
        deletedAt: null,
      },
    });

  revalidatePath("/dashboard/integrations");
}

export async function updateIntegration(id: number, data: z.infer<typeof IntegrationUpdateSchema>) {
  await verifySession();
  const parsedData = IntegrationUpdateSchema.parse(data);
  await db
    .update(IntegrationTable)
    .set(parsedData)
    .where(eq(IntegrationTable.id, id))
    .returning({ id: IntegrationTable.id });

  revalidatePath("/dashboard/integrations");
}

export async function deleteIntegration(id: number) {
  await verifySession();
  await db.update(IntegrationTable).set({ deletedAt: new Date().toISOString() }).where(eq(IntegrationTable.id, id));

  revalidatePath("/dashboard/integrations");
}
