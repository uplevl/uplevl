import { type Hono } from "hono";
import { serveStatic } from "hono/bun";

export function serveDashboard(app: Hono) {
  // Handle root-level files explicitly
  app.use("/dashboard/favicon.ico", serveStatic({ path: "./dist/dashboard/favicon.ico", precompressed: true }));
  app.use(
    "/dashboard/site.webmanifest",
    serveStatic({ path: "./dist/dashboard/site.webmanifest", precompressed: true }),
  );
  app.use(
    "/dashboard/favicon-16x16.png",
    serveStatic({ path: "./dist/dashboard/favicon-16x16.png", precompressed: true }),
  );
  app.use(
    "/dashboard/favicon-32x32.png",
    serveStatic({ path: "./dist/dashboard/favicon-32x32.png", precompressed: true }),
  );
  app.use(
    "/dashboard/apple-touch-icon.png",
    serveStatic({ path: "./dist/dashboard/apple-touch-icon.png", precompressed: true }),
  );
  app.use(
    "/dashboard/android-chrome-192x192.png",
    serveStatic({ path: "./dist/dashboard/android-chrome-192x192.png", precompressed: true }),
  );
  app.use(
    "/dashboard/android-chrome-512x512.png",
    serveStatic({ path: "./dist/dashboard/android-chrome-512x512.png", precompressed: true }),
  );
  app.use("/dashboard/og-image.png", serveStatic({ path: "./dist/dashboard/og-image.png", precompressed: true }));

  // Handle assets directory
  app.use(
    "/dashboard/assets/*",
    serveStatic({
      root: "./dist/dashboard",
      rewriteRequestPath: (path) => path.replace(/^\/dashboard/, ""),
      precompressed: true,
    }),
  );

  // Fallback to index.html for all other routes
  app.use("/dashboard*", serveStatic({ path: "./dist/dashboard/index.html", precompressed: true }));

  return app;
}
