import { PostHog } from "posthog-node";

import { env } from "@/lib/env/server";

export const posthogClient = new PostHog(env.POSTHOG_KEY, {
  host: env.POSTHOG_HOST,
  flushAt: 1,
  flushInterval: 0,
});
