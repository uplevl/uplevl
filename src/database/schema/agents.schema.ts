import { boolean, index, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { UserTable } from "./users.schema";

export const AgentTable = pgTable(
  "agents",
  {
    // IDs
    id: uuid("id").primaryKey().defaultRandom(),
    userId: varchar("user_id", { length: 128 })
      .references(() => UserTable.id, { onDelete: "cascade" })
      .notNull(),
    // Business data
    businessName: varchar("business_name", { length: 200 }),
    businessDescription: text("business_description"),
    businessUrl: varchar("business_url", { length: 2083 }),
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
