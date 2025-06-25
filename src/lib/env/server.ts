import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    PUBLIC_URL: z.string().min(1),
    DB_HOST: z.string().min(1),
    DB_PORT: z.string().min(1),
    DB_USER: z.string().min(1),
    DB_PASSWORD: z.string().min(1),
    DB_NAME: z.string().min(1),
    DB_MIGRATING: z.coerce.boolean().default(false),
    DB_SEEDING: z.coerce.boolean().default(false),
    CLERK_SECRET_KEY: z.string().min(1),
    CLERK_WEBHOOK_SIGNING_SECRET: z.string().min(1),
    PIPEDRIVE_API_URL: z.string().min(1),
    PIPEDRIVE_API_KEY: z.string().min(1),
    UPSTASH_REDIS_URL: z.string().min(1),
    UPSTASH_REDIS_TOKEN: z.string().min(1),
    OPENAI_API_KEY: z.string().min(1),
    META_INSTAGRAM_WEBHOOK_VERIFY_TOKEN: z.string().min(1),
    META_INSTAGRAM_BASE_URL: z.string().min(1),
    META_INSTAGRAM_CLIENT_ID: z.string().min(1),
    META_INSTAGRAM_CLIENT_SECRET: z.string().min(1),
  },
  createFinalSchema: (env) =>
    z.object(env).transform((val) => {
      const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, ...rest } = val;

      return {
        ...rest,
        DATABASE_URL: `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
      };
    }),
  emptyStringAsUndefined: true,
  experimental__runtimeEnv: process.env,
});
