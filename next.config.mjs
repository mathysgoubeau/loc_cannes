import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"]
  },
  devIndicators: false,
  poweredByHeader: false,
  turbopack: {
    root: projectRoot
  }
};

export default nextConfig;
