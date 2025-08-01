import { z } from "zod/v4";

export const PackageFeatureInsertSchema = z.object({
  packageId: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().min(1),
  sortOrder: z.number().min(0),
  flagKey: z.string().min(1),
  separatorAfter: z.boolean().nullable(),
  isHighlighted: z.boolean().nullable(),
});

export const PackageFeatureUpdateSchema = PackageFeatureInsertSchema.partial().omit({
  packageId: true,
});
