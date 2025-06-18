import { createRouter } from "@/lib/create-router";
import * as handlers from "@/routes/webhooks/instagram/instagram.handlers";

const router = createRouter()
  .get("/", (c) => {
    const hub = c.req.query("hub.challenge");
    if (!hub || typeof hub !== "string") {
      return c.body("Invalid challenge", { status: 400 });
    }
    return c.body(hub, { status: 200 });
  })

  .post("/", async (c) => {
    try {
      const payload = await c.req.json();

      if (!payload || !Array.isArray(payload.entry) || payload.entry.length === 0) {
        return c.body("Invalid payload structure", { status: 400 });
      }

      const entry = payload.entry[0];

      if ("messaging" in entry) {
        const response = await handlers.message(entry);
        return c.body(response?.message, { status: response?.status || 500 });
      }

      if ("changes" in entry) {
        const response = await handlers.comment(entry);
        return c.body(response?.message, { status: response?.status || 500 });
      }

      return c.body("Unhandled entry type", { status: 400 });
    } catch (error) {
      console.error("Error processing Instagram webhook:", error);
      return c.body("Internal server error", { status: 500 });
    }
  });

export default router;
