import { Hono } from "hono";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";

import type { AppBindings } from "@/lib/types";
import { pinoLogger } from "@/middlewares/pino-logger";

export function createApp() {
  const app = new Hono<AppBindings>();

  app.use(cors());
  app.use(pinoLogger());

  app.get("/healthcheck", (c) => {
    return c.json({ status: "ok" });
  });

  app.notFound((c) => {
    c.var.logger.error(c.req, "Not Found");
    return c.json({ error: "Not Found" }, 404);
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
