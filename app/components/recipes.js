"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaClock, FaUtensils, FaCaretDown } from "react-icons/fa";
import { PiCookingPotDuotone,PiHeart } from 'react-icons/pi';
import Carousel from './Carousel';
import { SortControl } from './SortControl';
import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaCalendarDay,
  FaClock,
  FaUtensils,
  FaTags,
  FaUtensilSpoon,
  FaListUl,
  FaCaretDown,
} from "react-icons/fa";
import { PiCookingPotDuotone, PiHeart } from "react-icons/pi";
import Head from "next/head";
import Carousel from "./Carousel";
import { SortControl } from "./SortControl";
import { sortRecipes } from "./sortUtils";
import { useSearchParams } from "next/navigation";

const Recipes = ({ recipes: initialRecipes }) => {
  const [sortBy, setSortBy] = useState("default");
  const [sortOrder, setSortOrder] = useState("ascending");
  const [recipes, setRecipes] = useState(initialRecipes || []);
  const [favoritedRecipes, setFavoritedRecipes] = useState(new Set());
  const [favoriteDetails, setFavoriteDetails] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();

  // Fetch favorites when component mounts
  useEffect(() => {
    const fetchFavorites = async () => {
      const loggedInEmail = localStorage.getItem("loggedInUserEmail");
      if (!loggedInEmail) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `/api/favorites?email=${encodeURIComponent(loggedInEmail)}`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch favorites");
        }

        const data = await response.json();
        // Store the complete favorite recipes data
        setFavoriteDetails(data.favorites);
        // Create a Set of just the IDs for quick lookup
        const favoriteIds = new Set(data.favorites.map((recipe) => recipe._id));
        setFavoritedRecipes(favoriteIds);
      } catch (err) {
        setError("Failed to load favorites. Please try again later.");
        console.error("Error fetching favorites:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  useEffect(() => {
    const newSort = searchParams.get("sortBy") || "default";
    const newOrder = searchParams.get("order") || "ascending";
    setSortBy(newSort);
    setSortOrder(newOrder);
  }, [searchParams]);

  const handleSort = (newSortBy, newSortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    const sortedRecipes = sortRecipes(initialRecipes, newSortBy, newSortOrder);
    setRecipes(sortedRecipes);
  };

  useEffect(() => {
    const sortedRecipes = sortRecipes(initialRecipes, sortBy, sortOrder);
    setRecipes(sortedRecipes);
  }, [initialRecipes, sortBy, sortOrder]);

  const toggleFavorite = async (recipeId) => {
    const loggedInEmail = localStorage.getItem("loggedInUserEmail");
    if (!loggedInEmail) {
      setError("Please log in to manage favorites");
      return;
    }

    const isFavorited = favoritedRecipes.has(recipeId);
    const recipe = recipes.find((r) => r._id === recipeId);

    try {
      // Optimistically update UI
      setFavoritedRecipes((prev) => {
        const updated = new Set(prev);
        if (isFavorited) {
          updated.delete(recipeId);
        } else {
          updated.add(recipeId);
        }
        return updated;
      });

      // Also update the favorite details
      setFavoriteDetails((prev) => {
        if (isFavorited) {
          return prev.filter((r) => r._id !== recipeId);
        } else if (recipe) {
          return [...prev, recipe];
        }
        return prev;
      });

      const response = await fetch("/api/favorites", {
        method: isFavorited ? "DELETE" : "POST",
        body: JSON.stringify({ recipeId, email: loggedInEmail }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to update favorites");
      }
    } catch (err) {
      // Revert optimistic updates on error
      setFavoritedRecipes((prev) => {
        const reverted = new Set(prev);
        if (isFavorited) {
          reverted.add(recipeId);
        } else {
          reverted.delete(recipeId);
        }
        return reverted;
      });

      setFavoriteDetails((prev) => {
        if (isFavorited && recipe) {
          return [...prev, recipe];
        } else {
          return prev.filter((r) => r._id !== recipeId);
        }
      });

      setError("Failed to update favorites. Please try again.");
      console.error("Error updating favorites:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  }

  return (
    <>
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        <SortControl
          onSortChange={handleSort}
          sortBy={sortBy}
          sortOrder={sortOrder}
        />

        <div className="mb-4 relative">
          <button
            onClick={() => setDropdownVisible(!dropdownVisible)}
            className="flex items-center text-gray-800 font-roboto"
          >
            <PiHeart className="mr-2" size={20} />
            <span>Favorites ({favoritedRecipes.size})</span>
            <FaCaretDown
              className={`ml-2 ${
                dropdownVisible ? "transform rotate-180" : ""
              }`}
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
                      <Link
                        href={`/Recipe/${recipe._id}`}
                        className="block text-sm text-gray-800"
                      >
                        {recipe.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <Link
              href={`/Recipe/${recipe._id}`}
              key={recipe._id}
              className="block p-4 bg-[#fcfde2] dark:bg-black dark:border-gray-950 border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 duration-300 ease-in-out"
            >
              <div className="relative w-full h-64">
                {recipe.images.length > 1 ? (
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

              <div className="p-4 flex justify-between items-center">
                <h2 className="text-[#fc9d4f] font-bold text-xl mb-3 font-montserrat group-hover:text-[#2b617f]">
                  {recipe.title}
                </h2>
                <button
                  className={`ml-2 ${
                    favoritedRecipes.has(recipe._id)
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

              <div className="space-y-2">
                <p className="text-sm text-gray-600 flex items-center">
                  <FaClock className="text-[#020123] mr-2" />
                  {recipe.prep + recipe.cook} mins
                </p>
                <p className="text-sm text-gray-600 flex items-center">
                  <PiCookingPotDuotone className="text-[#020123] mr-2" />
                  {recipe.cook} mins
                </p>
                <p className="text-sm text-gray-600 flex items-center">
                  <FaUtensils className="text-[#020123] mr-2" />
                  Serves {recipe.servings}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {recipe.category && (
                  <span className="inline-block bg-[#edd282] dark:bg-[#1c1d02] dark:text-gray-400  text-[#020123] text-sm px-2 py-1 rounded">
                    {recipe.category}
                  </span>
                )}
                <span className="inline-block bg-[#edd282] text-[#020123]  dark:bg-[#1c1d02] dark:text-gray-400 text-sm px-2 py-1 rounded">
                  {recipe.instructions.length} steps
                </span>
                <span className="inline-block bg-[#edd282] text-[#020123]  dark:bg-[#1c1d02] dark:text-gray-400 text-sm px-2 py-1 rounded">
                  {new Date(recipe.published).toDateString()}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};


export default Recipes;
