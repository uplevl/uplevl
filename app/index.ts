import { createApp } from "@/lib/create-app";

import { serveStaticWebsite } from "./lib/serve-static-website";

const app = createApp();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const apiRoutes = app.basePath("/api").get("/", async (c) => {
  return c.json({ message: "Hello from Uplevl!" });
});

export type ApiRoutes = typeof apiRoutes;

await serveStaticWebsite("dashboard", app);

export default app;
