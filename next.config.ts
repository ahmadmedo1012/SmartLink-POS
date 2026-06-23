import type { NextConfig } from "next";

if (!process.env.AUTH_SECRET) {
  console.error("[FATAL] AUTH_SECRET environment variable is required. Set via env (e.g. openssl rand -base64 32).")
  process.exit(1)
}

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
