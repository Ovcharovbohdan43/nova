import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@nova/database"],
  turbopack: {
    root: "../..",
  },
};

export default nextConfig;
