import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

import { offerings } from "./offerings.schema";

export const offeringsPrices = pgTable("offerings_prices", {
  // IDs
  id: serial("id").unique().primaryKey(),
  // References
  offeringId: integer("offering_id").references(() => offerings.id, { onDelete: "cascade" }),
  // Prices
  price: integer("price").notNull(),
  tier: text("tier"),
  unit: text("unit"),
  // Timestamps
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date().toISOString()),
  deletedAt: timestamp("deleted_at", { mode: "string" }),
});

export const offeringsPricesRelations = relations(offeringsPrices, ({ one }) => ({
  offering: one(offerings, {
    fields: [offeringsPrices.offeringId],
    references: [offerings.id],
  }),
}));
