import { type Hono } from "hono";
import { serveStatic } from "hono/bun";
import { readdir } from "node:fs/promises";

export async function serveStaticWebsite(name: string, app: Hono) {
  const files = await readdir(`./dist/${name}`);

  files.forEach((file) => {
    if (!file.endsWith(".html")) {
      app.use(
        `/${name}/${file}`,
        serveStatic({
          path: `./dist/${name}/${file}`,
          precompressed: true,
          onFound: (_path, c) => {
            c.header("Cache-Control", "public, max-age=31536000, immutable");
          },
        }),
      );
    }
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
    `/${name}/*`,
    serveStatic({
      path: `./dist/${name}/index.html`,
      precompressed: true,
      onFound: (_path, c) => {
        c.header("Cache-Control", "no-cache");
      },
    }),
  );

  return app;
}
