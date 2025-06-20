import { createApp } from "@/lib/create-app";

import { serveStaticWebsite } from "./lib/serve-static-website";
import routes from "./routes/index.route";

const app = createApp();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const apiRoutes = app.basePath("/api").route("/", routes);

export type ApiRoutes = typeof apiRoutes;

// !! THE ORDER OF THESE MATTERS !!
await serveStaticWebsite("/dashboard", "./dist/dashboard", app);
await serveStaticWebsite("", "./dist/website", app);

export default app;
