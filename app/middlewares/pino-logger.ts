import { pinoLogger as basePinoLogger } from "hono-pino";
import { logger } from "hono/logger";
import { pino } from "pino";

import { env } from "@/env";

export function pinoLogger() {
  if (env.NODE_ENV !== "production") {
    return logger();
  }

  return basePinoLogger({
    pino: pino({
      level: env.LOG_LEVEL,
    }),
    http: {
      reqId: () => crypto.randomUUID(),
    },
  });
}
