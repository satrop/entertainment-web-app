"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import useFetchTMDBData from "../../hooks/useFetchTMDBData";
import { getCertification } from "../../utils/getCertification";
import "./Movies.scss";

const Movies: React.FC = () => {
  const { data: movies, baseUrl } = useFetchTMDBData("movie/popular", 20);
  const [certifications, setCertifications] = useState<{
    [key: string]: string;
  }>({});
  const [searchQuery, setSearchQuery] = useState("");

  const clearSearch = () => setSearchQuery("");

  useEffect(() => {
    const fetchCertifications = async () => {
      const certs: { [key: string]: string } = {};
      for (const item of movies) {
        certs[item.id] = await getCertification(item, "movie");
      }
      setCertifications(certs);
    };

    if (movies.length > 0) {
      fetchCertifications();
    }
  }, [movies]);

  const filteredMovies = movies.filter((item) =>
    item.title?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <section id="movies">
      <h2>Popular Movies</h2>
      <input
        type="text"
        placeholder="Search Movies"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery && <button onClick={clearSearch}>Clear</button>}
      <div id="movies-list">
        {filteredMovies.map((item) => (
          <div key={item.id} className="movie-item">
            <Image
              src={`${baseUrl}w300${item.backdrop_path}`}
              alt={`${item.title} still`}
              width={280}
              height={174}
            />
            <div className="movie-title">{item.title}</div>
            <div className="movie-year">
              {(item.release_date || "").split("-")[0]}
            </div>
            <div className="movie-rating">
              Rating: {certifications[item.id] || "Loading..."}
            </div>
            <div className="movie-type">Type: Movie</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Movies;
