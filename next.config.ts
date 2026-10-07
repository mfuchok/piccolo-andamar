import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Solo WebP: codificar AVIF con sharp es extremadamente lento y bloquea
    // el optimizador de imágenes en desarrollo.
    formats: ["image/webp"],
  },
};

export default nextConfig;
