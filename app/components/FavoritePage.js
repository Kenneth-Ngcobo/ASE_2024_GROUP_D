"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FaClock, 
  FaUtensils, 
  FaTrash 
} from "react-icons/fa";
import { PiCookingPotDuotone, PiHeart } from "react-icons/pi";

const FavoritesPage = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      const loggedInEmail = localStorage.getItem('loggedInUserEmail');
      
      if (!loggedInEmail) {
        setError('Please log in to view favorites');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/favorites?email=${encodeURIComponent(loggedInEmail)}`, {
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch favorites');
        }

        const data = await response.json();
        setFavoriteRecipes(data.favorites);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load favorites. Please try again later.');
        console.error('Error fetching favorites:', err);
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const removeFavorite = async (recipeId) => {
    const loggedInEmail = localStorage.getItem('loggedInUserEmail');
    
    try {
      const response = await fetch('/api/favorites', {
        method: 'DELETE',
        body: JSON.stringify({ recipeId, email: loggedInEmail }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to remove favorite');
      }

      // Remove the recipe from the favorites list
      setFavoriteRecipes(prev => 
        prev.filter(recipe => recipe._id !== recipeId)
      );
    } catch (err) {
      setError('Failed to remove favorite. Please try again.');
      console.error('Error removing favorite:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 text-center">
        <p className="text-xl text-gray-600">Loading favorites...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  if (favoriteRecipes.length === 0) {
    return (
      <div className="container mx-auto p-6 text-center">
        <div className="bg-[#f9efd2] p-8 rounded-lg shadow-md">
          <PiHeart className="mx-auto mb-4 text-gray-400" size={64} />
          <h2 className="text-2xl font-bold mb-4 text-[#020123]">
            No Favorites Yet
          </h2>
          <p className="text-gray-600 mb-6">
            Start exploring recipes and add some to your favorites!
          </p>
          <Link 
            href="/" 
            className="bg-[#fc9d4f] text-white px-6 py-3 rounded-lg hover:bg-[#2b617f] transition duration-300"
          >
            Browse Recipes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <h1 className="text-3xl font-bold mb-8 text-[#020123] dark:text-white">
        My Favorite Recipes
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favoriteRecipes.map((recipe) => (
          <div 
            key={recipe._id} 
            className="bg-[#fcfde2] dark:bg-gray-900 border border-gray-200 rounded-lg shadow-lg overflow-hidden"
          >
            <div className="relative w-full h-64">
              <Image 
                src={recipe.images[0]} 
                alt={recipe.title} 
                fill 
                className="object-cover"
              />
            </div>

            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-[#fc9d4f] font-bold text-xl font-montserrat">
                  {recipe.title}
                </h2>
                <button
                  onClick={() => removeFavorite(recipe._id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                  title="Remove from Favorites"
                >
                  <FaTrash size={20} />
                </button>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600 flex items-center">
                  <FaClock className="text-[#020123] mr-2" />
                  Prep: {recipe.prep} mins
                </p>
                <p className="text-sm text-gray-600 flex items-center">
                  <PiCookingPotDuotone className="text-[#020123] mr-2" />
                  Cook: {recipe.cook} mins
                </p>
                <p className="text-sm text-gray-600 flex items-center">
                  <FaUtensils className="text-[#020123] mr-2" />
                  Serves {recipe.servings}
                </p>
              </div>

              <div className="flex justify-between items-center">
                <Link 
                  href={`/Recipe/${recipe._id}`} 
                  className="bg-[#fc9d4f] text-white px-4 py-2 rounded-lg hover:bg-[#2b617f] transition duration-300"
                >
                  View Recipe
                </Link>
                <span className="text-sm text-gray-500">
                  Added: {new Date(recipe.published).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;