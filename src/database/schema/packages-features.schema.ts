import { boolean, index, integer, pgTable, serial, smallint, timestamp, varchar } from "drizzle-orm/pg-core";

import { PackageTable } from "./packages.schema";

export const PackageFeatureTable = pgTable(
  "packages_features",
  {
    // IDs
    id: serial("id").unique().primaryKey(),
    // References
    packageId: integer("package_id")
      .references(() => PackageTable.id, { onDelete: "cascade" })
      .notNull(),
    // Data
    title: varchar("title", { length: 200 }).notNull(),
    description: varchar("description", { length: 255 }).notNull(),
    icon: varchar("icon", { length: 200 }).notNull(),
    sortOrder: smallint("sort_order").notNull().default(0),
    flagKey: varchar("flag_key", { length: 100 }).notNull(),
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
  (table) => [
    index("packages_features_package_id_idx").on(table.packageId),
    index("packages_features_sort_order_idx").on(table.sortOrder),
  ],
);
