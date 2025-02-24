"use client";

import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import "./Search.scss";

const Search: React.FC<{ onSearchResults: (hasResults: boolean) => void }> = ({ onSearchResults }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ id: number; title: string; backdrop_path: string; release_date?: string; first_air_date?: string }[]>([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/multi`, {
        params: {
          api_key: process.env.TMDB_API_KEY,
          query: query,
        },
      });
      const data = response.data.results
        .map((item: { id: number; title?: string; name?: string; backdrop_path: string; release_date?: string; first_air_date?: string }) => ({
          id: item.id,
          title: item.title || item.name,
          backdrop_path: item.backdrop_path,
          release_date: item.release_date,
          first_air_date: item.first_air_date,
        }))
        .filter((item: { backdrop_path: string | null | undefined }) => item.backdrop_path); // Filter out items with null or undefined backdrop_path
      setResults(data);
      onSearchResults(data.length > 0);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    onSearchResults(false);
  };

  return (
    <section id="search">
      <h2>Search</h2>
      <input type="text" id="search-input" placeholder="Search for movies or TV shows" value={query} onChange={(e) => setQuery(e.target.value)} />
      <button id="search-button" onClick={handleSearch}>
        Search
      </button>
      <button id="clear-button" onClick={handleClear}>
        Clear
      </button>
      <div id="search-results">
        {results.map((item) => (
          <div key={item.id} className="search-item">
            <Image src={`https://image.tmdb.org/t/p/w300${item.backdrop_path}`} alt={`${item.title} still`} width={280} height={174} />
            <div>{item.title}</div>
            <div>{(item.release_date || item.first_air_date || "").split("-")[0]}</div>
            <div>Type: {item.title ? "Movie" : "TV Show"}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Search;
