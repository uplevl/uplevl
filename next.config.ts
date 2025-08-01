import { withPostHogConfig } from "@posthog/nextjs-config";
import type { NextConfig } from "next";

import { env } from "@/lib/env/infra";

const isProd = env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  images: {
    ...(isProd ? { formats: ["image/webp", "image/avif"] } : {}),
    remotePatterns: [
      {
        hostname: "picsum.photos",
      },
      {
        hostname: "utfs.io",
      },
      {
        hostname: "x7gddzcov6.ufs.sh",
      },
      {
        hostname: "facebook.com",
      },
    ],
  },
  experimental: {
    reactCompiler: true,
  },
  allowedDevOrigins: ["dev.uplevl.ai"],
  devIndicators: false,
};

export default withPostHogConfig(nextConfig, {
  personalApiKey: env.POSTHOG_API_KEY, // Personal API Key
  envId: env.POSTHOG_ENV_ID, // Environment ID
  host: env.POSTHOG_HOST, // (optional), defaults to https://us.posthog.com
  sourcemaps: {
    enabled: true, // (optional) Enable sourcemaps generation and upload, default to true on production builds
    deleteAfterUpload: true, // (optional) Delete sourcemaps after upload, defaults to true
  },
});
