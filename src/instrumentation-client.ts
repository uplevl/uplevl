import { posthog } from "posthog-js";

import { env } from "./lib/env/client";

if (
  typeof window !== "undefined" &&
  !window.location.host.includes("127.0.0.1") &&
  !window.location.host.includes("localhost") &&
  env.NEXT_PUBLIC_ENV !== "development"
) {
  posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
    defaults: "2025-05-24",
    fetch_options: {
      cache: "force-cache", // Use Next.js cache
      next_options: {
        // Passed to the `next` option for `fetch`
        revalidate: 60, // Cache for 60 seconds
        tags: ["posthog"], // Can be used with Next.js `revalidateTag` function
      },
    },
  });
}
