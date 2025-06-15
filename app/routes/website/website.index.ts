import { Hono } from "hono";
import { serveStatic } from "hono/bun";

export const websiteRoute = new Hono().get("*", serveStatic({ root: "./dist/website", precompressed: true }));
