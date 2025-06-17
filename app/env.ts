import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { z } from "zod/v4";

expand(config());

const EnvSchema = z
  .object({
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    LOG_LEVEL: z.enum(["debug", "info", "warn", "error", "fatal", "silent"]).optional().default("info"),
    INTERNAL_DOMAINS: z
      .string()
      .min(1)
      .transform((s) => s.split(","))
      .refine((arr) => arr.every((d) => /^[a-z0-9.-]+$/i.test(d)), {
        message: "Each domain must be a valid hostname",
      }),
    CLERK_SECRET_KEY: z.string().min(1),
    CLERK_WEBHOOK_SIGNING_SECRET: z.string().min(1),
    APP_PORT: z.coerce.number().optional().default(3000),
    DATABASE_URL: z.string().url(),
    DB_MIGRATING: z.coerce.boolean().optional().default(false),
    DB_SEEDING: z.coerce.boolean().optional().default(false),
    SEED_CLERK_USER_ID: z.string().min(1).optional(),
    SEED_STRIPE_ID: z.string().min(1).optional(),
    SEED_USER_EMAIL: z.string().email().optional(),
    SEED_INTEGRATION_INSTAGRAM_ENTITY_ID: z.string().min(1).optional(),
    SEED_INTEGRATION_INSTAGRAM_TOKEN: z.string().min(1).optional(),
  })
  // If DB_SEEDING is false, all the seeding variables are optional
  .refine((input) => {
    if (input.DB_SEEDING === true) {
      if (
        !input.SEED_CLERK_USER_ID ||
        !input.SEED_STRIPE_ID ||
        !input.SEED_USER_EMAIL ||
        !input.SEED_INTEGRATION_INSTAGRAM_ENTITY_ID ||
        !input.SEED_INTEGRATION_INSTAGRAM_TOKEN
      ) {
        return false;
      }
    }
    return true;
  });

const parsedResult = EnvSchema.safeParse(process.env);

if (!parsedResult.success) {
  console.error("❌ Invalid env:");
  console.error(JSON.stringify(z.treeifyError(parsedResult.error), null, 2));
  process.exit(1);
}

export const env = parsedResult.data;
