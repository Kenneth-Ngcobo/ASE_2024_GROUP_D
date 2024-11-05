/* eslint-disable @next/next/no-page-custom-font */
'use client';

// Import necessary dependencies from Next.js and React
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaCalendarDay, FaClock, FaUtensils, FaTags, FaUtensilSpoon, FaListUl } from "react-icons/fa"; // Updated icon imports
import { FaHeart } from "react-icons/fa"; // Import the heart icon
import Head from 'next/head';
import Carousel from './Carousel';
import { SortControl } from './SortControl';
import { sortRecipes } from './sortUtils';
import { useSearchParams } from 'next/navigation';
import FavoritesList from './FavoritesList'; // Import FavoritesList

export default function Recipes({ recipes: initialRecipes }) {
  const [sortBy, setSortBy] = useState("default");
  const [sortOrder, setSortOrder] = useState("ascending");
  const [recipes, setRecipes] = useState(initialRecipes);
  const [favorites, setFavorites] = useState(new Set()); // State to manage favorites
  const searchParams = useSearchParams();

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
  }, [initialRecipes, sortBy, sortOrder]); // Ensure to watch for changes in sortBy and sortOrder

  const toggleFavorite = (recipeId) => {
    setFavorites((prevFavorites) => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(recipeId)) {
        newFavorites.delete(recipeId); // Remove from favorites if already present
      } else {
        newFavorites.add(recipeId); // Add to favorites
      }
      return newFavorites;
    });
  };

  return (
    <>
      {/* Use the Head component to include external resources like fonts */}
      <Head>
        {/* Import Google Fonts */}
        <Link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Roboto:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Main container for the recipes grid */}
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
        <SortControl
          onSortChange={handleSort}
          sortBy={sortBy}
          sortOrder={sortOrder}
        />

        {/* Favorites Button */}
        <FavoritesList favorites={favorites} /> {/* Pass favorites state here */}

        {/* Grid layout to display the list of recipes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Map over recipes and display each one */}
          {recipes && recipes.map((recipe) => (
            <Link
              href={`/Recipe/${recipe._id}`}  // Link to each recipe's detailed page using its ID
              key={recipe._id}  // Unique key for each mapped element
              className="block p-4 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 duration-300 ease-in-out"
            >
              {/* Recipe title */}
              <h2 className="text-xl font-semibold font-playfair mb-2 text-green-800">
                {recipe.title}
              </h2>

              {/* Recipe image */}
              <div className="relative w-full h-48 mb-4">
                {recipe.images.length > 1 ? (
                  <Carousel images={recipe.images} />
                ) : (
                  <div className='relative w-full h-full'>
                    <Image
                      src={recipe.images[0]}  // First image from the recipe images array
                      alt={recipe.title}  // Alternative text for the image
                      fill
                      style={{ objectFit: "cover" }} // Use style for object fit in Next.js Image
                      className="rounded-md"
                    />
                  </div>
                )}
              </div>

              {/* Favorite button */}
              <div className="flex justify-between items-center mb-2">
                <span
                  onClick={(e) => {
                    e.preventDefault(); // Prevent navigation when clicking the heart icon
                    toggleFavorite(recipe._id);
                  }}
                  className={`cursor-pointer text-xl ${favorites.has(recipe._id) ? 'text-red-500' : 'text-gray-400'}`}
                >
                  <FaHeart />
                </span>

                {/* Recipe details */}
                <div className="text-sm text-gray-600 font-roboto">
                  <FaCalendarDay className="inline-block text-green-600 mr-1" />
                  {new Date(recipe.published).toDateString()}
                </div>
              </div>

              {/* Additional recipe details */}
              <p className="text-sm font-roboto">
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
      </div>

      {/* Inline styles to apply custom fonts using the loaded Google Fonts */}
      <style jsx>{`
        /* Apply custom fonts */
        .font-playfair {
          font-family: 'Playfair Display', serif;
        }
        .font-roboto {
          font-family: 'Roboto', sans-serif;
        }
      `}</style>
    </>
  );
}
