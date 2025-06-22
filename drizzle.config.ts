import { type Config } from "drizzle-kit";
import { z } from "zod/v4";

const EnvSchema = z.object({
  DATABASE_URL: z.string().url(),
});

const { success, data: env, error } = EnvSchema.safeParse(process.env);

if (!success && error) {
  console.error("❌ Invalid env:");
  console.error(JSON.stringify(z.treeifyError(error), null, 2));
  process.exit(1);
}

if (!env.DATABASE_URL) {
  throw new Error("DATABASE_URL env variable is required for Drizzle migrations.");
}

export default {
  schema: "./app/database/schema",
  out: "./app/database/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
} satisfies Config;
