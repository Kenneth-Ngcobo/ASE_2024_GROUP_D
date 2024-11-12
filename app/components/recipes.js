/* eslint-disable @next/next/no-page-custom-font */
'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaHeart, FaClock, FaUtensils, FaCaretDown } from "react-icons/fa"; 
import Head from 'next/head';
import Carousel from './Carousel';
import { SortControl } from './SortControl';
import { sortRecipes } from './sortUtils';
import { useSearchParams } from 'next/navigation';

export default function Recipes({ recipes: initialRecipes }) {
  
  const [sortBy, setSortBy] = useState("default");
  const [sortOrder, setSortOrder] = useState("ascending");
  const [recipes, setRecipes] = useState(initialRecipes);
  const [favoritedRecipes, setFavoritedRecipes] = useState(new Set());  // Track favorited recipes
  const [dropdownVisible, setDropdownVisible] = useState(false);  // To manage dropdown visibility
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
  }, [initialRecipes, sortBy, sortOrder]);

  const toggleFavorite = async (recipeId) => {
    const isFavorited = favoritedRecipes.has(recipeId);

    // Retrieve the logged-in email from local storage
    const loggedInEmail = localStorage.getItem('loggedInUserEmail');

    if (isFavorited) {
      // Remove from favorites
      setFavoritedRecipes((prev) => {
        const updated = new Set(prev);
        updated.delete(recipeId);
        return updated;
      });
      await fetch(`/api/favorites`, {  // Endpoint to remove from favorites (you need to implement this in your backend)
        method: 'DELETE',
        body: JSON.stringify({ recipeId, email: loggedInEmail }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });
    } else {
      // Add to favorites
      setFavoritedRecipes((prev) => new Set(prev).add(recipeId));
      await fetch(`/api/favorites`, {  // Endpoint to add to favorites
        method: 'POST',
        body: JSON.stringify({ recipeId, email: loggedInEmail }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });
    }
  };

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="bg-[#f7f7f7] min-h-screen">
        <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
          {/* Sort Control */}
          <div className="mb-8">
            <SortControl
              onSortChange={handleSort}
              sortBy={sortBy}
              sortOrder={sortOrder}
              className="bg-white rounded-lg shadow-sm"
            />
          </div>

          {/* Dropdown Button for Favorites */}
          <div className="mb-4">
            <button
              onClick={() => setDropdownVisible(!dropdownVisible)}  // Toggle dropdown visibility
              className="flex items-center text-gray-800 font-roboto"
            >
              <FaHeart className="mr-2" size={20} />
              <span>Favorites</span>
              <FaCaretDown className={`ml-2 ${dropdownVisible ? 'transform rotate-180' : ''}`} />
            </button>
          
            {/* Dropdown List */}
            {dropdownVisible && (
              <div className="mt-2 absolute bg-white border border-gray-200 rounded-lg shadow-lg w-60 z-10">
                <ul className="max-h-60 overflow-y-auto p-2">
                  {Array.from(favoritedRecipes).map((recipeId) => {
                    const recipe = recipes.find((r) => r._id === recipeId);
                    return (
                      recipe && (
                        <li key={recipe._id} className="p-2 hover:bg-gray-100">
                          <Link href={`/Recipe/${recipe._id}`} className="block text-sm text-gray-800">
                            {recipe.title}
                          </Link>
                        </li>
                      )
                    );
                  })}
                </ul>
              </div>
            )}
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recipes && recipes.map((recipe) => (
              <Link
                href={`/Recipe/${recipe._id}`}
                key={recipe._id}
                className="group block bg-white rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 shadow-sm hover:shadow-md"
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

                {/* Image Section */}
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

                {/* Content Section */}
                <div className="p-4">
                  <h2 className="text-[#1e455c] font-bold text-xl mb-3 font-montserrat group-hover:text-[#2b617f]">
                    {recipe.title}
                  </h2>

                  {/* Recipe Details */}
                  <div></div>
                  <div className="space-y-2">
                      <p className="text-sm text-gray-600 flex items-center">
                        <FaClock className="text-[#1e455c] mr-2" />
                        {recipe.prep + recipe.cook} mins
                      </p>
                      <p className="text-sm text-gray-600 flex items-center">
                        <FaClock className="text-[#1e455c] mr-2" />
                        {recipe.cook} mins
                      </p>
                      <p className="text-sm text-gray-600 flex items-center">
                        <FaUtensils className="text-[#1e455c] mr-2" />
                        Serves {recipe.servings}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {recipe.category && (
                        <span className="inline-block bg-gray-100 text-gray-600 text-sm px-2 py-1 rounded">
                          {recipe.category}
                        </span>
                      )}
                      <span className="inline-block bg-gray-100 text-gray-600 text-sm px-2 py-1 rounded">
                        {recipe.instructions.length} steps
                      </span>
                      <span className="inline-block bg-gray-100 text-gray-600 text-sm px-2 py-1 rounded">
                        {new Date(recipe.published).toDateString()}
                      </span>
                    </div>
                  </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}


 

      

    


    
            
           





             
                