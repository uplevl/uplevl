import { z } from "zod/v4";

export const WaitlistInsertSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  isConverted: z.boolean().nullable(),
});

export const WaitlistUpdateSchema = WaitlistInsertSchema.partial();
