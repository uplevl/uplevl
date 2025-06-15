import { z } from "zod/v4";

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  APP_PORT: z.coerce.number().optional().default(8080),
  DATABASE_URL: z.string().url(),
  DB_MIGRATING: z.coerce.boolean().optional().default(false),
  DB_SEEDING: z.coerce.boolean().optional().default(false),
});

const parsedResult = EnvSchema.safeParse(process.env);

if (!parsedResult.success) {
  console.error("❌ Invalid env:");
  console.error(JSON.stringify(z.treeifyError(parsedResult.error), null, 2));
  process.exit(1);
}

export const env = parsedResult.data;
