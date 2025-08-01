import "server-only";

import { and, eq, isNull } from "drizzle-orm";
import z from "zod/v4";

import { db } from "@/database";
import { POST_STATUSES, PostTable } from "@/database/schema/posts.schema";

import { getAgentId } from "@/features/agent-settings/api/queries";
import { verifySession } from "@/features/user/api/queries";

export const GetPostsFilterSchema = z.object({
  status: z.enum(POST_STATUSES).optional(),
});

export interface GetPostsProps {
  filters?: z.infer<typeof GetPostsFilterSchema>;
}

export async function getPosts({ filters }: GetPostsProps = {}) {
  await verifySession();
  const agentId = await getAgentId();

  if (!agentId) {
    throw new Error("Agent ID not found");
  }

  // Placeholder condition incase we don't have any filters
  const where = [eq(PostTable.agentId, agentId), isNull(PostTable.deletedAt)];

  if (filters?.status) {
    where.push(eq(PostTable.status, filters.status));
  }

  const posts = await db.query.PostTable.findMany({
    where: and(...where),
    orderBy: (PostTable, { desc }) => desc(PostTable.createdAt),
  });

  return posts ?? [];
}

export async function getPostById(postId: string) {
  await verifySession();
  const agentId = await getAgentId();

  if (!agentId) {
    throw new Error("Agent ID not found");
  }

  return db.query.PostTable.findFirst({
    where: (PostTable, { eq, and, isNull }) =>
      and(eq(PostTable.id, postId), eq(PostTable.agentId, agentId), isNull(PostTable.deletedAt)),
  });
}
