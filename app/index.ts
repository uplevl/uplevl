import { Hono } from "hono";
import { cors } from "hono/cors";

import { env } from "@/env";

const app = new Hono()

  // Middleware

  .use(
    "*",
    cors({
      origin: env.DASHBOARD_PUBLIC_URL,
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      exposeHeaders: ["Content-Type", "Authorization"],
      // credentials: true,
    }),
  );

// Routes

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const apiRoutes = app.basePath("/api").get("/", (c) => {
  return c.json({ message: "Hello from Uplevl!" });
});

export type ApiRoutes = typeof apiRoutes;

export default app;
