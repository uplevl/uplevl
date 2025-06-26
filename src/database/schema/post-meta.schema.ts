import { index, pgTable, serial, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { type z } from "zod";

import { PostTable } from "./posts.schema";

export const PostMetaTable = pgTable(
  "post_meta",
  {
    // IDs
    id: serial("id").primaryKey(),
    // References
    postId: uuid("post_id")
      .references(() => PostTable.id, { onDelete: "cascade" })
      .notNull(),
    // Data
    key: varchar("key", { length: 255 }).notNull(),
    value: text("value").notNull(),
    // Timestamps
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date().toISOString()),
    deletedAt: timestamp("deleted_at", { mode: "string" }),
  },
  (table) => [
    index("post_meta_post_id_idx").on(table.postId),
    index("post_meta_deleted_at_idx").on(table.deletedAt),
    index("post_meta_key_idx").on(table.key),
  ],
);

export const PostMetaInsertSchema = createInsertSchema(PostMetaTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export const PostMetaUpdateSchema = PostMetaInsertSchema.partial();

export type PostMeta = typeof PostMetaTable.$inferSelect;
export type PostMetaInsert = z.infer<typeof PostMetaInsertSchema>;
export type PostMetaUpdate = z.infer<typeof PostMetaUpdateSchema>;
