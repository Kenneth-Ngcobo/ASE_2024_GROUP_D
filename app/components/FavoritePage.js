"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaHeart, FaTrash } from "react-icons/fa";
import Link from "next/link";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchFavorites = async () => {
      const loggedInEmail = localStorage.getItem('loggedInUserEmail');
      if (!loggedInEmail) {
        router.push('/'); // Redirect to home if not logged in
        return;
      }

      try {
        const response = await fetch(`/api/favorites?email=${encodeURIComponent(loggedInEmail)}`, {
          credentials: 'include',
        });

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
  }, [router]);

  const handleRemoveFavorite = async (recipeId) => {
    const loggedInEmail = localStorage.getItem('loggedInUserEmail');
    try {
      const response = await fetch(`/api/favorites/${recipeId}?email=${encodeURIComponent(loggedInEmail)}`, {
        method: "DELETE",
        credentials: 'include',
      });

      if (response.ok) {
        setFavorites((prev) => prev.filter((favorite) => favorite._id !== recipeId));
      } else {
        console.error("Failed to remove from favorites");
      }
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-xl">Loading your favorites...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">My Favorite Recipes</h1>
      {favorites.length === 0 ? (
        <div className="text-center text-gray-500">
          <p className="text-xl">No favorites added yet.</p>
          <p className="mt-2">Start exploring recipes and add your favorites!</p>
          <Link 
            href="/" 
            className="mt-4 inline-block px-4 py-2 bg-[#fc9d4f] text-white rounded hover:bg-orange-600 transition"
          >
            Browse Recipes
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((favorite) => (
            <div 
              key={favorite._id} 
              className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative w-full h-48">
                <Image
                  src={favorite.recipe.image || '/placeholder-recipe.jpg'}
                  alt={favorite.recipe.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-xl mb-2">{favorite.recipe.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {favorite.recipe.description}
                </p>
                <div className="flex justify-between items-center">
                  <Link 
                    href={`/Recipe/${favorite.recipe._id}`} 
                    className="text-[#fc9d4f] hover:underline"
                  >
                    View Recipe
                  </Link>
                  <button
                    onClick={() => handleRemoveFavorite(favorite._id)}
                    className="text-red-500 hover:text-red-700 transition"
                    aria-label="Remove from favorites"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;