import { index, pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { type z } from "zod/v4";

import { AgentTable } from "./agents.schema";
import { UserTable } from "./users.schema";

export const POST_STATUSES = {
  DRAFT: "draft",
  PUBLISHED: "published",
  ARCHIVED: "archived",
} as const;

export type PostStatus = (typeof POST_STATUSES)[keyof typeof POST_STATUSES];

export const postStatusEnum = pgEnum("post_status", [
  POST_STATUSES.DRAFT,
  POST_STATUSES.PUBLISHED,
  POST_STATUSES.ARCHIVED,
]);

export const POST_REVIEW_STATUSES = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
} as const;

export type PostReviewStatus = (typeof POST_REVIEW_STATUSES)[keyof typeof POST_REVIEW_STATUSES];

export const postReviewStatusEnum = pgEnum("post_review_status", [
  POST_REVIEW_STATUSES.PENDING,
  POST_REVIEW_STATUSES.APPROVED,
  POST_REVIEW_STATUSES.REJECTED,
]);

export const PostTable = pgTable(
  "posts",
  {
    // IDs
    id: uuid("id").primaryKey().defaultRandom(),
    agentId: uuid("agent_id")
      .references(() => AgentTable.id, { onDelete: "cascade" })
      .notNull(),
    userId: varchar("user_id", { length: 128 })
      .references(() => UserTable.id, { onDelete: "cascade" })
      .notNull(),
    // Data
    content: text("content").notNull(),
    imageUrl: varchar("image_url", { length: 255 }).notNull(),
    status: postStatusEnum("status").notNull().default(POST_STATUSES.DRAFT),
    reviewStatus: postReviewStatusEnum("review_status").notNull().default(POST_REVIEW_STATUSES.PENDING),
    reviewedBy: varchar("reviewed_by", { length: 128 }),
    scheduledAt: timestamp("scheduled_at", { mode: "string" }),

    // Timestamps
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date().toISOString()),
    deletedAt: timestamp("deleted_at", { mode: "string" }),
  },
  (table) => [
    index("posts_agent_id_idx").on(table.agentId),
    index("posts_deleted_at_idx").on(table.deletedAt),
    index("posts_status_idx").on(table.status),
    index("posts_review_status_idx").on(table.reviewStatus),
    index("posts_scheduled_at_idx").on(table.scheduledAt),
  ],
);

export const PostInsertSchema = createInsertSchema(PostTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export const PostUpdateSchema = PostInsertSchema.partial();

export type Post = typeof PostTable.$inferSelect;
export type PostInsert = z.infer<typeof PostInsertSchema>;
export type PostUpdate = z.infer<typeof PostUpdateSchema>;
