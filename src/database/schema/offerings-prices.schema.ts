import { integer, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { type z } from "zod/v4";

import { OfferingTable } from "./offerings.schema";

export const OfferingPriceTable = pgTable("offerings_prices", {
  // IDs
  id: serial("id").primaryKey(),
  // References
  offeringId: integer("offering_id")
    .references(() => OfferingTable.id, { onDelete: "cascade" })
    .notNull(),
  // Prices
  price: integer("price").notNull(),
  tier: varchar("tier", { length: 128 }),
  unit: varchar("unit", { length: 128 }),
  // Timestamps
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date().toISOString()),
  deletedAt: timestamp("deleted_at", { mode: "string" }),
});

export const OfferingPriceInsertSchema = createInsertSchema(OfferingPriceTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export const OfferingPriceUpdateSchema = createUpdateSchema(OfferingPriceTable).omit({
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export type OfferingPriceInsert = z.infer<typeof OfferingPriceInsertSchema>;
export type OfferingPriceUpdate = z.infer<typeof OfferingPriceUpdateSchema>;
