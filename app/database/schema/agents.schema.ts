import { relations, sql } from "drizzle-orm";
import { boolean, index, pgTable, serial, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { type z } from "zod/v4";

import { IntegrationTable } from "./integrations.schema";
import { OfferingTable } from "./offerings.schema";
import { SessionTable } from "./sessions.schema";
import { UserTable } from "./users.schema";

export const AgentTable = pgTable(
  "agents",
  {
    // IDs
    id: serial("id").primaryKey(),
    uuid: uuid("uuid")
      .default(sql`gen_random_uuid()`)
      .unique()
      .notNull(),
    userId: varchar("user_id")
      .references(() => UserTable.clerkId, { onDelete: "cascade" })
      .notNull(),
    // Business data
    businessName: varchar("business_name"),
    businessDescription: text("business_description"),
    businessUrl: varchar("business_url"),
    businessSocialGoals: text("business_social_goals"),
    businessContext: text("business_context"),
    // Flags
    isActive: boolean("is_active").notNull().default(true),
    // Timestamps
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date().toISOString()),
    deletedAt: timestamp("deleted_at", { mode: "string" }),
  },
  (table) => [
    index("agents_user_id_idx").on(table.userId),
    index("agents_deleted_at_idx").on(table.deletedAt),
    index("agents_is_active_idx").on(table.isActive),
  ],
);

export const agentRelations = relations(AgentTable, ({ one, many }) => ({
  user: one(UserTable, {
    fields: [AgentTable.userId],
    references: [UserTable.clerkId],
  }),
  offerings: many(OfferingTable),
  integrations: many(IntegrationTable),
  sessions: many(SessionTable),
}));

export const AgentInsertSchema = createInsertSchema(AgentTable).omit({
  id: true,
  uuid: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export const AgentUpdateSchema = AgentInsertSchema.partial();

export type AgentInsert = z.infer<typeof AgentInsertSchema>;
export type AgentUpdate = z.infer<typeof AgentUpdateSchema>;
