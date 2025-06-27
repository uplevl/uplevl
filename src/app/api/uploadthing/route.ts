import { createRouteHandler } from "uploadthing/next";

import { postImageFileRouter } from "./core";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: postImageFileRouter,

  // Apply an (optional) custom config:
  // config: { ... },
});
