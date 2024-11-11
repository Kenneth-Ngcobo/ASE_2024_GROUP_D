/* eslint-disable @next/next/no-page-custom-font */
'use client'

// Import necessary dependencies from Next.js and React
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaCalendarDay, FaClock, FaUtensils, FaTags, FaUtensilSpoon, FaListUl } from "react-icons/fa"; // Updated icon imports
import Head from 'next/head';
import Carousel from './Carousel';
import { SortControl } from './SortControl';
import { sortRecipes } from './sortUtils';
import { useSearchParams } from 'next/navigation';

export default function Recipes({ recipes: initialRecipes }) {
  const [sortBy, setSortBy] = useState("default");
  const [sortOrder, setSortOrder] = useState("ascending");
  const [recipes, setRecipes] = useState(initialRecipes);
  const searchParams = useSearchParams();

  useEffect(() => {
    const newSort = searchParams.get("sortBy") || "default";
    const newOrder = searchParams.get("order") || "ascending";

    setSortBy(newSort);
    setSortOrder(newOrder);
  },[searchParams])

  const handleSort = (newSortBy, newSortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    const sortedRecipes = sortRecipes(initialRecipes, newSortBy, newSortOrder);
    setRecipes(sortedRecipes);
  };

  useEffect(() => {
    const sortedRecipes = sortRecipes(initialRecipes, sortBy, sortOrder);
    setRecipes(sortedRecipes);
  }, [initialRecipes]);


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

        {/* Grid layout to display the list of recipes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Map over recipes and display each one */}
          {recipes && recipes.map((recipe) => (
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
                <FaHeart size={24} />
              </button>


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
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                )}
              </div>

              {/* Recipe details */}
              <p className="text-sm text-gray-600 font-roboto">
                <FaCalendarDay className="inline-block text-green-600 mr-1" />
                <strong className="text-green-600"></strong> {new Date(recipe.published).toDateString()}
              </p>
              <p className="text-sm text-gray-600 font-roboto">
                <FaListUl className="inline-block text-green-600 mr-1" />
                <strong className="text-green-600"></strong> {recipe.instructions ? recipe.instructions.length : 0} steps
              </p>
              <p className="text-sm mt-2 font-roboto">
                <FaClock className="inline-block text-green-600 mr-1" />
                <strong className="text-green-600"></strong> {recipe.prep} minutes
              </p>
              <p className="text-sm font-roboto">
                <FaUtensilSpoon className="inline-block text-green-600 mr-1" />
                <strong className="text-green-600"></strong> {recipe.cook} minutes
              </p>
              <p className="text-sm font-roboto">
                <FaUtensils className="inline-block text-green-600 mr-1" />
                <strong className="text-green-600"></strong> {recipe.servings}
              </p>
              <p className="text-sm font-roboto">
                <FaTags className="inline-block text-green-600 mr-1" />
                <strong className="text-green-600"></strong> {recipe.category}
              </p>
            </Link>
          ))}
      </div>
      </div>
      </>
  );
}
