import { createRouter } from "@/lib/create-router";

import clerkRoutes from "./clerk/clerk.routes";
import instagramRoutes from "./instagram/instagram.routes";

const router = createRouter().route("/clerk", clerkRoutes).route("/instagram", instagramRoutes);

export default router;
