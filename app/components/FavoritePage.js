'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaHeart } from 'react-icons/fa';
import { formatDistance } from 'date-fns';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch('/api/favorites');
        if (!response.ok) {
          throw new Error('Failed to fetch favorites');
        }
        const data = await response.json();
        setFavorites(data.favorites);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const removeFavorite = async (recipeId) => {
    try {
      const response = await fetch('/api/favorites', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipeId }),
      });

      if (response.ok) {
        setFavorites((prev) => prev.filter((recipe) => recipe._id !== recipeId));
      }
    } catch (err) {
      console.error('Error removing favorite:', err);
    }
  };

  if (isLoading) {
    return <div>Loading favorites...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">My Favorites</h1>
        <p>No favorites yet. Explore recipes to add to your favorites!</p>
        <Link href="/recipes">
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Explore Recipes
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Favorites</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((recipe) => (
          <div key={recipe._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Link href={`/recipes/${recipe._id}`}>
              <div className="relative h-48">
                <Image
                  src={recipe.image || '/placeholder.jpg'}
                  alt={recipe.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-bold">{recipe.name}</h2>
                <p className="text-sm text-gray-600">
                  Favorited {formatDistance(new Date(recipe.favoritedAt), new Date(), { addSuffix: true })}
                </p>
                <p className="text-sm">{recipe.description}</p>
              </div>
            </Link>
            <button
              className="w-full text-red-500 p-2"
              onClick={() => removeFavorite(recipe._id)}
            >
              Remove from Favorites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
