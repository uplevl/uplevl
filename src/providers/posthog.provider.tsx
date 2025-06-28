"use client";

import { posthog } from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

import { env } from "@/lib/env/client";

if (typeof window !== "undefined" && env.NEXT_PUBLIC_ENV !== "development") {
  posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
    capture_pageview: false, // Disable automatic pageview capture, as we capture manually
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

export function PHProvider({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
