import { hc } from "hono/client";

import type { ApiRoutes } from "@/index";

const client = hc<ApiRoutes>("/");

export const api = client.api;
