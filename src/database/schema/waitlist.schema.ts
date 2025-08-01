import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const WaitlistTable = pgTable("waitlist", {
  id: varchar("id", { length: 128 }).primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  // Flags
  isConverted: boolean("is_converted").notNull().default(false),
  // Timestamps
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date().toISOString()),
  deletedAt: timestamp("deleted_at", { mode: "string" }),
});
