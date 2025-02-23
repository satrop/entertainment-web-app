"use client";

import React, { useEffect, useState } from "react";

const Trending: React.FC = () => {
  const [trending, setTrending] = useState<{ title: string }[]>([]);

  useEffect(() => {
    // Fetch trending movies or TV shows
    fetchTrending();
  }, []);

  const fetchTrending = async () => {
    // Placeholder for fetching trending items
    // Replace with actual API call
    const data = [{ title: "Movie 1" }, { title: "Movie 2" }, { title: "Movie 3" }, { title: "Movie 4" }, { title: "Movie 5" }];
    setTrending(data);
  };

  return (
    <section id="trending">
      <h2>Trending</h2>
      <div id="trending-list">
        {trending.map((item, index) => (
          <div key={index}>{item.title}</div>
        ))}
      </div>
    </section>
  );
};

export default Trending;
