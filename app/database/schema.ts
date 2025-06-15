import { sql } from "drizzle-orm";
import { pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  // IDs
  id: serial("id").unique().primaryKey(),
  uuid: uuid("uuid")
    .default(sql`gen_random_uuid()`)
    .notNull()
    .unique(),
  clerkId: text("clerk_id").unique(),
  stripeId: text("stripe_id").unique(),
  // User data
  email: text("email").notNull().unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  // Timestamps
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date().toISOString()),
  deletedAt: timestamp("deleted_at", { mode: "string" }),
});
