import { integer, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

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
