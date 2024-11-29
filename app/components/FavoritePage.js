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
    // Check if user is authenticated
    const loggedInEmail = localStorage.getItem('loggedInUserEmail');
    if (!loggedInEmail) {
      router.push('/login');
      return;
    }

    const fetchFavorites = async () => {
      try {
        const response = await fetch(`/api/favorites?email=${encodeURIComponent(loggedInEmail)}`, {
          credentials: 'include'
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
    try {
      const loggedInEmail = localStorage.getItem('loggedInUserEmail');
      const response = await fetch(`/api/favorites/${recipeId}?email=${encodeURIComponent(loggedInEmail)}`, {
        method: "DELETE",
        credentials: 'include'
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
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p className="mt-4">Loading your favorites...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[#020123] dark:text-white">My Favorites</h1>
        <div className="text-lg text-gray-600 dark:text-gray-300">
          Total Favorites: {favorites.length}
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <FaHeart className="mx-auto text-5xl text-gray-300 mb-4" />
          <p className="text-xl text-gray-600 dark:text-gray-400">
            No favorites added yet. Start exploring recipes!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((favorite) => (
            <div 
              key={favorite._id} 
              className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
            >
              <div className="relative w-full h-48">
                <Image
                  src={favorite.recipe.image || '/default-recipe-image.jpg'}
                  alt={favorite.recipe.title}
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute top-2 right-2 bg-white/80 dark:bg-gray-900/80 p-2 rounded-full">
                  <button
                    onClick={() => handleRemoveFavorite(favorite._id)}
                    className="text-red-500 hover:text-red-700 dark:text-red-400"
                    aria-label="Remove from favorites"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-xl mb-2 text-[#020123] dark:text-white">
                  {favorite.recipe.title}
                </h3>
                
                <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  <p className="line-clamp-2">{favorite.recipe.description}</p>
                </div>
                
                <div className="mt-2 flex justify-between items-center">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-medium">Added:</span>{' '}
                    {new Date(favorite.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  
                  <Link 
                    href={`/Recipe/${favorite.recipe._id}`} 
                    className="text-[#fc9d4f] hover:text-[#fc7d1f] transition-colors"
                  >
                    View Recipe
                  </Link>
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