import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  // DO SOMETHING
  cacheComponents: false,
  partialPrefetching: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/(.*)",
  //       destination: "http://localhost:3001/api/$1",
  //     },
  //   ];
  // },
};

export default nextConfig;
