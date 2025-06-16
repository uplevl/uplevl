import { z } from "zod/v4";

const EnvSchema = z.object({
  BASE_URL: z.string().min(1),
  VITE_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  VITE_POSTHOG_KEY: z.string().min(1),
  VITE_POSTHOG_HOST: z.string().url(),
});

const parsedResult = EnvSchema.safeParse(import.meta.env);

if (!parsedResult.success) {
  console.error("❌ Invalid env:");
  console.error(JSON.stringify(z.treeifyError(parsedResult.error), null, 2));
  process.exit(1);
}

export const env = parsedResult.data;
