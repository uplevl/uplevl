import { relations, sql } from "drizzle-orm";
import { boolean, index, pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { type z } from "zod/v4";

import { integrations } from "./integrations.schema";
import { offerings } from "./offerings.schema";
import { sessions } from "./sessions.schema";
import { users } from "./users.schema";

export const agents = pgTable(
  "agents",
  {
    // IDs
    id: serial("id").primaryKey(),
    uuid: uuid("uuid")
      .default(sql`gen_random_uuid()`)
      .unique()
      .notNull(),
    userId: text("user_id")
      .references(() => users.clerkId, { onDelete: "cascade" })
      .notNull(),
    // Business data
    businessName: text("business_name"),
    businessDescription: text("business_description"),
    businessUrl: text("business_url"),
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

export const agentsRelations = relations(agents, ({ one, many }) => ({
  user: one(users, {
    fields: [agents.userId],
    references: [users.clerkId],
  }),
  offerings: many(offerings),
  integrations: many(integrations),
  sessions: many(sessions),
}));

export const AgentInsertSchema = createInsertSchema(agents).omit({
  id: true,
  uuid: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export const AgentUpdateSchema = AgentInsertSchema.partial();

export type AgentInsert = z.infer<typeof AgentInsertSchema>;
export type AgentUpdate = z.infer<typeof AgentUpdateSchema>;
