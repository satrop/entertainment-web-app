"use client";

import React from "react";
import useFetchMedia from "../hooks/useFetchMedia";

const Movies: React.FC = () => {
  const { mediaItems: movies } = useFetchMedia("movie");

  return (
    <section id="movies">
      <h2>Popular Movies</h2>
      <div id="movies-list">
        {movies.map((item) => (
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

export default Movies;
