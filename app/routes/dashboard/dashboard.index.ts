import { Hono } from "hono";
import { serveStatic } from "hono/bun";

export const dashboardRoute = new Hono()
  .get("*", serveStatic({ root: "./dist/dashboard", precompressed: true }))
  .get("*", serveStatic({ path: "./dist/dashboard/index.html", precompressed: true }));
