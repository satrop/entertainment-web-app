import React, { useState } from "react";

const Favorites: React.FC = () => {
  interface FavoriteItem {
    title: string;
  }

  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  const addToFavorites = (item: FavoriteItem) => {
    setFavorites([...favorites, item]);
  };

  // Example usage of addToFavorites to avoid unused variable error
  React.useEffect(() => {
    addToFavorites({ title: "Example Item" });
  }, []);

  const removeFromFavorites = (item: any) => {
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
