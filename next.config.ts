import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_TMDB_API_KEY: process.env.NEXT_PUBLIC_TMDB_API_KEY,
    NEXT_PUBLIC_TMDB_BASE_URL: process.env.NEXT_PUBLIC_TMDB_BASE_URL,
  },
  images: {
    domains: ["image.tmdb.org", "api.themoviedb.org"],
  },
};

export default nextConfig;
