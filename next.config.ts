import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // Cloudinary resimlerine izin ver
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Eski test resimlerine de izin ver (Unsplash)
        pathname: '**',
      }
    ],
  },
};

export default nextConfig;
