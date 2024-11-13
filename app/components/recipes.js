'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaHeart, FaCalendarDay, FaClock, FaUtensils, FaTags, FaUtensilSpoon, FaListUl, FaCaretDown } from "react-icons/fa";
import Head from 'next/head';
import Carousel from './Carousel';
import { SortControl } from './SortControl';
import { useSearchParams } from 'next/navigation';

export default function Recipes({ recipes: initialRecipes }) {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [loading, setLoading] = useState(true);
  const [favoritedRecipes, setFavoritedRecipes] = useState(new Set());  // Track favorited recipes
  const [dropdownVisible, setDropdownVisible] = useState(false);  // To manage dropdown visibility
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
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        // Construct the API URL with all search parameters
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

  const toggleFavorite = async (recipeId) => {
    const loggedInEmail = localStorage.getItem("loggedInUserEmail");
    if (!loggedInEmail) {
      setError("Please log in to manage favorites");
      return;
    }

    const isFavorited = favoritedRecipes.has(recipeId);

    // Retrieve the logged-in email from local storage
    const loggedInEmail = localStorage.getItem('loggedInUserEmail');


    try {
      if (isFavorited) {
        setFavoritedRecipes((prev) => {
          const updated = new Set(prev);
          updated.delete(recipeId);
          return updated;
        });
        await fetch(`/api/favorites`, {
          method: 'DELETE',
          body: JSON.stringify({ recipeId, email: loggedInEmail }),
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
        });
      } else {
        setFavoritedRecipes((prev) => new Set(prev).add(recipeId));
        await fetch(`/api/favorites`, {
          method: 'POST',
          body: JSON.stringify({ recipeId, email: loggedInEmail }),
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
        });
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  if (loading) {
    return <div className="container mx-auto p-4 text-center">Loading recipes...</div>;
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
        <SortControl />

        {/* Favorites Dropdown */}
        <div className="mb-4">
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
              <ul className="max-h-60 overflow-y-auto p-2">
                {Array.from(favoritedRecipes).map((recipeId) => {
                  const recipe = recipes.find((r) => r._id === recipeId);
                  return recipe && (
                    <li key={recipe._id} className="p-2 hover:bg-gray-100">
                      <Link href={`/Recipe/${recipe._id}`} className="block text-sm text-gray-800">
                        {recipe.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <Link
              href={`/Recipe/${recipe._id}`}  // Link to each recipe's detailed page using its ID
              key={recipe._id}  // Unique key for each mapped element
              className="block p-4 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 duration-300 ease-in-out"
            >
              {/* Heart Icon for Favorites */}
              <button
                className={`absolute top-2 right-2 ${favoritedRecipes.has(recipe._id) ? 'text-red-500' : 'text-gray-400'} hover:text-red-500`}
                onClick={(e) => {
                  e.preventDefault(); // Prevents navigating when clicked
                  toggleFavorite(recipe._id);  // Call the function to toggle favorite
                }}
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

              {/* Recipe details */}
              <p className="text-sm text-gray-600 font-roboto">
                <FaCalendarDay className="inline-block text-green-600 mr-1" />
                {new Date(recipe.published).toDateString()}
              </p>
              <p className="text-sm text-gray-600 font-roboto">
                <FaListUl className="inline-block text-green-600 mr-1" />
                {recipe.instructions ? recipe.instructions.length : 0} steps
              </p>
              <p className="text-sm mt-2 font-roboto">
                <FaClock className="inline-block text-green-600 mr-1" />
                {recipe.prep} minutes
              </p>
              <p className="text-sm font-roboto">
                <FaUtensilSpoon className="inline-block text-green-600 mr-1" />
                {recipe.cook} minutes
              </p>
              <p className="text-sm font-roboto">
                <FaUtensils className="inline-block text-green-600 mr-1" />
                {recipe.servings}
              </p>
              <p className="text-sm font-roboto">
                <FaTags className="inline-block text-green-600 mr-1" />
                {recipe.category}
              </p>
            </Link>
          ))}
        </div>
      </div >
    </>
  );
};

export default Recipes;