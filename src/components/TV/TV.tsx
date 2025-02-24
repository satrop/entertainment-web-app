"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import useFetchTMDBData from "../../hooks/useFetchTMDBData";
import { getCertification } from "../../utils/getCertification";
import "./TV.scss";

const TopTVShows: React.FC = () => {
  const { data: tvShows, baseUrl } = useFetchTMDBData("tv/popular", 20);
  const [certifications, setCertifications] = useState<{
    [key: string]: string;
  }>({});
  const [searchQuery, setSearchQuery] = useState("");

  const clearSearch = () => setSearchQuery("");

  useEffect(() => {
    const fetchCertifications = async () => {
      const certs: { [key: string]: string } = {};
      for (const item of tvShows) {
        certs[item.id] = await getCertification(item, "tv");
      }
      setCertifications(certs);
    };

    if (tvShows.length > 0) {
      fetchCertifications();
    }
  }, [tvShows]);

  const filteredTVShows = tvShows.filter((item) =>
    item.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <section id="tv-shows">
      <h2>Popular TV Shows</h2>
      <input
        type="text"
        placeholder="Search TV Shows"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery && <button onClick={clearSearch}>Clear</button>}
      <div id="tv-shows-list">
        {filteredTVShows.map((item) => (
          <div key={item.id} className="tv-show-item">
            <Image
              src={`${baseUrl}w300${item.backdrop_path}`}
              alt={`${item.name} still`}
              width={280}
              height={174}
            />
            <div>{item.name}</div>
            <div>{(item.first_air_date || "").split("-")[0]}</div>
            <div>Rating: {certifications[item.id] || "Loading..."}</div>
            <div>Type: TV Show</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopTVShows;
