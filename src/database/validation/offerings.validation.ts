import { z } from "zod/v4";

export const OfferingInsertSchema = z.object({
  agentId: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  category: z.string().min(1).nullable().optional(),
  sortOrder: z.number().min(0).optional(),
});

export const OfferingUpdateSchema = OfferingInsertSchema.partial().omit({
  agentId: true,
});
