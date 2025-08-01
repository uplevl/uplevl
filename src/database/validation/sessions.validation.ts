import { z } from "zod/v4";

import { SESSION_INTENTS, SESSION_SOURCES, SESSION_STATUSES } from "../schema/sessions.schema";

export const SessionInsertSchema = z.object({
  agentId: z.string().min(1),
  sessionId: z.string().min(1),
  source: z.enum(SESSION_SOURCES),
  status: z.enum(SESSION_STATUSES),
  intent: z.enum(SESSION_INTENTS),
  userEmail: z.string().min(1),
  userPhone: z.string().min(1),
});

export const SessionUpdateSchema = SessionInsertSchema.partial().omit({
  agentId: true,
  sessionId: true,
});
