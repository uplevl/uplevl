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
    const payload = await c.req.json();
    const entry = payload.entry[0];

    if ("messaging" in entry) {
      const response = await handlers.message(entry);
      return c.body(response?.message, { status: response.status });
    }

    if ("changes" in entry) {
      const response = await handlers.comment(entry);
      return c.body(response.message, { status: response.status });
    }
  });

export default router;
