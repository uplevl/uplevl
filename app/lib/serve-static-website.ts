import { type Hono } from "hono";
import { serveStatic } from "hono/bun";
import type { Dirent } from "node:fs";
import { readdir } from "node:fs/promises";

import type { AppBindings } from "./types";

export async function serveStaticWebsite(route: string, folder: string, app: Hono<AppBindings>) {
  let entries: Dirent<string>[];

  try {
    entries = await readdir(folder, { withFileTypes: true });
  } catch {
    console.warn(`[serveStaticWebsite] Static site "${route}" not found at ${folder} - skipping registration`);
    return;
  }

  entries
    .filter((entry) => entry.isFile())
    .forEach((entry) => {
      if (entry.name.endsWith(".html")) {
        return;
      }

      app.use(
        `${route}/${entry.name}`,
        serveStatic({
          path: `${folder}/${entry.name}`,
          precompressed: true,
          onFound: (_path, c) => {
            c.header("Cache-Control", "public, max-age=31536000, immutable");
          },
        }),
      );
    });

  app.use(
    `${route}/assets/*`,
    serveStatic({
      root: `${folder}`,
      rewriteRequestPath: (path) => path.replace(`${route}`, ""),
      precompressed: true,
      onFound: (_path, c) => {
        c.header("Cache-Control", "public, max-age=31536000, immutable");
      },
    }),
  );

  app.use(
    `${route}/_astro/*`,
    serveStatic({
      root: `${folder}`,
      rewriteRequestPath: (path) => path.replace(`${route}`, ""),
      precompressed: true,
      onFound: (_path, c) => {
        c.header("Cache-Control", "public, max-age=31536000, immutable");
      },
    }),
  );

  app.use(
    `${route}*`,
    serveStatic({
      path: `${folder}/index.html`,
      precompressed: true,
      onFound: (_path, c) => {
        c.header("Cache-Control", "no-cache");
      },
    }),
  );
}
