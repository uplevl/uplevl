import { boolean, integer, pgTable, serial, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { AgentTable } from "./agents.schema";
import { IntegrationTable } from "./integrations.schema";

export const PostsCommentsTable = pgTable("posts_comments", {
  id: serial("id").primaryKey(),
  integrationId: integer("integration_id")
    .references(() => IntegrationTable.id, { onDelete: "cascade" })
    .notNull(),
  agentId: uuid("agent_id")
    .references(() => AgentTable.id, { onDelete: "cascade" })
    .notNull(),
  entityId: varchar("entity_id", { length: 128 }).notNull(),

  // Data
  commentId: varchar("comment_id", { length: 128 }).notNull(),
  commenterId: varchar("commenter_id", { length: 128 }).notNull(),
  commenterUsername: varchar("commenter_username", { length: 128 }).notNull(),
  commentText: text("comment_text").notNull(),
  commentTimestamp: timestamp("comment_timestamp", { mode: "string" }).notNull(),
  aiResponse: text("ai_response"),
  aiResponseTimestamp: timestamp("ai_response_timestamp", { mode: "string" }),
  isBookingInterest: boolean("is_booking_interest").notNull().default(false),

  // Timestamps
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date().toISOString()),
});
