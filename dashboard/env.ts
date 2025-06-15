import { z } from "zod/v4";

const EnvSchema = z.object({
  BASE_URL: z.string().min(1),
  VITE_CLERK_PUBLISHABLE_KEY: z.string().min(1),
});

const { data, error } = EnvSchema.safeParse(import.meta.env);

if (error) {
  console.error("❌ Invalid env:");
  console.error(JSON.stringify(z.treeifyError(error), null, 2));
  process.exit(1);
}

export const env = data;
