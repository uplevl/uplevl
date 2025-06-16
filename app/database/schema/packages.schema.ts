import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

import { packagesFeatures } from "./packages-features.schema";
import { users } from "./users.schema";

export const packages = pgTable("packages", {
  // IDs
  id: serial("id").unique().primaryKey(),
  // Data
  title: text("title").notNull().unique(),
  price: integer("price").notNull(),
  specialPrice: integer("special_price"),
  stripePriceId: text("stripe_price_id").notNull(),
  order: integer("order").notNull().default(0),
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

export const packagesRelations = relations(packages, ({ many }) => ({
  features: many(packagesFeatures),
  users: many(users),
}));
