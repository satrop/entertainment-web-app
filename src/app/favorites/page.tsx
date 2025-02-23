"use client";

import React from "react";
import Nav from "../../components/Nav";
import Favorites from "../../components/Favorites";
import "../../styles/globals.scss";

const FavoritesPage: React.FC = () => {
  return (
    <div>
      <Nav />
      <main>
        <Favorites />
      </main>
    </div>
  );
};

export default FavoritesPage;
