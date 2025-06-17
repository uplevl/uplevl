import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { z } from "zod/v4";

expand(config());

const EnvSchema = z.object({
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
  SEED_CLERK_USER_ID: z.string().min(1),
  SEED_STRIPE_ID: z.string().min(1),
  SEED_USER_EMAIL: z.email(),
  SEED_INTEGRATION_INSTAGRAM_ENTITY_ID: z.string().min(1),
  SEED_INTEGRATION_INSTAGRAM_TOKEN: z.string().min(1),
});

const parsedResult = EnvSchema.safeParse(process.env);

if (!parsedResult.success) {
  console.error("❌ Invalid env:");
  console.error(JSON.stringify(z.treeifyError(parsedResult.error), null, 2));
  process.exit(1);
}

export const env = parsedResult.data;
