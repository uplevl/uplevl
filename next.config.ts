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
    ],
  },
  experimental: {
    reactCompiler: true,
  },
  allowedDevOrigins: ["dev.uplevl.ai"],
  devIndicators: false,
};

export default nextConfig;
