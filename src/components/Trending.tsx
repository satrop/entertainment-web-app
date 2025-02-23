"use client";

import React, { useEffect, useState } from "react";

/**
 * Trending component fetches and displays the top 5 trending movies and TV shows.
 */
const Trending: React.FC = () => {
  const [trending, setTrending] = useState<
    {
      id: number;
      title: string;
      still: string;
      year: string;
      rating: string;
      type: string;
    }[]
  >([]);
  const [baseUrl, setBaseUrl] = useState<string>("");

  useEffect(() => {
    /**
     * Fetches the configuration data from TMDB API to get the base URL for images.
     */
    const fetchConfiguration = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
        const response = await fetch(`https://api.themoviedb.org/3/configuration?api_key=${apiKey}`);

        if (!response.ok) throw new Error("Failed to fetch configuration");

        const data = await response.json();
        setBaseUrl(data.images.secure_base_url);
      } catch (error) {
        console.error("Error fetching configuration:", error);
      }
    };

    fetchConfiguration();
  }, []);

  useEffect(() => {
    /**
     * Fetches the top 5 trending movies and TV shows from TMDB API.
     */
    const fetchTrending = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
        const response = await fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`);

        if (!response.ok) throw new Error("Failed to fetch trending movies");

        const data = await response.json();

        // Extract only the first 5 trending items
        const trendingMovies = await Promise.all(
          data.results.slice(0, 5).map(async (item: any) => ({
            id: item.id,
            title: item.title || item.name, // Movies use "title", TV shows use "name"
            still: `${baseUrl}w300${item.backdrop_path}`, // Use base URL for still image
            year: (item.release_date || item.first_air_date || "").split("-")[0], // Extract year
            rating: item.media_type === "movie" ? await getMovieCertification(item) : await getTvCertification(item), // Extract age rating
            type: item.title ? "Movie" : "TV Show", // Determine type
          }))
        );

        setTrending(trendingMovies);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };

    if (baseUrl) {
      fetchTrending();
    }
  }, [baseUrl]); // ✅ Fetch trending movies only after base URL is set

  /**
   * Fetches the certification for a movie from TMDB API.
   * @param item - The movie item to fetch the certification for.
   * @returns The certification string or "NR" if not found.
   */
  const getMovieCertification = async (item: any) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
      const response = await fetch(`https://api.themoviedb.org/3/movie/${item.id}/release_dates?api_key=${apiKey}`);

      if (!response.ok) throw new Error("Failed to fetch movie certification");

      const data = await response.json();
      const usRelease = data.results.find((r: any) => r.iso_3166_1 === "US");
      return usRelease ? usRelease.release_dates.find((d: any) => d.certification)?.certification || "NR" : "NR";
    } catch (error) {
      console.error("Error fetching movie certification:", error);
      return "NR";
    }
  };

  /**
   * Fetches the certification for a TV show from TMDB API.
   * @param item - The TV show item to fetch the certification for.
   * @returns The certification string or "NR" if not found.
   */
  const getTvCertification = async (item: any) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
      const response = await fetch(`https://api.themoviedb.org/3/tv/${item.id}/content_ratings?api_key=${apiKey}`);

      if (!response.ok) throw new Error("Failed to fetch TV certification");

      const data = await response.json();
      const usRating = data.results.find((r: any) => r.iso_3166_1 === "US");
      return usRating ? usRating.rating || "NR" : "NR";
    } catch (error) {
      console.error("Error fetching TV certification:", error);
      return "NR";
    }
  };

  return (
    <section id="trending">
      <h2>Trending</h2>
      <div id="trending-list">
        {trending.map((item) => (
          <div key={item.id}>
            <img src={item.still} alt={`${item.title} still`} />
            <div>{item.title}</div>
            <div>{item.year}</div>
            <div>Rating: {item.rating}</div>
            <div>Type: {item.type}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Trending;
