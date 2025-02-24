interface ReleaseDate {
  certification: string;
}

interface ReleaseDatesResult {
  iso_3166_1: string;
  release_dates: ReleaseDate[];
}

interface ContentRating {
  iso_3166_1: string;
  rating: string;
}

export const getCertification = async (item: { id: number }, type: "movie" | "tv"): Promise<string> => {
  try {
    const apiKey = process.env.TMDB_API_KEY;
    const endpoint = type === "movie" ? `movie/${item.id}/release_dates` : `tv/${item.id}/content_ratings`;
    const response = await fetch(`https://api.themoviedb.org/3/${endpoint}?api_key=${apiKey}`);
    if (!response.ok) throw new Error(`Failed to fetch ${type} certification`);
    const data = await response.json();
    const usRating = type === "movie" ? (data.results as ReleaseDatesResult[]).find((r) => r.iso_3166_1 === "US")?.release_dates.find((d) => d.certification)?.certification : (data.results as ContentRating[]).find((r) => r.iso_3166_1 === "US")?.rating;
    return usRating || "NR";
  } catch (error) {
    console.error(`Error fetching ${type} certification:`, error);
    return "NR";
  }
};
