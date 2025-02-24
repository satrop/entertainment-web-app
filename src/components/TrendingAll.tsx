"use client";

import React from "react";
import useFetchMedia from "../hooks/useFetchMedia";

const TrendingAll: React.FC = () => {
  const { mediaItems } = useFetchMedia("all");

  return (
    <div>
      <h2>Trending</h2>
      <ul>
        {mediaItems.map((item) => (
          <div key={item.id}>
            <img src={item.still} alt={`${item.title} still`} />
            <div>{item.title}</div>
            <div>{item.year}</div>
            <div>Rating: {item.rating}</div>
            <div>Type: {item.type}</div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TrendingAll;
