import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devServer: {
    port: process.env.NEXT_PUBLIC_PORT || 3000,
  },
};

export default nextConfig;
