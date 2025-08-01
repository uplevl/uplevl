import { z } from "zod/v4";

export const AgentInsertSchema = z.object({
  userId: z.string().min(1),
  businessName: z.string().min(1).nullable(),
  businessDescription: z.string().min(1).nullable(),
  businessUrl: z.string().min(1).nullable(),
  businessSocialGoals: z.string().min(1).nullable(),
  businessContext: z.string().min(1).nullable(),
  isActive: z.boolean(),
});

export const AgentUpdateSchema = AgentInsertSchema.partial().omit({
  userId: true,
});
