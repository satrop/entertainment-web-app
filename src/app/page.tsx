"use client";

import React, { useState } from "react";
import Nav from "../components/Nav";
import Trending from "../components/Trending/Trending";
import Recommended from "../components/Recommended/Recommended";
import Search from "../components/Search/Search";
import "../styles/globals.scss";

const Home: React.FC = () => {
  const [showSearchResults, setShowSearchResults] = useState(false);

  return (
    <div>
      <Nav />
      <main>
        <Search onSearchResults={setShowSearchResults} />
        <div className={showSearchResults ? "hidden" : ""}>
          <Trending />
          <Recommended />
        </div>
      </main>
    </div>
  );
};

export default Home;
