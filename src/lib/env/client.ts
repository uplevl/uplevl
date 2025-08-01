import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod/v4";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_ENV: z.enum(["development", "production"]).default("development"),
    NEXT_PUBLIC_URL: z.string().min(1),
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_POSTHOG_KEY: z.string().min(1),
    NEXT_PUBLIC_POSTHOG_HOST: z.string().min(1),
    NEXT_PUBLIC_META_INSTAGRAM_EMBEDDED_OAUTH_URL: z.string().min(1),
    NEXT_PUBLIC_FACEBOOK_PIXEL_ID: z.string().min(1),
  },
  emptyStringAsUndefined: true,
  experimental__runtimeEnv: {
    NEXT_PUBLIC_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    NEXT_PUBLIC_META_INSTAGRAM_EMBEDDED_OAUTH_URL: process.env.NEXT_PUBLIC_META_INSTAGRAM_EMBEDDED_OAUTH_URL,
    NEXT_PUBLIC_FACEBOOK_PIXEL_ID: process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID,
  },
});
