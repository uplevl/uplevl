import type { PinoLogger } from "hono-pino";
import type { ContentfulStatusCode } from "hono/utils/http-status";

export interface AppBindings {
  Variables: {
    logger: PinoLogger;
  };
}

export interface HandledResponse {
  status: ContentfulStatusCode;
  message: string;
}
