import { boolean, integer, pgTable, serial, smallint, timestamp, varchar } from "drizzle-orm/pg-core";

export const PackageTable = pgTable("packages", {
  // IDs
  id: serial("id").primaryKey(),
  // Data
  title: varchar("title", { length: 128 }).notNull().unique(),
  price: integer("price").notNull(),
  specialPrice: integer("special_price"),
  stripePriceId: varchar("stripe_price_id", { length: 128 }).notNull().unique(),
  sortOrder: smallint("sort_order").notNull().default(0),
  // Flags
  isPopular: boolean("is_popular").notNull().default(false),
  isActive: boolean("is_active").notNull().default(true),
  isPreLaunch: boolean("is_pre_launch").notNull().default(false),
  // Timestamps
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date().toISOString()),
  deletedAt: timestamp("deleted_at", { mode: "string" }),
});
