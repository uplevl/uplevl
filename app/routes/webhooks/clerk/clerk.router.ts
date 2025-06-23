import type { UserJSON } from "@clerk/backend";
import { verifyWebhook } from "@clerk/backend/webhooks";
import type { ContentfulStatusCode } from "hono/utils/http-status";

import { env } from "@/env";

import { createRouter } from "@/lib/create-router";

import * as handlers from "./clerk.handlers";

const eventHandlers = {
  "user.created": handlers.create,
  "user.updated": handlers.update,
  "user.deleted": handlers.remove,
} as const;

const router = createRouter().post("/", async (c) => {
  try {
    const evt = await verifyWebhook(c.req.raw, {
      signingSecret: env.CLERK_WEBHOOK_SIGNING_SECRET,
    });
    const data = evt.data as UserJSON;
    const eventType = evt.type;

    if (env.NODE_ENV === "development") {
      console.log("Webhook received:", eventType);
      console.log("Webhook data:", data);
    }

    const handler = eventHandlers[eventType as keyof typeof eventHandlers];
    if (!handler) {
      return c.text("Unsupported event type", { status: 400 });
    }

    const { status, message } = await handler(data);

    return c.body(message, { status: status as ContentfulStatusCode });
  } catch (error) {
    console.error("Error processing webhook:", error);

    // Handle signature verification errors
    if (
      error instanceof Error &&
      (error.message.includes("signature") ||
        error.message.includes("webhook") ||
        error.message.includes("verification"))
    ) {
      return c.body("Invalid webhook signature", { status: 401 });
    }

    // Handle other client-side errors
    if (error instanceof Error && error.message.includes("Invalid")) {
      return c.body("Invalid request", { status: 400 });
    }

    // Handle all other errors as server errors
    return c.body("Error processing webhook", { status: 500 });
  }
});

export default router;
