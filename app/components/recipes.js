"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {FaCalendarDay,FaClock,FaUtensils,FaTags,FaUtensilSpoon,FaListUl,FaCaretDown,FaStar,FaStarHalf,FaRegStar} from "react-icons/fa";
import { PiCookingPotDuotone, PiHeart } from "react-icons/pi";
import Head from "next/head";
import Carousel from "./Carousel";
import { SortControl } from "./SortControl";
import { useSearchParams } from "next/navigation";
import { useShoppingList } from "../context/shoppingListContext";
import ShoppingList from "./shoppinglist";

const StarRating = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    } else if (i === fullStars && hasHalfStar) {
      stars.push(<FaStarHalf key={i} className="text-yellow-400" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-yellow-400" />);
    }
  }

  return <div className="flex">{stars}</div>;
};

const Recipes = ({ recipes: initialRecipes }) => {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [favoritedRecipes, setFavoritedRecipes] = useState(new Set());
  const [favoriteDetails, setFavoriteDetails] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const { dispatch: dispatchShoppingList } = useShoppingList();

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
        setFavoriteDetails(data.favorites);
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
    setRecipes(initialRecipes)
  }, [searchParams]);

  const toggleFavorite = async (recipeId) => {
    const loggedInEmail = localStorage.getItem("loggedInUserEmail");
    if (!loggedInEmail) {
      setError("Please log in to manage favorites");
      return;
    }

    const isFavorited = favoritedRecipes.has(recipeId);
    const recipe = recipes.find((r) => r._id === recipeId);

    try {
      setFavoritedRecipes((prev) => {
        const updated = new Set(prev);
        if (isFavorited) {
          updated.delete(recipeId);
        } else {
          updated.add(recipeId);
        }
        return updated;
      });

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

  const addIngredientsToShoppingList = (ingredients) => {
    const ingredientsArray = Object.keys(ingredients).map((key) => ({
      name: key,
      quantity: ingredients[key],
    }));
  
    ingredientsArray.forEach((ingredient) => {
      dispatchShoppingList({
        type: 'ADD_ITEM',
        payload: { 
          id: ingredient.name,  
          name: `${ingredient.name} - ${ingredient.quantity}`,  
          purchased: false 
        },
      });
    });
  };

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
              className="block p-4 bg-white dark:bg-black dark:border-gray-950 border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 duration-300 ease-in-out"
            >
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

              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-[#1e455c] font-bold text-xl font-montserrat group-hover:text-[#2b617f]">
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

                <div className="flex items-center gap-2 mb-3">
                  <StarRating rating={recipe.rating || 0} />
                  <span className="text-sm text-gray-600">
                    ({recipe.reviewCount || 0})
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-gray-600 flex items-center">
                    <FaClock className="text-[#1e455c] mr-2" />
                    {recipe.prep} mins
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
                    <span className="inline-block bg-gray-100 dark:bg-gray-950 dark:text-gray-400 text-gray-600 text-sm px-2 py-1 rounded">
                      {recipe.category}
                    </span>
                  )}
                  <span className="inline-block bg-gray-100 text-gray-600 dark:bg-gray-950 dark:text-gray-400 text-sm px-2 py-1 rounded">
                    {recipe.instructions.length} steps
                  </span>
                  <span className="inline-block bg-gray-100 text-gray-600 dark:bg-gray-950 dark:text-gray-400 text-sm px-2 py-1 rounded">
                    {new Date(recipe.published).toDateString()}
                  </span>
                  <button
                    className="inline-block bg-blue-500 text-white text-sm px-2 py-1 rounded mt-2"
                    onClick={(e) => {
                      e.preventDefault();
                      addIngredientsToShoppingList(recipe.ingredients);
                    }}
                  >
                    Add Ingredients to Shopping List
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <ShoppingList />
    </>
  );
};

export default Recipes;