"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FaClock,
  FaUtensils,
  FaTrash,
  FaSort,
  FaFilter
} from "react-icons/fa";
import { PiCookingPotDuotone } from "react-icons/pi";
import ConfirmationModal from '../components/ui/ConfirmationModal';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Pagination and Filtering States
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sort, setSort] = useState('newest');
  const [category, setCategory] = useState('');
  
  // Confirmation Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recipeToRemove, setRecipeToRemove] = useState(null);

  // Unique categories from favorites
  const [availableCategories, setAvailableCategories] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const loggedInEmail = localStorage.getItem('loggedInUserEmail');
      if (!loggedInEmail) {
        setError('Please log in to view favorites');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch(
          `/api/favorites?email=${encodeURIComponent(loggedInEmail)}&page=${currentPage}&sort=${sort}&category=${category}`, 
          {
            credentials: 'include',
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch favorites');
        }

        const data = await response.json();
        setFavorites(data.favorites);
        setTotalPages(data.totalPages);

        // Extract unique categories
        const categories = [...new Set(data.favorites.map(f => f.category))];
        setAvailableCategories(categories);
      } catch (err) {
        setError('Failed to load favorites. Please try again later.');
        console.error('Error fetching favorites:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [currentPage, sort, category]);

  const confirmRemoveFavorite = (recipeId) => {
    setRecipeToRemove(recipeId);
    setIsModalOpen(true);
  };

  const removeFavorite = async () => {
    const loggedInEmail = localStorage.getItem('loggedInUserEmail');
    
    try {
      const response = await fetch('/api/favorites', {
        method: 'DELETE',
        body: JSON.stringify({ recipeId: recipeToRemove, email: loggedInEmail }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to remove favorite');
      }

      // Remove the recipe from the favorites list
      setFavorites(prev => prev.filter(recipe => recipe._id !== recipeToRemove));
      setIsModalOpen(false);
      setRecipeToRemove(null);
    } catch (err) {
      setError('Failed to remove favorite. Please try again.');
      console.error('Error removing favorite:', err);
    }
  };

  // Pagination Controls
  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-4 py-2 mx-1 ${
            currentPage === i 
              ? 'bg-[#fc9d4f] text-white' 
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <div 
            key={index} 
            className="animate-pulse bg-gray-200 h-96 rounded-lg"
          />
        ))}
      </div>
    );
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

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <ConfirmationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={removeFavorite}
        message="Are you sure you want to remove this recipe from your favorites?"
      />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Favorite Recipes</h1>
        
        <div className="flex space-x-4">
          {/* Sort Dropdown */}
          <div className="relative">
            <select 
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none w-full p-2 border rounded flex items-center"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="alphabetical">A-Z</option>
            </select>
            <FaSort className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="appearance-none w-full p-2 border rounded flex items-center"
            >
              <option value="">All Categories</option>
              {availableCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <FaFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-600">You have no favorite recipes yet.</p>
      ) : (
        <>
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

                    <p className="text-sm text-gray-600 mb-2">
                      Added on: {new Date(recipe.addedAt).toLocaleDateString()}
                    </p>

                    {/* Rest of the recipe details remain the same */}
                  </div>
                </Link>

                <button
                  onClick={() => confirmRemoveFavorite(recipe._id)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                  aria-label="Remove from favorites"
                >
                  <FaTrash size={16} />
                </button>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <div className="flex items-center space-x-2">
                {renderPagination()}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}