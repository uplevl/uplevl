import { z } from "zod/v4";

export const PackageInsertSchema = z.object({
  title: z.string().min(1),
  price: z.number().min(0),
  specialPrice: z.number().min(0).nullable(),
  stripePriceId: z.string().min(1),
  sortOrder: z.number().min(0),
  isPopular: z.boolean().nullable(),
  isActive: z.boolean().nullable(),
  isPreLaunch: z.boolean().nullable(),
});

export const PackageUpdateSchema = PackageInsertSchema.partial();
