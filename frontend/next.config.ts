import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "**", // Allow all HTTPS domains for production
      },
    ],
  },
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Silence workspace root warning
  outputFileTracingRoot: require("path").join(__dirname, "../"),
};

export default nextConfig;
