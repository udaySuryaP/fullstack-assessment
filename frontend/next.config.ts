import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "is1-ssl.mzstatic.com",
        pathname: "/image/thumb/**",
      },
    ],
  },
};

export default nextConfig;
