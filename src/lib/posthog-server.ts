import { PostHog } from "posthog-node";

import { env } from "@/lib/env/server";

let posthogInstance: PostHog | null = null;

export function getPostHogServer() {
  if (!posthogInstance) {
    posthogInstance = new PostHog(env.POSTHOG_KEY, {
      host: env.POSTHOG_HOST,
      flushAt: 1,
      flushInterval: 0,
    });
  }

  return posthogInstance;
}
