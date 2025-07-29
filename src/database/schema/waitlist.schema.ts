import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { type z } from "zod/v4";

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

export const WaitlistInsertSchema = createInsertSchema(WaitlistTable);

export const WaitlistUpdateSchema = WaitlistInsertSchema.partial();

export type WaitlistInsert = z.infer<typeof WaitlistInsertSchema>;
export type WaitlistUpdate = z.infer<typeof WaitlistUpdateSchema>;
