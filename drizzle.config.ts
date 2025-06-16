import { type Config } from "drizzle-kit";

import { env } from "@/env";

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
