import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { type z } from "zod/v4";

import { packagesFeatures } from "./packages-features.schema";
import { users } from "./users.schema";

export const packages = pgTable("packages", {
  // IDs
  id: serial("id").primaryKey(),
  // Data
  title: text("title").notNull().unique(),
  price: integer("price").notNull(),
  specialPrice: integer("special_price"),
  stripePriceId: text("stripe_price_id").notNull().unique(),
  sortOrder: integer("sort_order").notNull().default(0),
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

export const PackageInsertSchema = createInsertSchema(packages).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export const PackageUpdateSchema = PackageInsertSchema.partial();

export type PackageInsert = z.infer<typeof PackageInsertSchema>;
export type PackageUpdate = z.infer<typeof PackageUpdateSchema>;
