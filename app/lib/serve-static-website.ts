import { type Hono } from "hono";
import { serveStatic } from "hono/bun";
import type { Dirent } from "node:fs";
import { readdir } from "node:fs/promises";

export async function serveStaticWebsite(name: string, app: Hono) {
  let entries: Dirent<string>[];

  try {
    entries = await readdir(`./dist/${name}`, { withFileTypes: true });
  } catch {
    console.warn(`[serveStaticWebsite] Static site "${name}" not found at ${`./dist/${name}`} – skipping registration`);
    return;
  }

  entries
    .filter((entry) => entry.isFile())
    .forEach((entry) => {
      if (!entry.name.endsWith(".html")) {
        return;
      }

      app.use(
        `/${name}/${entry.name}`,
        serveStatic({
          path: `./dist/${name}/${entry.name}`,
          precompressed: true,
          onFound: (_path, c) => {
            c.header("Cache-Control", "public, max-age=31536000, immutable");
          },
        }),
      );
    });

  app.use(
    `/${name}/assets/*`,
    serveStatic({
      root: `./dist/${name}`,
      rewriteRequestPath: (path) => path.replace(`/${name}`, ""),
      precompressed: true,
      onFound: (_path, c) => {
        c.header("Cache-Control", "public, max-age=31536000, immutable");
      },
    }),
  );

  app.use(
    `/${name}*`,
    serveStatic({
      path: `./dist/${name}/index.html`,
      precompressed: true,
      onFound: (_path, c) => {
        c.header("Cache-Control", "no-cache");
      },
    }),
  );
}
