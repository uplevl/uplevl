import "dotenv/config";
import { z } from "zod/v4";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  APP_PORT: z.coerce.number().default(8000),
  DASHBOARD_PORT: z.coerce.number().default(3000),
  DASHBOARD_PUBLIC_URL: z.url(),
  DASHBOARD_BASE_PATH: z.string().min(1).default("/"),
});

const parsedResults = envSchema.safeParse(process.env);

if (!parsedResults.success) {
  console.error("Invalid environment variables:", parsedResults.error);
  process.exit(1);
}

export const env = parsedResults.data;
