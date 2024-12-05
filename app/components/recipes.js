"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FaClock,
  FaUtensils,
  FaCaretDown,
  FaShoppingBag,
  FaStar,
  FaStarHalfAlt,
  FaRegStar
} from "react-icons/fa";
import { PiCookingPotDuotone, PiHeart } from "react-icons/pi";
import Carousel from "./ui/Carousel";
import { SortControl } from "./filter-sort/SortControl";
import { useSearchParams } from "next/navigation";
import { useShoppingList } from '../context/shoppingListContext';

/**
 * Renders star rating based on the average rating
 * 
 * @param {Object} props Component props
 * @param {number} props.rating Average rating (0-5)
 * @param {number} [props.size=16] Size of the stars
 * @returns {JSX.Element} Star rating component
 */

const StarRating = ({ rating, size = 16 }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <div className="flex items-center">
      {Array.from({ length: fullStars }, (_, i) => (
        <FaStar key={`full-${i}`} className="text-yellow-500" size={size} />
      ))}
      {halfStar === 1 && <FaStarHalfAlt className="text-yellow-500" size={size} />}
      {Array.from({ length: emptyStars }, (_, i) => (
        <FaRegStar key={`empty-${i}`} className="text-yellow-500" size={size} />
      ))}
    </div>
  );
};
/**
 * Recipes component displays a list of recipes with ratings, favorites, and shopping list features.
 * 
 * @param {Object} props Component props
 * @param {Array} props.recipes Initial list of recipes
 * @returns {JSX.Element} Recipes component
 */
