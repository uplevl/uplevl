import { createClerkClient } from "@clerk/backend";
import { createMiddleware } from "hono/factory";

import { env } from "@/env";

import { HandledResponse } from "@/lib/handled-response";

export const authorizeUser = createMiddleware(async (c, next) => {
  const clerkClient = createClerkClient({
    secretKey: env.CLERK_SECRET_KEY,
    publishableKey: env.CLERK_PUBLISHABLE_KEY,
  });

  const { isAuthenticated } = await clerkClient.authenticateRequest(c.req.raw, {
    jwtKey: env.CLERK_JWT_KEY,
  });

  if (!isAuthenticated) {
    return c.json(new HandledResponse("Unauthorized", 401));
  }

  await next();
});
