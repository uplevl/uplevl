import { createRouter } from "@/lib/create-router";

import webhooksRouter from "./webhooks/webhooks.index";

const router = createRouter().route("/webhooks", webhooksRouter);

export default router;