const Recipes = ({ recipes: initialRecipes }) => {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [favoritedRecipes, setFavoritedRecipes] = useState(new Set());
  const [favoriteDetails, setFavoriteDetails] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [addedToList, setAddedToList] = useState(new Set());
  const searchParams = useSearchParams();
  const { dispatch: dispatchShoppingList } = useShoppingList();

  /**
   * Fetches user's favorite recipes on component mount
   */
  useEffect(() => {
    const fetchFavorites = async () => {
      const loggedInEmail = localStorage.getItem('loggedInUserEmail');
      if (!loggedInEmail) {
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
        setFavoriteDetails(data.favorites);
        const favoriteIds = new Set(data.favorites.map((recipe) => recipe._id));
        setFavoritedRecipes(favoriteIds);
      } catch (err) {
        setError('Failed to load favorites. Please try again later.');
        console.error('Error fetching favorites:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  /**
   * Update recipes when initial recipes or search params change
   */
  useEffect(() => {
    setRecipes(initialRecipes);
  }, [initialRecipes, searchParams]);

  /**
   * Toggles a recipe's favorite status
   * 
   * @param {string} recipeId ID of the recipe to toggle
   */
  const toggleFavorite = async (recipeId) => {
    const loggedInEmail = localStorage.getItem('loggedInUserEmail');
    if (!loggedInEmail) {
      setError('Please log in to manage favorites');
      return;
    }

    const isFavorited = favoritedRecipes.has(recipeId);
    const recipe = recipes.find((r) => r._id === recipeId);

    try {
      setFavoritedRecipes((prev) => {
        const updated = new Set(prev);
        isFavorited ? updated.delete(recipeId) : updated.add(recipeId);
        return updated;
      });

      setFavoriteDetails((prev) => {
        return isFavorited 
          ? prev.filter((r) => r._id !== recipeId)
          : (recipe ? [...prev, recipe] : prev);
      });

      const response = await fetch('/api/favorites', {
        method: isFavorited ? 'DELETE' : 'POST',
        body: JSON.stringify({ recipeId, email: loggedInEmail }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to update favorites');
      }
    } catch (err) {
      // Rollback changes on error
      setFavoritedRecipes((prev) => {
        const reverted = new Set(prev);
        isFavorited ? reverted.add(recipeId) : reverted.delete(recipeId);
        return reverted;
      });

      setFavoriteDetails((prev) => {
        return isFavorited && recipe 
          ? [...prev, recipe]
          : prev.filter((r) => r._id !== recipeId);
      });

      setError('Failed to update favorites. Please try again.');
      console.error('Error updating favorites:', err);
    }
  };

  /**
   * Adds recipe ingredients to the shopping list
   * 
   * @param {Object} ingredients Ingredients to add
   */
  const addIngredientsToShoppingList = (ingredients) => {
    const ingredientsArray = Object.keys(ingredients).map((key) => ({
      name: key,
      quantity: ingredients[key],
    }));

    ingredientsArray.forEach((ingredient) => {
      dispatchShoppingList({
        type: 'ADD_ITEM',
        payload: {
          id: ingredient.name.toLowerCase().replace(/\s+/g, '-'),
          name: `${ingredient.name} - ${ingredient.quantity}`,
          purchased: false
        },
      });
    });
  };

  /**
   * Calculates average rating from reviews
   * 
   * @param {Array} reviews List of reviews
   * @returns {number} Average rating
   */
  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  };

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      <SortControl />

      {/* Favorites Dropdown */}
      <div className="mb-4 relative">
        <button
          onClick={() => setDropdownVisible(!dropdownVisible)}
          className="flex items-center text-gray-800 font-roboto"
        >
          <PiHeart className="mr-2" size={20} />
          <span>Favorites ({favoritedRecipes.size})</span>
          <FaCaretDown
            className={`ml-2 ${dropdownVisible ? "transform rotate-180" : ""}`}
          />
        </button>

        {dropdownVisible && (
          <div className="mt-2 absolute bg-white border border-gray-200 rounded-lg shadow-lg w-60 z-10">
            {favoriteDetails.length === 0 ? (
              <p className="p-4 text-gray-500">No favorites yet</p>
            ) : (
              <ul className="max-h-60 overflow-y-auto p-2">
                {favoriteDetails.map((recipe) => (
                  <li key={recipe._id} className="p-2 hover:bg-gray-100">
                    <Link href={`/Recipe/${recipe._id}`} className="block text-sm text-gray-800">
                      {recipe.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Recipes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <Link
            href={`/Recipe/${recipe._id}`}
            key={recipe._id}
            className="block p-4 bg-[#fcfde2] dark:bg-black dark:border-gray-950 border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 duration-300 ease-in-out"
          >
            {/* Recipe Image */}
            <div className="relative w-full h-64">
              {recipe.images?.length > 1 ? (
                <Carousel images={recipe.images} />
              ) : (
                <div className="relative w-full h-full">
                  <Image 
                    src={recipe.images[0]} 
                    alt={recipe.title} 
                    fill 
                    className="object-cover" 
                  />
                </div>
              )}
            </div>

            {/* Recipe Title and Favorite Button */}
            <div className="p-4 flex justify-between items-center">
              <h2 className="text-[#fc9d4f] font-bold text-xl mb-3 font-montserrat group-hover:text-[#2b617f]">
                {recipe.title}
              </h2>
              <button
                className={`ml-2 ${favoritedRecipes.has(recipe._id)
                  ? "text-red-500"
                  : "text-gray-400"
                  } hover:text-red-500 transition-colors duration-200`}
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavorite(recipe._id);
                }}
              >
                <PiHeart size={24} />
              </button>
            </div>

            {/* Recipe Details */}
            <div className="space-y-2">
              {/* Rating Display */}
              <div className="flex items-center space-x-2 mb-2">
                <StarRating 
                  rating={recipe.averageRating || calculateAverageRating(recipe.reviews)} 
                  size={16} 
                />
                <span className="text-sm text-gray-600">
                  ({recipe.reviews ? recipe.reviews.length : 0})
                </span>
              </div>

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

            {/* Recipe Tags and Actions */}
            <div className="flex flex-wrap gap-2 mt-3">
              {recipe.category && (
                <span className="inline-block bg-[#f9efd2] dark:bg-[#1c1d02] dark:text-[#dddcfe] text-[#020123] text-sm px-2 py-1 rounded">
                  {recipe.category}
                </span>
              )}
              <span className="inline-block bg-[#f9efd2] text-[#020123] dark:bg-[#1c1d02] dark:text-[#dddcfe] text-sm px-2 py-1 rounded">
                {recipe.instructions.length} steps
              </span>
              <span className="inline-block bg-[#f9efd2] text-[#020123] dark:bg-[#1c1d02] dark:text-[#dddcfe] text-sm px-2 py-1 rounded">
                {new Date(recipe.published).toDateString()}
              </span>

              <button
                className={`inline-block bg-[#f9efd2] text-sm px-2 py-1 rounded mt-2 transition-colors duration-300 ${addedToList.has(recipe._id) ? 'bg-[#fc9d4f]' : 'bg-[#f9efd2]'}`}
                onClick={(e) => {
                  e.preventDefault();
                  addIngredientsToShoppingList(recipe.ingredients);
                  setAddedToList(prev => new Set([...prev, recipe._id]));
                }}
              >
                <FaShoppingBag
                  className={`${addedToList.has(recipe._id) ? 'text-white' : 'text-[#020123]'} mr-2`}
                />
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Recipes;