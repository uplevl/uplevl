import { relations, sql } from "drizzle-orm";
import { boolean, index, integer, pgEnum, pgTable, serial, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { type z } from "zod/v4";

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
    id: serial("id").primaryKey(),
    uuid: uuid("uuid")
      .default(sql`gen_random_uuid()`)
      .notNull()
      .unique(),
    clerkId: varchar("clerk_id", { length: 128 }).unique(),
    stripeId: varchar("stripe_id", { length: 128 }).unique(),
    packageId: integer("package_id").references(() => PackageTable.id),
    // User data
    email: varchar("email").notNull().unique(),
    firstName: varchar("first_name"),
    lastName: varchar("last_name"),
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
    fields: [UserTable.clerkId],
    references: [AgentTable.userId],
  }),
}));

export const UserInsertSchema = createInsertSchema(UserTable).omit({
  id: true,
  uuid: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export const UserUpdateSchema = UserInsertSchema.partial();

export type UserInsert = z.infer<typeof UserInsertSchema>;
export type UserUpdate = z.infer<typeof UserUpdateSchema>;
