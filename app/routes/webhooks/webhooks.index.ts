import { createRouter } from "@/lib/create-router";

import clerkRoutes from "./clerk/clerk.routes";

const router = createRouter().route("/clerk", clerkRoutes);

export default router;
