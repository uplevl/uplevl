import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { type z } from "zod/v4";

import { offerings } from "./offerings.schema";

export const offeringsPrices = pgTable("offerings_prices", {
  // IDs
  id: serial("id").primaryKey(),
  // References
  offeringId: integer("offering_id")
    .references(() => offerings.id, { onDelete: "cascade" })
    .notNull(),
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

export const OfferingPriceInsertSchema = createInsertSchema(offeringsPrices).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export const OfferingPriceUpdateSchema = OfferingPriceInsertSchema.partial();

export type OfferingPriceInsert = z.infer<typeof OfferingPriceInsertSchema>;
export type OfferingPriceUpdate = z.infer<typeof OfferingPriceUpdateSchema>;
