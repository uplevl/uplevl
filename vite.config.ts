import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import viteTsConfigPaths from "vite-tsconfig-paths";

import { env } from "./env";

// https://vite.dev/config/
export default defineConfig({
  base: env.DASHBOARD_BASE_PATH,
  plugins: [
    viteTsConfigPaths({
      root: "./",
    }),
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler", {}]],
      },
    }),
    tailwindcss(),
  ],
  clearScreen: false,
  server: {
    host: true,
    port: env.DASHBOARD_PORT,
    proxy: {
      "/api": `http://127.0.0.1:${env.APP_PORT}`,
    },
    allowedHosts: ["dev.uplevl.ai"],
  },
  build: {
    sourcemap: true,
    outDir: "./dist",
    emptyOutDir: true,
  },
});
