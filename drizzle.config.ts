import "dotenv/config";
import { type Config } from "drizzle-kit";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL env variable is required for Drizzle migrations.");
}

export default {
  schema: "./app/database/schema.ts",
  out: "./app/database/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL,
  },
} satisfies Config;
