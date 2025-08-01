import { index, pgEnum, pgTable, serial, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { AgentTable } from "./agents.schema";

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

export const SessionTable = pgTable(
  "sessions",
  {
    // IDs
    id: serial("id").primaryKey(),
    sessionId: varchar("session_id", { length: 128 }).notNull().unique(),
    agentId: uuid("agent_id").references(() => AgentTable.id),
    // Info
    source: sessionSource("source").notNull(),
    status: sessionStatus("status").notNull().default(SESSION_STATUSES.OPEN),
    intent: sessionIntent("intent"),
    // User info
    userName: varchar("user_name", { length: 100 }),
    userEmail: varchar("user_email", { length: 255 }),
    userPhone: varchar("user_phone", { length: 100 }),
    // Timestamps
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date().toISOString()),
    deletedAt: timestamp("deleted_at", { mode: "string" }),
  },
  (table) => [index("sessions_agent_id_idx").on(table.agentId), index("sessions_deleted_at_idx").on(table.deletedAt)],
);
