import { useEffect, useState } from "react";

interface TMDBConfig {
  images: {
    secure_base_url: string;
  };
}

interface TMDBResult {
  results: TMDBItem[];
}

interface TMDBItem {
  id: number;
  title?: string; // Add optional title property
  name?: string; // Add optional name property
  backdrop_path: string; // Add backdrop_path property
  release_date?: string; // Add optional release_date property
  first_air_date?: string; // Add optional first_air_date property
  [key: string]: unknown; // Use 'unknown' to allow any value
}

const useFetchTMDBData = (endpoint: string, sliceCount: number) => {
  const [data, setData] = useState<TMDBItem[]>([]);
  const [baseUrl, setBaseUrl] = useState<string>("");

  useEffect(() => {
    const fetchConfiguration = async () => {
      try {
        const apiKey = process.env.TMDB_API_KEY;
        const response = await fetch(
          `https://api.themoviedb.org/3/configuration?api_key=${apiKey}`,
        );
        if (!response.ok) throw new Error("Failed to fetch configuration");
        const configData: TMDBConfig = await response.json();
        setBaseUrl(configData.images.secure_base_url);
      } catch (error) {
        console.error("Error fetching configuration:", error);
      }
    };

    fetchConfiguration();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = process.env.TMDB_API_KEY;
        const response = await fetch(
          `https://api.themoviedb.org/3/${endpoint}?api_key=${apiKey}`,
        );
        if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`);
        const resultData: TMDBResult = await response.json();
        setData(resultData.results.slice(0, sliceCount));
      } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
      }
    };

    if (baseUrl) {
      fetchData();
    }
  }, [baseUrl, endpoint, sliceCount]);

  return { data, baseUrl };
};

export default useFetchTMDBData;
