"use client";

import React, { useState } from "react";
import axios from "axios";
import "./Search.scss";

const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ title: string }[]>([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/multi`, {
        params: {
          api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
          query: query,
        },
      });
      const data = response.data.results.map((item: { title?: string; name?: string }) => ({
        title: item.title || item.name,
      }));
      setResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <section id="search">
      <h2>Search</h2>
      <input type="text" id="search-input" placeholder="Search for movies or TV shows" value={query} onChange={(e) => setQuery(e.target.value)} />
      <button id="search-button" onClick={handleSearch}>
        Search
      </button>
      <div id="search-results">
        {results.map((item, index) => (
          <div key={index}>{item.title}</div>
        ))}
      </div>
    </section>
  );
};

export default Search;
