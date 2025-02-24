import React from "react";
import Nav from "../components/Nav";
import Trending from "../components/Trending/Trending";
import Recommended from "../components/Recommended/Recommended";
// import Search from "../components/Search/Search";
import "../styles/globals.scss";

const Home: React.FC = () => {
  return (
    <div>
      <Nav />
      <main>
        <Trending />
        {/* <Search /> */}
        <Recommended />
      </main>
    </div>
  );
};

export default Home;
