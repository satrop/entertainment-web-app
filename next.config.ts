import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    TMDB_API_KEY: process.env.TMDB_API_KEY,
    TMDB_BASE_URL: process.env.TMDB_BASE_URL,
  },
  images: {
    domains: ["image.tmdb.org", "api.themoviedb.org"],
  },
};

export default nextConfig;
