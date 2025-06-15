import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import viteCompression from "vite-plugin-compression";
import viteTsConfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: mode === "production" ? "/dashboard" : "/",
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
      viteCompression({
        algorithm: "gzip",
        ext: ".gz",
      }),
      viteCompression({
        algorithm: "brotliCompress",
        ext: ".br",
      }),
    ],
    clearScreen: false,
    server: {
      host: true,
      port: Number(env.DASHBOARD_PORT || "4000"),
      proxy: {
        "/api": `http://0.0.0.0:${env.APP_PORT}`,
      },
      allowedHosts: ["dev.uplevl.ai"],
    },
    build: {
      sourcemap: true,
      outDir: "./dist/dashboard",
      emptyOutDir: true,
    },
  };
});
