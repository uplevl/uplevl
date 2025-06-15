import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { env } from "@@/env";

import { App } from "@@/app.tsx";
import { Providers } from "@@/shared/providers/index.tsx";

import "./index.css";

if (!env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>,
);
