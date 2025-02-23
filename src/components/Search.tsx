"use client";

import React, { useState } from "react";

const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ title: string }[]>([]);

  const handleSearch = async () => {
    // Placeholder for searching movies or TV shows
    // Replace with actual API call
    const data = [{ title: "Search Result 1" }, { title: "Search Result 2" }, { title: "Search Result 3" }];
    setResults(data);
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
