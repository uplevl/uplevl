import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    NGROK_AUTH_TOKEN: z.string().min(1),
    SEED_CLERK_USER_ID: z.string().min(1),
    SEED_INTEGRATION_INSTAGRAM_TOKEN: z.string().min(1),
    SEED_INTEGRATION_INSTAGRAM_ENTITY_ID: z.string().min(1),
    SEED_STRIPE_ID: z.string().min(1),
    SEED_USER_EMAIL: z.string().min(1),
  },
  emptyStringAsUndefined: true,
  experimental__runtimeEnv: process.env,
});
