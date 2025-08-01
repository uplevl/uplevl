import { z } from "zod/v4";

import { USER_ROLES } from "../schema/users.schema";

export const UserInsertSchema = z.object({
  id: z.string().min(1),
  stripeId: z.string().min(1).nullable().optional(),
  packageId: z.number().min(1).optional(),
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  imageUrl: z.string().min(1),
  role: z.enum(USER_ROLES).optional(),
  isActive: z.boolean().optional(),
});

export const UserUpdateSchema = UserInsertSchema.partial().omit({
  id: true,
});
