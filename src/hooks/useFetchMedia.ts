import { useEffect, useState } from "react";
import { MediaItem } from "../types/MediaItem";

/**
 * Custom hook to fetch popular media items (movies or TV shows) from The Movie Database (TMDb) API.
 *
 * @param {("movie" | "tv" | "all")} mediaType - The type of media to fetch ("movie", "tv", or "all").
 * @returns {{ mediaItems: MediaItem[], baseUrl: string }} - An object containing the fetched media items and the base URL for images.
 */
const useFetchMedia = (mediaType: "movie" | "tv" | "all") => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [baseUrl, setBaseUrl] = useState<string>("");

  useEffect(() => {
    /**
     * Fetches the configuration from TMDb API to get the base URL for images.
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
     * Fetches popular media items (movies or TV shows) from TMDb API.
     */
    const fetchMedia = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
        const endpoint = mediaType === "all" ? "trending/all/week" : `${mediaType}/popular`;
        const response = await fetch(`https://api.themoviedb.org/3/${endpoint}?api_key=${apiKey}`);

        if (!response.ok) throw new Error(`Failed to fetch ${mediaType}s`);

        const data = await response.json();
        const popularMedia = await Promise.all(
          data.results.slice(0, 20).map(async (item: any) => ({
            id: item.id,
            title: item.title || item.name,
            still: `${baseUrl}w300${item.backdrop_path}`,
            year: (item.release_date || item.first_air_date || "").split("-")[0],
            rating: await getMediaCertification(item, item.media_type || mediaType),
            type: item.media_type === "movie" ? "Movie" : "TV Show",
          }))
        );

        setMediaItems(popularMedia);
      } catch (error) {
        console.error(`Error fetching ${mediaType}s:`, error);
      }
    };

    fetchMedia();
  }, [baseUrl, mediaType]);

  /**
   * Fetches the certification (rating) for a media item from TMDb API.
   *
   * @param {any} item - The media item to fetch the certification for.
   * @param {("movie" | "tv")} mediaType - The type of media ("movie" or "tv").
   * @returns {Promise<string>} - The certification (rating) of the media item.
   */
  const getMediaCertification = async (item: any, mediaType: "movie" | "tv") => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
      const endpoint = mediaType === "movie" ? "release_dates" : "content_ratings";
      const response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${item.id}/${endpoint}?api_key=${apiKey}`);

      if (!response.ok) throw new Error(`Failed to fetch ${mediaType} certification`);

      const data = await response.json();
      const usRating = data.results.find((r: any) => r.iso_3166_1 === "US");
      return mediaType === "movie" ? usRating?.release_dates.find((d: any) => d.certification)?.certification || "NR" : usRating?.rating || "NR";
    } catch (error) {
      console.error(`Error fetching ${mediaType} certification:`, error);
      return "NR";
    }
  };

  return { mediaItems, baseUrl };
};

export default useFetchMedia;
