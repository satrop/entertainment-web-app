import React from "react";
import Nav from "../components/Nav";
import Trending from "../components/Trending";
import Search from "../components/Search";
import "../styles/globals.scss";

const Home: React.FC = () => {
  return (
    <div>
      <Nav />
      <main>
        <Trending />
        <Search />
      </main>
    </div>
  );
};

export default Home;
