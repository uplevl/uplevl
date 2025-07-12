import { index, pgEnum, pgTable, serial, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { type z } from "zod/v4";

import { AgentTable } from "./agents.schema";
import { UserTable } from "./users.schema";

export const INTEGRATION_STRATEGIES = {
  INSTAGRAM: "instagram",
  FACEBOOK: "facebook",
} as const;

export type IntegrationStrategy = (typeof INTEGRATION_STRATEGIES)[keyof typeof INTEGRATION_STRATEGIES];

export const integrationName = pgEnum("integration_name", [
  INTEGRATION_STRATEGIES.INSTAGRAM,
  INTEGRATION_STRATEGIES.FACEBOOK,
]);

export const IntegrationTable = pgTable(
  "integrations",
  {
    // Ids
    id: serial("id").primaryKey(),
    userId: varchar("user_id", { length: 128 })
      .references(() => UserTable.id, { onDelete: "cascade" })
      .notNull(),
    agentId: uuid("agent_id")
      .references(() => AgentTable.id, { onDelete: "cascade" })
      .notNull(),
    // Data
    name: integrationName("name").notNull(),
    token: varchar("token", { length: 512 }).notNull().unique(),
    expiresAt: timestamp("expires_at"),
    entityId: varchar("entity_id", { length: 128 }).notNull().unique(),

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

export const IntegrationSelectSchema = createSelectSchema(IntegrationTable).omit({
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export const IntegrationInsertSchema = createInsertSchema(IntegrationTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export const IntegrationUpdateSchema = IntegrationInsertSchema.partial();

export type Integration = z.infer<typeof IntegrationSelectSchema>;
export type IntegrationInsert = z.infer<typeof IntegrationInsertSchema>;
export type IntegrationUpdate = z.infer<typeof IntegrationUpdateSchema>;
