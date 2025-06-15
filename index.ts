import { env } from "@/env";

import app from "./app";

const IS_DEV = env.NODE_ENV === "development";

const server = Bun.serve({
  development: IS_DEV,
  hostname: "0.0.0.0",
  port: env.APP_PORT,
  fetch: app.fetch,
});

console.log(`"App" is running on ${server.url}`);

async function shutdown() {
  await server.stop();
}

process.on("SIGINT", () => {
  void shutdown();
  process.exit(0);
});

process.on("SIGTERM", () => {
  void shutdown();
  process.exit(0);
});
