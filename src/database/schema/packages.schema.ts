import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, serial, smallint, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { type z } from "zod";

import { PackageFeatureTable } from "./packages-features.schema";
import { UserTable } from "./users.schema";

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

export const packageRelations = relations(PackageTable, ({ many }) => ({
  features: many(PackageFeatureTable),
  users: many(UserTable),
}));

export const PackageInsertSchema = createInsertSchema(PackageTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export const PackageUpdateSchema = PackageInsertSchema.partial();

export type PackageInsert = z.infer<typeof PackageInsertSchema>;
export type PackageUpdate = z.infer<typeof PackageUpdateSchema>;
