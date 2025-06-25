import { relations } from "drizzle-orm";
import { boolean, index, pgEnum, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { type z } from "zod";

import { AgentTable } from "./agents.schema";
import { PackageTable } from "./packages.schema";

export const USER_ROLES = {
  ADMIN: "admin",
  USER: "user",
  SUPERADMIN: "superadmin",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export const userRolesEnum = pgEnum("user_roles", [USER_ROLES.ADMIN, USER_ROLES.USER, USER_ROLES.SUPERADMIN]);

export const UserTable = pgTable(
  "users",
  {
    // IDs
    id: varchar("id", { length: 128 }).primaryKey(), // Using varchar instead of uuid because we're using clerk ID as the primary key
    stripeId: varchar("stripe_id", { length: 128 }).unique(),
    packageId: serial("package_id").references(() => PackageTable.id),
    // User data
    email: varchar("email").notNull().unique(),
    firstName: varchar("first_name"),
    lastName: varchar("last_name"),
    imageUrl: varchar("image_url").notNull().default(""),
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
  (table) => [index("users_deleted_at_idx").on(table.deletedAt), index("users_is_active_idx").on(table.isActive)],
);

export const userRelations = relations(UserTable, ({ one }) => ({
  package: one(PackageTable, {
    fields: [UserTable.packageId],
    references: [PackageTable.id],
  }),
  agent: one(AgentTable, {
    fields: [UserTable.id],
    references: [AgentTable.userId],
  }),
}));

export const UserInsertSchema = createInsertSchema(UserTable);

export const UserUpdateSchema = UserInsertSchema.partial();

export type UserInsert = z.infer<typeof UserInsertSchema>;
export type UserUpdate = z.infer<typeof UserUpdateSchema>;
