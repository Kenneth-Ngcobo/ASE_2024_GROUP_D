"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaHeart,
  FaCalendarDay,
  FaClock,
  FaUtensils,
  FaTags,
  FaUtensilSpoon,
  FaListUl,
  FaCaretDown,
} from "react-icons/fa";
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
        setFavoritedRecipes(new Set(data.favorites));
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
      // Revert optimistic update on error
      setFavoritedRecipes((prev) => {
        const reverted = new Set(prev);
        if (isFavorited) {
          reverted.add(recipeId);
        } else {
          reverted.delete(recipeId);
        }
        return reverted;
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
      <Head>
        <Link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Roboto:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Head>

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
            <FaHeart className="mr-2" size={20} />
            <span>Favorites ({favoritedRecipes.size})</span>
            <FaCaretDown
              className={`ml-2 ${
                dropdownVisible ? "transform rotate-180" : ""
              }`}
            />
          </button>

          {dropdownVisible && (
            <div className="mt-2 absolute bg-white border border-gray-200 rounded-lg shadow-lg w-60 z-10">
              {favoritedRecipes.size === 0 ? (
                <p className="p-4 text-gray-500">No favorites yet</p>
              ) : (
                <ul className="max-h-60 overflow-y-auto p-2">
                  {Array.from(favoritedRecipes).map((recipeId) => {
                    const recipe = recipes.find((r) => r._id === recipeId);
                    return (
                      recipe && (
                        <li key={recipe._id} className="p-2 hover:bg-gray-100">
                          <Link
                            href={`/Recipe/${recipe._id}`}
                            className="block text-sm text-gray-800"
                          >
                            {recipe.title}
                          </Link>
                        </li>
                      )
                    );
                  })}
                </ul>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recipes && recipes.length > 0 ? (
            recipes.map((recipe) => (
              <Link
                href={`/Recipe/${recipe._id}`}
                key={recipe._id}
                className="block p-4 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 duration-300 ease-in-out relative"
              >
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
                  <FaHeart size={24} />
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

                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <FaClock className="mr-2" />
                    <span>{recipe.cookingTime} mins</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <FaUtensilSpoon className="mr-2" />
                    <span>
                      {recipe.ingredients ? recipe.ingredients.length : 0}{" "}
                      ingredients
                    </span>
                  </div>

                  {recipe.category && (
                    <div className="flex items-center text-gray-600">
                      <FaTags className="mr-2" />
                      <span>{recipe.category}</span>
                    </div>
                  )}

                  {recipe.createdAt && (
                    <div className="flex items-center text-gray-600">
                      <FaCalendarDay className="mr-2" />
                      <span>
                        {new Date(recipe.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500">No recipes available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Recipes;