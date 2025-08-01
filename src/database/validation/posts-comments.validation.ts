import { z } from "zod/v4";

export const PostsCommentsInsertSchema = z.object({
  integrationId: z.number().min(1),
  agentId: z.string().min(1),
  entityId: z.string().min(1),
  commentId: z.string().min(1),
  commenterId: z.string().min(1),
  commenterUsername: z.string().min(1),
  commentText: z.string().min(1),
  commentTimestamp: z.string().min(1),
  aiResponse: z.string().min(1).optional().nullable(),
  aiResponseTimestamp: z.string().min(1).optional().nullable(),
  isBookingInterest: z.boolean().optional(),
});

export const PostsCommentsUpdateSchema = PostsCommentsInsertSchema.partial().omit({
  integrationId: true,
  agentId: true,
  entityId: true,
});
