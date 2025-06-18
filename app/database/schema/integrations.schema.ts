import { relations } from "drizzle-orm";
import { index, pgEnum, pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { type z } from "zod/v4";

import { agents } from "./agents.schema";
import { users } from "./users.schema";

export const INTEGRATION_STRATEGIES = {
  INSTAGRAM: "instagram",
  FACEBOOK: "facebook",
} as const;

export type IntegrationStrategy = (typeof INTEGRATION_STRATEGIES)[keyof typeof INTEGRATION_STRATEGIES];

export const integrationName = pgEnum("integration_name", [
  INTEGRATION_STRATEGIES.INSTAGRAM,
  INTEGRATION_STRATEGIES.FACEBOOK,
]);

export const integrations = pgTable(
  "integrations",
  {
    // Ids
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .references(() => users.clerkId, { onDelete: "cascade" })
      .notNull(),
    agentId: uuid("agent_id")
      .references(() => agents.uuid, { onDelete: "cascade" })
      .notNull(),
    // Data
    name: integrationName("name").notNull(),
    token: text("token").notNull().unique(),
    expiresAt: timestamp("expires_at"),
    entityId: text("entity_id").notNull().unique(),

    // Timestamps
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date().toISOString()),
    deletedAt: timestamp("deleted_at", { mode: "string" }),
  },
  (table) => [
    index("integrations_user_id_idx").on(table.userId),
    index("integrations_agent_id_idx").on(table.agentId),
    index("integrations_deleted_at_idx").on(table.deletedAt),
  ],
);

export const integrationsRelations = relations(integrations, ({ one }) => ({
  agent: one(agents, {
    fields: [integrations.agentId],
    references: [agents.uuid],
  }),
  user: one(users, {
    fields: [integrations.userId],
    references: [users.clerkId],
  }),
}));

export const IntegrationSelectSchema = createSelectSchema(integrations).omit({
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export const IntegrationInsertSchema = createInsertSchema(integrations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export const IntegrationUpdateSchema = IntegrationInsertSchema.partial();

export type Integration = z.infer<typeof IntegrationSelectSchema>;
export type IntegrationInsert = z.infer<typeof IntegrationInsertSchema>;
export type IntegrationUpdate = z.infer<typeof IntegrationUpdateSchema>;
