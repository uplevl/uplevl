import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { z } from "zod/v4";

expand(config());

const EnvSchema = z
  .object({
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    LOG_LEVEL: z.enum(["debug", "info", "warn", "error", "fatal", "silent"]).optional().default("info"),
    APP_PORT: z.coerce.number().optional().default(3000),
    INTERNAL_DOMAINS: z
      .string()
      .min(1)
      .transform((s) => s.split(","))
      .refine((arr) => arr.every((d) => /^[a-z0-9.-]+$/i.test(d)), {
        message: "Each domain must be a valid hostname",
      }),
    DATABASE_URL: z.string().url(),
    DB_MIGRATING: z.coerce.boolean().optional().default(false),
    DB_SEEDING: z.coerce.boolean().optional().default(false),
    SEED_CLERK_USER_ID: z.string().min(1).optional(),
    SEED_STRIPE_ID: z.string().min(1).optional(),
    SEED_USER_EMAIL: z.string().email().optional(),
    SEED_INTEGRATION_INSTAGRAM_ENTITY_ID: z.string().min(1).optional(),
    SEED_INTEGRATION_INSTAGRAM_TOKEN: z.string().min(1).optional(),
    POSTHOG_KEY: z.string().min(1),
    POSTHOG_HOST: z.string().url(),
    CLERK_SECRET_KEY: z.string().min(1),
    CLERK_WEBHOOK_SIGNING_SECRET: z.string().min(1),
    UPSTASH_REDIS_URL: z.string().url(),
    UPSTASH_REDIS_TOKEN: z.string().min(1),
    OPENAI_API_KEY: z.string().min(1),
    META_INSTAGRAM_WEBHOOK_VERIFY_TOKEN: z.string().min(1),
    META_INSTAGRAM_EMBEDDED_OAUTH_URL: z.url(),
    META_INSTAGRAM_BASE_URL: z.url(),
  })
  // If DB_SEEDING is false, all the seeding variables are optional
  .refine(
    (input) => {
      if (input.DB_SEEDING === true) {
        const missingVars = [];
        if (!input.SEED_CLERK_USER_ID) missingVars.push("SEED_CLERK_USER_ID");
        if (!input.SEED_STRIPE_ID) missingVars.push("SEED_STRIPE_ID");
        if (!input.SEED_USER_EMAIL) missingVars.push("SEED_USER_EMAIL");
        if (!input.SEED_INTEGRATION_INSTAGRAM_ENTITY_ID) missingVars.push("SEED_INTEGRATION_INSTAGRAM_ENTITY_ID");
        if (!input.SEED_INTEGRATION_INSTAGRAM_TOKEN) missingVars.push("SEED_INTEGRATION_INSTAGRAM_TOKEN");

        if (missingVars.length > 0) {
          throw new Error(
            `When DB_SEEDING is true, the following required variables are missing: ${missingVars.join(", ")}`,
          );
        }
      }
      return true;
    },
    {
      message:
        "Invalid environment configuration: When DB_SEEDING is true, all seeding variables (SEED_CLERK_USER_ID, SEED_STRIPE_ID, SEED_USER_EMAIL, SEED_INTEGRATION_INSTAGRAM_ENTITY_ID, SEED_INTEGRATION_INSTAGRAM_TOKEN) are required",
    },
  );

const parsedResult = EnvSchema.safeParse(process.env);

if (!parsedResult.success) {
  console.error("❌ Invalid env:");
  console.error(JSON.stringify(z.treeifyError(parsedResult.error), null, 2));
  process.exit(1);
}

export const env = parsedResult.data;
