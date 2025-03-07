"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import useFetchTMDBData from "../../hooks/useFetchTMDBData";
import { getCertification } from "../../utils/getCertification";
import "./Recommended.scss";

interface RecommendedProps {
  searchTerm: string;
  setExcludeIds: (ids: number[]) => void;
}

const Recommended: React.FC<RecommendedProps> = ({
  searchTerm,
  setExcludeIds,
}) => {
  const { data: recommended, baseUrl } = useFetchTMDBData(
    "trending/all/week",
    20,
  );
  const [certifications, setCertifications] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    const fetchCertifications = async () => {
      const certs: { [key: string]: string } = {};
      if (recommended) {
        for (const item of recommended) {
          certs[item.id] = await getCertification(
            item,
            item.title ? "movie" : "tv",
          );
        }
        setCertifications(certs);
      }
    };

    if (recommended && recommended.length > 0) {
      fetchCertifications();
    }
  }, [recommended]);

  useEffect(() => {
    if (recommended) {
      setExcludeIds(recommended.map((item) => item.id));
    }
  }, [recommended, setExcludeIds]);

  const filteredRecommended = recommended?.filter((item) =>
    (item.title || item.name)?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <section id="recommended">
      <h2>Recommended</h2>
      <div id="recommended-list">
        {filteredRecommended?.map((item) => (
          <div key={item.id} className="recommended-item">
            <Image
              src={`${baseUrl}w300${item.backdrop_path}`}
              alt={`${item.title || item.name} still`}
              width={280}
              height={174}
            />
            <div>{item.title || item.name}</div>
            <div>
              {(item.release_date || item.first_air_date || "").split("-")[0]}
            </div>
            <div>Rating: {certifications[item.id] || "Loading..."}</div>
            <div>Type: {item.title ? "Movie" : "TV Show"}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Recommended;
