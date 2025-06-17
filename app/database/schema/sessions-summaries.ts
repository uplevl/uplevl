import { relations } from "drizzle-orm";
import { boolean, index, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { type z } from "zod/v4";

import { sessions } from "./sessions.schema";

export const sessionsSummaries = pgTable(
  "sessions_summaries",
  {
    // IDs
    id: serial("id").unique().primaryKey(),
    // References
    sessionId: integer("session_id")
      .references(() => sessions.id, { onDelete: "cascade" })
      .notNull(),
    // Data
    converted: boolean("converted").notNull().default(false),
    conversationType: text("conversation_type"),
    messagesCount: integer("messages_count"),
    durationSeconds: integer("duration_seconds"),
    // Timestamps
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  },
  (table) => [index("sessions_summaries_session_id_idx").on(table.sessionId)],
);

export const sessionsSummariesRelations = relations(sessionsSummaries, ({ one }) => ({
  session: one(sessions, {
    fields: [sessionsSummaries.sessionId],
    references: [sessions.id],
  }),
}));

export const SessionSummaryInsertSchema = createInsertSchema(sessionsSummaries).omit({
  id: true,
  createdAt: true,
});

export const SessionSummaryUpdateSchema = SessionSummaryInsertSchema.partial();

export type SessionSummaryInsert = z.infer<typeof SessionSummaryInsertSchema>;
export type SessionSummaryUpdate = z.infer<typeof SessionSummaryUpdateSchema>;
