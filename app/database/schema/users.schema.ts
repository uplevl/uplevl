import { relations, sql } from "drizzle-orm";
import { boolean, index, integer, pgEnum, pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { agents } from "./agents.schema";
import { packages } from "./packages.schema";

export const USER_ROLES = {
  ADMIN: "admin",
  USER: "user",
  SUPERADMIN: "superadmin",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export const userRolesEnum = pgEnum("user_roles", [USER_ROLES.ADMIN, USER_ROLES.USER, USER_ROLES.SUPERADMIN]);

export const users = pgTable(
  "users",
  {
    // IDs
    id: serial("id").unique().primaryKey(),
    uuid: uuid("uuid")
      .default(sql`gen_random_uuid()`)
      .notNull()
      .unique(),
    clerkId: text("clerk_id").unique(),
    stripeId: text("stripe_id").unique(),
    packageId: integer("package_id")
      .references(() => packages.id)
      .notNull(),
    // User data
    email: text("email").notNull().unique(),
    firstName: text("first_name"),
    lastName: text("last_name"),
    role: userRolesEnum("role").notNull().default(USER_ROLES.USER),
    // Flags
    isActive: boolean("is_active").notNull().default(true),
    // Timestamps
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date().toISOString()),
    deletedAt: timestamp("deleted_at", { mode: "string" }),
  },
  (table) => [
    index("users_deleted_at_idx").on(table.deletedAt),
    index("users_clerk_id_idx").on(table.clerkId),
    index("users_stripe_id_idx").on(table.stripeId),
    index("users_is_active_idx").on(table.isActive),
  ],
);

export const userRelations = relations(users, ({ one }) => ({
  package: one(packages, {
    fields: [users.packageId],
    references: [packages.id],
  }),
  agent: one(agents, {
    fields: [users.clerkId],
    references: [agents.userId],
  }),
}));
