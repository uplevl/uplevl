import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod/v4";

import { PostInsertSchema, PostUpdateSchema } from "@/database/validation/posts.validation";

import { getPostHogServer } from "@/lib/posthog-server";

import { deletePost, insertPost, updatePost } from "@/features/posts/api/mutations";
import { GetPostsFilterSchema, getPosts } from "@/features/posts/api/queries";

export const posts = new Hono()
  // Get All Posts
  .get("/", zValidator("json", z.object({ filters: GetPostsFilterSchema.optional() })), async (c) => {
    const posthog = getPostHogServer();

    try {
      const { filters } = c.req.valid("json");
      const posts = await getPosts({ filters });

      return c.json({ posts, message: null, error: null });
    } catch (error) {
      console.error(error);
      posthog.captureException(error);
      return c.json(
        {
          posts: null,
          message: "Failed to get posts",
          error: error instanceof Error ? error.message : "Unknown error",
        },
        500,
      );
    }
  })
  // Create Post
  .post("/", zValidator("json", PostInsertSchema), async (c) => {
    const posthog = getPostHogServer();

    try {
      const data = (await c.req.json()) as z.infer<typeof PostInsertSchema>;

      await insertPost(data);

      return c.json({ message: "Post created", error: null }, 201);
    } catch (error) {
      console.error(error);
      posthog.captureException(error);
      return c.json(
        { message: "Failed to create post", error: error instanceof Error ? error.message : "Unknown error" },
        500,
      );
    }
  })
  // Update Post
  .patch("/:id", zValidator("param", z.object({ id: z.string() })), zValidator("json", PostUpdateSchema), async (c) => {
    const posthog = getPostHogServer();

    try {
      const { id } = c.req.valid("param");
      const data = c.req.valid("json");

      await updatePost(id, data);

      return c.json({ message: "Post updated", error: null }, 200);
    } catch (error) {
      console.error(error);
      posthog.captureException(error);
      return c.json(
        { message: "Failed to update post", error: error instanceof Error ? error.message : "Unknown error" },
        500,
      );
    }
  })
  // Delete Post
  .delete("/:id", zValidator("param", z.object({ id: z.string() })), async (c) => {
    const posthog = getPostHogServer();

    try {
      const { id } = c.req.valid("param");

      await deletePost(id);

      return c.json({ message: "Post deleted", error: null }, 200);
    } catch (error) {
      console.error(error);
      posthog.captureException(error);
      return c.json(
        { message: "Failed to delete post", error: error instanceof Error ? error.message : "Unknown error" },
        500,
      );
    }
  });
