import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_ENV: z.enum(["development", "production"]).default("development"),
    NEXT_PUBLIC_URL: z.string().min(1),
    NEXT_PUBLIC_META_INSTAGRAM_EMBEDDED_OAUTH_URL: z.string().min(1),
  },
  emptyStringAsUndefined: true,
  experimental__runtimeEnv: {
    NEXT_PUBLIC_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_META_INSTAGRAM_EMBEDDED_OAUTH_URL: process.env.NEXT_PUBLIC_META_INSTAGRAM_EMBEDDED_OAUTH_URL,
  },
});
