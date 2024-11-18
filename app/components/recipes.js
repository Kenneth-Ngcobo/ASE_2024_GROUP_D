"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaClock, FaUtensils, FaCaretDown } from "react-icons/fa";
import { PiCookingPotDuotone,PiHeart } from 'react-icons/pi';
import Head from "next/head";
import Carousel from "./Carousel";
import { SortControl } from "./SortControl";
import { useSearchParams } from "next/navigation";

const Recipes = ({ recipes: initialRecipes }) => {
  const [sortBy, setSortBy] = useState("default");
  const [sortOrder, setSortOrder] = useState("ascending");
  const [recipes, setRecipes] = useState(initialRecipes || []);
  const [favoritedRecipes, setFavoritedRecipes] = useState(new Set());
  const [favoriteDetails, setFavoriteDetails] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  // Fetch favorites when component mounts
  useEffect(() => {
    const fetchFavorites = async () => {
      const loggedInEmail = localStorage.getItem("loggedInUserEmail");
      if (!loggedInEmail) {
        setLoading(false);
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
        const favoriteIds = new Set(data.favorites.map(recipe => recipe._id));
        setFavoritedRecipes(favoriteIds);
      } catch (err) {
        setError("Failed to load favorites. Please try again later.");
        console.error("Error fetching favorites:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  useEffect(() => {
    const newSort = searchParams.get("sortBy") || "default";
    const newOrder = searchParams.get("order") || "ascending";
    setSortBy(newSort);
    setSortOrder(newOrder);

    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const queryString = searchParams.toString();
        const response = await fetch(`/api/recipes?${queryString}`);
        const data = await response.json();

        if (response.ok) {
          setRecipes(data.recipes);
        } else {
          console.error('Failed to fetch recipes:', data.error);
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [searchParams]);

  // const handleSort = (newSortBy, newSortOrder) => {
  //   setSortBy(newSortBy);
  //   setSortOrder(newSortOrder);
  //   const sortedRecipes = sortRecipes(initialRecipes, newSortBy, newSortOrder);
  //   setRecipes(sortedRecipes);
  // };

  // useEffect(() => {
  //   const sortedRecipes = sortRecipes(initialRecipes, sortBy, sortOrder);
  //   setRecipes(sortedRecipes);
  // }, [initialRecipes, sortBy, sortOrder]);

  const toggleFavorite = async (recipeId) => {
    const loggedInEmail = localStorage.getItem("loggedInUserEmail");
    if (!loggedInEmail) {
      setError("Please log in to manage favorites");
      return;
    }

    const isFavorited = favoritedRecipes.has(recipeId);
    const recipe = recipes.find(r => r._id === recipeId);

    try {
      // Optimistically update UI
      setFavoritedRecipes(prev => {
        const updated = new Set(prev);
        if (isFavorited) {
          updated.delete(recipeId);
        } else {
          updated.add(recipeId);
        }
        return updated;
      });

      // Also update the favorite details
      setFavoriteDetails(prev => {
        if (isFavorited) {
          return prev.filter(r => r._id !== recipeId);
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
      setFavoritedRecipes(prev => {
        const reverted = new Set(prev);
        if (isFavorited) {
          reverted.add(recipeId);
        } else {
          reverted.delete(recipeId);
        }
        return reverted;
      });

      setFavoriteDetails(prev => {
        if (isFavorited && recipe) {
          return [...prev, recipe];
        } else {
          return prev.filter(r => r._id !== recipeId);
        }
      });

      setError("Failed to update favorites. Please try again.");
      console.error("Error updating favorites:", err);
    }
  };

  if (loading) {
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

        <SortControl />

        <div className="mb-4">
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
              className="block p-4 bg-white dark:bg-black dark:border-gray-950 border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 duration-300 ease-in-out"
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
                <h2 className="text-[#1e455c] font-bold text-xl mb-3 font-montserrat group-hover:text-[#2b617f]">
                  {recipe.title}
                </h2>
                <button
                  className={`absolute top-2 right-2 z-10 ${
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

                <div className="mb-4 relative w-full h-48">
                  {recipe.images && recipe.images.length > 0 ? (
                    <Image
                      src={recipe.images[0]}
                      alt={recipe.title}
                      className="rounded-lg object-cover"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                      <FaUtensils className="text-gray-400" size={32} />
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-playfair font-bold mb-2 text-gray-800">
                  {recipe.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {recipe.description}
                </p>
                <p className="text-sm text-gray-600 flex items-center">
                  <PiCookingPotDuotone className="text-[#1e455c] mr-2" />
                  {recipe.cook} mins
                </p>
                <p className="text-sm text-gray-600 flex items-center">
                  <FaUtensils className="text-[#1e455c] mr-2" />
                  Serves {recipe.servings}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {recipe.category && (
                  <span className="inline-block bg-gray-100 dark:bg-gray-950 dark:text-gray-400  text-gray-600 text-sm px-2 py-1 rounded">
                    {recipe.category}
                  </span>
                )}
                <span className="inline-block bg-gray-100 text-gray-600  dark:bg-gray-950 dark:text-gray-400 text-sm px-2 py-1 rounded">
                  {recipe.instructions.length} steps
                </span>
                <span className="inline-block bg-gray-100 text-gray-600  dark:bg-gray-950 dark:text-gray-400 text-sm px-2 py-1 rounded">
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