import React from "react";
import Nav from "../../components/Nav";
import "../../styles/globals.scss";
import TV from "../../components/TV/TV";

const TVShows: React.FC = () => {
  return (
    <div>
      <Nav />
      <main>
        <h2>TV Shows</h2>
        <TV />
      </main>
    </div>
  );
};

export default TVShows;
