import { relations } from "drizzle-orm";
import { index, integer, pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { agents } from "./agents.schema";
import { offeringsPrices } from "./offerings-prices.schema";

export const offerings = pgTable(
  "offerings",
  {
    // IDs
    id: serial("id").unique().primaryKey(),
    // References
    agentId: uuid("agent_id")
      .references(() => agents.uuid, { onDelete: "cascade", onUpdate: "cascade" })
      .notNull(),
    // Offerings
    title: text("title").notNull(),
    description: text("description").notNull(),
    category: text("category"),
    order: integer("order").notNull().default(0),
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

export const offeringsRelations = relations(offerings, ({ one, many }) => ({
  agent: one(agents, {
    fields: [offerings.agentId],
    references: [agents.uuid],
  }),
  prices: many(offeringsPrices),
}));
