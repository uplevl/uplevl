import "server-only";

import { createClerkClient } from "@clerk/nextjs/server";

import { env } from "@/lib/env/server";

export const clerkClient = createClerkClient({ secretKey: env.CLERK_SECRET_KEY });
