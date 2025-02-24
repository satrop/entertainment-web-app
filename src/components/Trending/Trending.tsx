"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import useFetchTMDBData from "../../hooks/useFetchTMDBData";
import { getCertification } from "../../utils/getCertification";
import "./Trending.scss";

const Trending: React.FC = () => {
  const { data: trending, baseUrl } = useFetchTMDBData("trending/all/week", 5);
  const [certifications, setCertifications] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchCertifications = async () => {
      const certs: { [key: string]: string } = {};
      for (const item of trending) {
        certs[item.id] = await getCertification(item, item.title ? "movie" : "tv");
      }
      setCertifications(certs);
    };

    if (trending.length > 0) {
      fetchCertifications();
    }
  }, [trending]);

  return (
    <section id="trending">
      <h2>Trending</h2>
      <div id="trending-list">
        {trending.map((item) => (
          <div key={item.id} className="trending-item">
            <Image src={`${baseUrl}w300${item.backdrop_path}`} alt={`${item.title || item.name} still`} width={280} height={174} />
            <div>{item.title || item.name}</div>
            <div>{(item.release_date || item.first_air_date || "").split("-")[0]}</div>
            <div>Rating: {certifications[item.id] || "Loading..."}</div>
            <div>Type: {item.title ? "Movie" : "TV Show"}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Trending;
