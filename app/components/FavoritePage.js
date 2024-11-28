'use client';

import { useState, useEffect } from 'react';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(`/api/favorites?email=${encodeURIComponent('user@example.com')}`);
        if (response.ok) {
          const data = await response.json();
          setFavorites(data.favorites);
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
      setIsLoading(false);
    };

    fetchFavorites();
  }, []);

  if (isLoading) {
    return <div>Loading favorites...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        favorites.map((recipe) => (
          <div key={recipe._id} className="border rounded-md p-4 shadow hover:shadow-lg">
            <h3 className="text-lg font-bold">{recipe.title}</h3>
            <p className="text-sm text-gray-500">Added on: {new Date(recipe.favoritedAt).toLocaleDateString()}</p>
            <img src={recipe.image} alt={recipe.title} className="w-full h-32 object-cover rounded-md mt-2" />
          </div>
        ))
      )}
    </div>
  );
};

export default FavoritesPage;
