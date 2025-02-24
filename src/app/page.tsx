"use client";

import React, { useState } from "react";
import Nav from "../components/Nav";
import Trending from "../components/Trending/Trending";
import Recommended from "../components/Recommended/Recommended";
import "../styles/globals.scss";

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [excludeIds, setExcludeIds] = useState<number[]>([]);

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div>
      <Nav />
      <main>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && <button onClick={handleClearSearch}>Clear</button>}
        </div>
        <Recommended searchTerm={searchTerm} setExcludeIds={setExcludeIds} />
        <Trending searchTerm={searchTerm} excludeIds={excludeIds} />
      </main>
    </div>
  );
};

export default Home;
