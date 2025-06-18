import type { ContentfulStatusCode } from "hono/utils/http-status";

export class HandledResponse {
  message: string;
  status: ContentfulStatusCode;

  constructor(message: string, status: ContentfulStatusCode) {
    this.message = message;
    this.status = status;
  }
}
