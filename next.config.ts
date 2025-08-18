import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // For 404 route 
  experimental: {
    globalNotFound: true,
  },
};

export default nextConfig;
