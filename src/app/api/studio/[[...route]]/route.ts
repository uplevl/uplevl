import { Hono } from "hono";
import { handle } from "hono/vercel";

import { posts } from "@/features/posts/server";

export const runtime = "nodejs";

const app = new Hono().basePath("/api/studio");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app.route("/posts", posts);

export type AppType = typeof routes;

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
export const OPTIONS = handle(app);
