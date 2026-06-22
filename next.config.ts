import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  images: { formats: ["image/avif", "image/webp"] },
  transpilePackages: ["remotion", "@remotion/player"],
  experimental: {
    optimizePackageImports: ["lucide-react", "recharts", "framer-motion"],
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
