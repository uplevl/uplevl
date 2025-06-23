import { zValidator } from "@hono/zod-validator";
import { z } from "zod/v4";

import { createRouter } from "@/lib/create-router";

import * as handlers from "./agent.handlers";

const ClerkIdSchema = z.object({
  clerkId: z.string().min(1),
});

const router = createRouter()
  // Routes
  .get("/:clerkId", zValidator("param", ClerkIdSchema), async (c) => {
    const params = c.req.valid("param");
    const response = await handlers.getByClerkId(params.clerkId);

    return c.json(response);
  });

export default router;
