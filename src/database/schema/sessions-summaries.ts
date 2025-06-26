import { relations } from "drizzle-orm";
import { boolean, index, integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { type z } from "zod";

import { SessionTable } from "./sessions.schema";

export const SessionSummaryTable = pgTable(
  "sessions_summaries",
  {
    // IDs
    id: serial("id").primaryKey(),
    // References
    sessionId: integer("session_id")
      .references(() => SessionTable.id, { onDelete: "cascade" })
      .notNull(),
    // Data
    converted: boolean("converted").notNull().default(false),
    conversationType: varchar("conversation_type", { length: 128 }),
    messagesCount: integer("messages_count"),
    durationSeconds: integer("duration_seconds"),
    summary: text("summary"),
    // Timestamps
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  },
  (table) => [index("sessions_summaries_session_id_idx").on(table.sessionId)],
);

export const sessionSummaryRelations = relations(SessionSummaryTable, ({ one }) => ({
  session: one(SessionTable, {
    fields: [SessionSummaryTable.sessionId],
    references: [SessionTable.id],
  }),
}));

export const SessionSummaryInsertSchema = createInsertSchema(SessionSummaryTable).omit({
  id: true,
  createdAt: true,
});

export const SessionSummaryUpdateSchema = SessionSummaryInsertSchema.partial();

export type SessionSummaryInsert = z.infer<typeof SessionSummaryInsertSchema>;
export type SessionSummaryUpdate = z.infer<typeof SessionSummaryUpdateSchema>;
