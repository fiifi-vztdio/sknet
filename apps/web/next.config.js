/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    transpilePackages: [
      "@sports-talent/types",
      "@sports-talent/utils",
      "@sports-talent/api-client",
      "@sports-talent/ui",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["localhost", "your-cdn-domain.com"],
    formats: ["image/webp", "image/avif"],
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
  },
}

module.exports = nextConfig
