import React from "react";
import Nav from "../../components/Nav";
import "../../styles/globals.scss";
import TopTVShows from "../../components/TopTVShows";

const TVShows: React.FC = () => {
  return (
    <div>
      <Nav />
      <main>
        <h2>TV Shows</h2>
        <TopTVShows />
      </main>
    </div>
  );
};

export default TVShows;
