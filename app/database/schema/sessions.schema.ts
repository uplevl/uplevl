import { relations } from "drizzle-orm";
import { index, pgEnum, pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { agents } from "./agents.schema";
import { sessionsSummaries } from "./sessions-summaries";

export const SESSION_SOURCES = {
  WEBSITE: "website",
  FACEBOOK: "facebook",
  INSTAGRAM: "instagram",
} as const;

export type SessionSource = (typeof SESSION_SOURCES)[keyof typeof SESSION_SOURCES];

export const sessionSource = pgEnum("session_source", [
  SESSION_SOURCES.WEBSITE,
  SESSION_SOURCES.FACEBOOK,
  SESSION_SOURCES.INSTAGRAM,
]);

export const SESSION_STATUSES = {
  OPEN: "open",
  ENGAGED: "engaged",
  CONVERTED: "converted",
  ABANDONED: "abandoned",
  SPAM: "spam",
} as const;

export type SessionStatus = (typeof SESSION_STATUSES)[keyof typeof SESSION_STATUSES];

export const sessionStatus = pgEnum("session_status", [
  SESSION_STATUSES.OPEN,
  SESSION_STATUSES.ENGAGED,
  SESSION_STATUSES.CONVERTED,
  SESSION_STATUSES.ABANDONED,
  SESSION_STATUSES.SPAM,
]);

export const SESSION_INTENTS = {
  BOOKING: "booking",
  INQUIRY: "inquiry",
  SUPPORT: "support",
  OTHER: "other",
} as const;

export type SessionIntent = (typeof SESSION_INTENTS)[keyof typeof SESSION_INTENTS];

export const sessionIntent = pgEnum("session_intent", [
  SESSION_INTENTS.BOOKING,
  SESSION_INTENTS.INQUIRY,
  SESSION_INTENTS.SUPPORT,
  SESSION_INTENTS.OTHER,
]);

export const sessions = pgTable(
  "sessions",
  {
    // IDs
    id: serial("id").unique().primaryKey(),
    sessionId: text("session_id").notNull().unique(),
    agentId: uuid("agent_id").references(() => agents.uuid),
    // Info
    source: sessionSource("source").notNull(),
    status: sessionStatus("status").notNull().default(SESSION_STATUSES.OPEN),
    intent: sessionIntent("intent"),
    // User info
    userName: text("user_name"),
    userEmail: text("user_email"),
    userPhone: text("user_phone"),
    // Timestamps
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date().toISOString()),
    deletedAt: timestamp("deleted_at", { mode: "string" }),
  },
  (table) => [
    index("sessions_session_id_idx").on(table.sessionId),
    index("sessions_agent_id_idx").on(table.agentId),
    index("sessions_deleted_at_idx").on(table.deletedAt),
  ],
);

export const sessionsRelations = relations(sessions, ({ one, many }) => ({
  agent: one(agents, {
    fields: [sessions.agentId],
    references: [agents.uuid],
  }),
  sessionSummaries: many(sessionsSummaries),
}));
