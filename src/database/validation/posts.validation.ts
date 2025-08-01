import { z } from "zod/v4";

import { POST_REVIEW_STATUSES, POST_STATUSES, type PostTable } from "../schema/posts.schema";

export type Post = typeof PostTable.$inferSelect;

export const PostInsertSchema = z.object({
  agentId: z.string().min(1),
  userId: z.string().min(1),
  content: z.string().min(1),
  images: z.array(z.string()).min(1),
  status: z.enum(POST_STATUSES),
  reviewStatus: z.enum(POST_REVIEW_STATUSES),
  reviewedBy: z.string().min(1).nullable().optional(),
  scheduledAt: z.string().min(1).nullable().optional(),
});

export const PostUpdateSchema = PostInsertSchema.partial().omit({
  agentId: true,
  userId: true,
});
