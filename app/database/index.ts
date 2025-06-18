import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { z } from "zod/v4";

import * as schema from "./schema";

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  DATABASE_URL: z.string().url(),
  DB_MIGRATING: z.coerce.boolean().default(false),
  DB_SEEDING: z.coerce.boolean().default(false),
});

const { success, data: env, error } = await EnvSchema.safeParse(process.env);

if (!success && error) {
  console.error("❌ Invalid env:");
  console.error(JSON.stringify(z.treeifyError(error), null, 2));
  process.exit(1);
}

export const connection = postgres(env.DATABASE_URL, {
  max: env.DB_MIGRATING || env.DB_SEEDING ? 1 : undefined,
  onnotice: env.DB_SEEDING ? () => null : undefined,
  prepare: false,
});

export const db = drizzle(connection, {
  schema,
  logger: env.NODE_ENV === "development" && !env.DB_SEEDING,
});
