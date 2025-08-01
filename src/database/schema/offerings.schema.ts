import { index, pgTable, serial, smallint, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { AgentTable } from "./agents.schema";

export const OfferingTable = pgTable(
  "offerings",
  {
    // IDs
    id: serial("id").primaryKey(),
    // References
    agentId: uuid("agent_id")
      .references(() => AgentTable.id, { onDelete: "cascade", onUpdate: "cascade" })
      .notNull(),
    // Offerings
    title: varchar("title", { length: 200 }).notNull(),
    description: text("description").notNull(),
    category: varchar("category", { length: 128 }),
    sortOrder: smallint("sort_order").notNull().default(0),
    // Timestamps
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date().toISOString()),
    deletedAt: timestamp("deleted_at", { mode: "string" }),
  },
  (table) => [index("offerings_deleted_at_idx").on(table.deletedAt), index("offerings_agent_id_idx").on(table.agentId)],
);
