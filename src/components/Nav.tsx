import React from "react";
import Link from "next/link";

const Nav: React.FC = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/movies">Movies</Link>
          </li>
          <li>
            <Link href="/tvshows">TV Shows</Link>
          </li>
          <li>
            <Link href="/favorites">Favorites</Link>
          </li>
          <li>
            <Link href="/">All</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
