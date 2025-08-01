import { z } from "zod/v4";

import { INTEGRATION_STRATEGIES } from "../schema/integrations.schema";

export const IntegrationInsertSchema = z.object({
  userId: z.string().min(1),
  agentId: z.string().min(1),
  name: z.enum(INTEGRATION_STRATEGIES),
  token: z.string().min(1),
  expiresAt: z.date().nullable().optional(),
  entityId: z.string().min(1),
});

export const IntegrationUpdateSchema = IntegrationInsertSchema.partial().omit({
  userId: true,
  agentId: true,
});
