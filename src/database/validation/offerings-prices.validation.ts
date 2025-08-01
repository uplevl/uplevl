import { z } from "zod/v4";

export const OfferingPriceInsertSchema = z.object({
  offeringId: z.number().min(1),
  price: z.number().min(0),
  tier: z.string().min(1).nullable().optional(),
  unit: z.string().min(1).nullable().optional(),
});

export const OfferingPriceUpdateSchema = OfferingPriceInsertSchema.partial().omit({
  offeringId: true,
});
