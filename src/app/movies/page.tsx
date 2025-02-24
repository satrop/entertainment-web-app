import React from "react";
import Nav from "../../components/Nav";
import Movies from "../../components/Movies/Movies";
import "../../styles/globals.scss";

/**
 * MoviesPage component renders the Movies component.
 */
const MoviesPage: React.FC = () => {
  return (
    <div>
      <Nav />
      <main>
        <h2>Movies</h2>
        <Movies />
      </main>
    </div>
  );
};

export default MoviesPage;
