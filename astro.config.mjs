import react from "@astrojs/react";
import clerk from "@clerk/astro";
import minify from "@frontendista/astro-html-minify";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import viteCompression from "vite-plugin-compression";

// https://astro.build/config
export default defineConfig({
  srcDir: "./website",
  outDir: "./dist/website",
  site: import.meta.env.NODE_ENV === "production" ? "https://uplevl.ai" : "http://dev.uplevl.ai",
  integrations: [
    clerk(),
    react({
      experimentalReactChildren: true,
      experimentalDisableStreaming: true,
    }),
    ...(import.meta.env.NODE_ENV === "production" ? [minify()] : []),
  ],

  build: {
    inlineStylesheets: "always",
    format: "file",
  },

  experimental: {
    responsiveImages: true,
  },

  vite: {
    plugins: [
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
  },
});
