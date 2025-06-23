import { createRouter } from "@/lib/create-router";
import { authorizeUser } from "@/middlewares/authorize-user";

import agentRouter from "./agent/agent.router";

const router = createRouter()
  // Middleware
  .use(authorizeUser)

  // Routes
  .route("/agent", agentRouter);

export default router;
