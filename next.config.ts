import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "burakdernegi.org" }],
  },
};

export default nextConfig;
