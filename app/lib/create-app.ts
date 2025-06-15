import { Hono } from "hono";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";
import { logger } from "hono/logger";

export function createApp() {
  const app = new Hono();

  app.use("*", logger());
  app.use("*", cors());

  app.get("/healthcheck", (c) => {
    return c.json({ status: "ok" });
  });

  app.onError((error, c) => {
    if (error instanceof HTTPException) {
      // Sentry.captureMessage(error.message)
      return c.json({ error: error.message }, error.status);
    }

    if (error instanceof Error) {
      // Sentry.captureException(error)
      return c.json({ error: error.message }, 500);
    }

    // Sentry.captureException(error)
    return c.json({ error: "Internal server error" }, 500);
  });

  return app;
}
