import { createApp } from "@/lib/create-app";

import { serveDashboard } from "./lib/serve-dashboard";

const app = createApp();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const apiRoutes = app.basePath("/api").get("/", async (c) => {
  return c.json({ message: "Hello from Uplevl!" });
});

export type ApiRoutes = typeof apiRoutes;

serveDashboard(app);

export default app;
