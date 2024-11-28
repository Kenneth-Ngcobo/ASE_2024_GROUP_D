"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch("/api/favorites"); // Fetch the favorites data from the backend
        if (!response.ok) {
          throw new Error("Failed to fetch favorites");
        }
        const data = await response.json();
        setFavorites(data.favorites);
      } catch (error) {
        console.error("Error fetching favorites:", error);
        setError("Failed to load favorites. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (isLoading) {
    return <div className="text-center">Loading your favorites...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorites added yet. Start adding your favorite recipes!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((favorite) => (
            <div key={favorite._id} className="border rounded p-4 shadow-lg bg-white">
              <div className="relative w-full h-48 mb-4">
                <Image
                  src={favorite.recipe.image}
                  alt={favorite.recipe.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded"
                />
              </div>
              <h3 className="font-semibold text-lg mb-2">{favorite.recipe.title}</h3>
              <p className="text-sm text-gray-500">{favorite.recipe.description}</p>
              <div className="mt-2 text-sm text-gray-500">
                Added on: {new Date(favorite.createdAt).toLocaleDateString()}
              </div>
              <div className="mt-2 flex items-center justify-between">
                <Link href={`/recipe/${favorite.recipe._id}`}>
                  <a className="text-blue-500 hover:underline">View Recipe</a>
                </Link>
                <button
                  onClick={() => handleRemoveFavorite(favorite._id)}
                  className="text-red-500 hover:text-red-700"
                  aria-label="Remove from favorites"
                >
                  <FaHeart />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  async function handleRemoveFavorite(recipeId) {
    try {
      const response = await fetch(`/api/favorites/${recipeId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setFavorites((prev) => prev.filter((favorite) => favorite._id !== recipeId));
      } else {
        console.error("Failed to remove from favorites");
      }
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  }
};

export default FavoritesPage;
