import { createRouter } from "@/lib/create-router";

import systemRouter from "./system";
import webhooksRouter from "./webhooks";

const router = createRouter()
  // Routes
  .route("/webhooks", webhooksRouter)
  .route("/system", systemRouter);

export default router;
