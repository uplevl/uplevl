import { createRouter } from "@/lib/create-router";

import clerkRoutes from "./clerk/clerk.router";
import instagramRoutes from "./instagram/instagram.router";

const router = createRouter()
  // Routes
  .route("/clerk", clerkRoutes)
  .route("/instagram", instagramRoutes);

export default router;
