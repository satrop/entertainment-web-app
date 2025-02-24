"use client";

import React from "react";
import useFetchMedia from "../hooks/useFetchMedia";

const TopTVShows: React.FC = () => {
  const { mediaItems: tvShows } = useFetchMedia("tv");

  return (
    <section id="tv-shows">
      <h2>Popular TV Shows</h2>
      <div id="tv-shows-list">
        {tvShows.map((item) => (
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

export default TopTVShows;
