import React, { useState, useEffect } from "react";

const Favorites: React.FC = () => {
  interface FavoriteItem {
    title: string;
  }

  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  const addToFavorites = (item: FavoriteItem) => {
    setFavorites([...favorites, item]);
  };

  useEffect(() => {
    addToFavorites({ title: "Example Item" });
  }, [addToFavorites]);

  const removeFromFavorites = (item: FavoriteItem) => {
    setFavorites(favorites.filter((fav) => fav !== item));
  };

  return (
    <section id="favorites">
      <h2>Favorites</h2>
      <div id="favorites-list">
        {favorites.map((item, index) => (
          <div key={index}>
            {item.title}
            <button onClick={() => removeFromFavorites(item)}>Remove</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Favorites;
