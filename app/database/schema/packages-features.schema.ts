import { relations } from "drizzle-orm";
import { boolean, index, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

import { packages } from "./packages.schema";

export const packagesFeatures = pgTable(
  "packages_features",
  {
    // IDs
    id: serial("id").unique().primaryKey(),
    // References
    packageId: integer("package_id")
      .references(() => packages.id, { onDelete: "cascade" })
      .notNull(),
    // Data
    title: text("title").notNull(),
    description: text("description").notNull(),
    icon: text("icon").notNull(),
    order: integer("order").notNull().default(0),
    flagKey: text("flag_key").notNull(),
    // Flags
    separatorAfter: boolean("separator_after").notNull().default(false),
    isHighlighted: boolean("is_highlighted").notNull().default(false),
    // Timestamps
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date().toISOString()),
    deletedAt: timestamp("deleted_at", { mode: "string" }),
  },
  (table) => [index("packages_features_package_id_idx").on(table.packageId)],
);

export const packagesFeaturesRelations = relations(packagesFeatures, ({ one }) => ({
  package: one(packages, {
    fields: [packagesFeatures.packageId],
    references: [packages.id],
  }),
}));
