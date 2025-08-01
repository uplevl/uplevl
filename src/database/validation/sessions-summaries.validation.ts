import { z } from "zod/v4";

export const SessionSummaryInsertSchema = z.object({
  sessionId: z.string().min(1),
  converted: z.boolean(),
  conversationType: z.string().min(1),
  messagesCount: z.number().min(0),
  durationSeconds: z.number().min(0),
  summary: z.string().min(1),
});

export const SessionSummaryUpdateSchema = SessionSummaryInsertSchema.partial().omit({
  sessionId: true,
});
