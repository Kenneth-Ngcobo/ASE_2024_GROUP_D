"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FaClock,
  FaUtensils,
  FaTrash
} from "react-icons/fa";
import { PiCookingPotDuotone } from "react-icons/pi";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
        setFavorites(data.favorites);
      } catch (err) {
        setError('Failed to load favorites. Please try again later.');
        console.error('Error fetching favorites:', err);
      } finally {
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
      setFavorites(prev => prev.filter(recipe => recipe._id !== recipeId));
    } catch (err) {
      setError('Failed to remove favorite. Please try again.');
      console.error('Error removing favorite:', err);
    }
  };

  if (isLoading) {
    return <div className="container mx-auto p-4">Loading favorites...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Favorites</h1>
        <p className="text-gray-600">You have no favorite recipes yet.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <h1 className="text-2xl font-bold mb-6">Your Favorite Recipes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map((recipe) => (
          <div
            key={recipe._id}
            className="block p-4 bg-[#fcfde2] dark:bg-black dark:border-gray-950 border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 duration-300 ease-in-out relative"
          >
            <Link href={`/Recipe/${recipe._id}`}>
              <div className="relative w-full h-64">
                <Image 
                  src={recipe.images[0]} 
                  alt={recipe.title} 
                  fill 
                  className="object-cover" 
                />
              </div>

              <div className="p-4">
                <h2 className="text-[#fc9d4f] font-bold text-xl mb-3 font-montserrat">
                  {recipe.title}
                </h2>

                <div className="space-y-2">
                  <p className="text-sm text-gray-600 flex items-center">
                    <FaClock className="text-[#020123] mr-2" />
                    {recipe.prep} mins
                  </p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <PiCookingPotDuotone className="text-[#020123] dark:text-[#dddcfe] mr-2" />
                    {recipe.cook} mins
                  </p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <FaUtensils className="text-[#020123] dark:text-[#dddcfe mr-2" />
                    Serves {recipe.servings}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {recipe.category && (
                    <span className="inline-block bg-[#f9efd2] dark:bg-[#1c1d02] dark:text-[#dddcfe] text-[#020123] text-sm px-2 py-1 rounded">
                      {recipe.category}
                    </span>
                  )}
                </div>
              </div>
            </Link>

            <button
              onClick={() => removeFavorite(recipe._id)}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
              aria-label="Remove from favorites"
            >
              <FaTrash size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}