'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaClock, FaUtensils, FaCaretDown } from "react-icons/fa";
import { PiCookingPotDuotone,PiHeart } from 'react-icons/pi';
import Head from 'next/head';
import Carousel from './Carousel';
import { SortControl } from './SortControl';
import { useSearchParams } from 'next/navigation';

export default function Recipes({ recipes: initialRecipes }) {
  
  const [sortBy, setSortBy] = useState("default");
  const [sortOrder, setSortOrder] = useState("ascending");
  const [recipes, setRecipes] = useState(initialRecipes);
  const [loading, setLoading] = useState(true);
  const [favoritedRecipes, setFavoritedRecipes] = useState(new Set());
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const searchParams = useSearchParams();

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

  const toggleFavorite = async (recipeId) => {
    const isFavorited = favoritedRecipes.has(recipeId);
    const loggedInEmail = localStorage.getItem('loggedInUserEmail');

    if (isFavorited) {
      setFavoritedRecipes((prev) => {
        const updated = new Set(prev);
        updated.delete(recipeId);
        return updated;
      });
      await fetch(`/api/favorites`, {
        method: 'DELETE',
        body: JSON.stringify({ recipeId, email: loggedInEmail }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });
    } else {
      setFavoritedRecipes((prev) => new Set(prev).add(recipeId));
      await fetch(`/api/favorites`, {
        method: 'POST',
        body: JSON.stringify({ recipeId, email: loggedInEmail }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });
    }
  };

  if (loading) {
    return <div className="container mx-auto p-4 text-center">Loading recipes...</div>;
  }

  return (
    <>
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
        <SortControl />

        <div className="mb-4">
          <button
            onClick={() => setDropdownVisible(!dropdownVisible)}
            className="flex items-center text-gray-800 font-roboto"
          >
            <PiHeart className="mr-2" size={20} />
            <span>Favorites</span>
            <FaCaretDown className={`ml-2 ${dropdownVisible ? 'transform rotate-180' : ''}`} />
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <Link
              href={`/Recipe/${recipe._id}`}
              key={recipe._id}
              className="block p-4 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 duration-300 ease-in-out"
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
                  className={`ml-2 ${favoritedRecipes.has(recipe._id) ? 'text-red-500' : 'text-gray-400'} hover:text-red-500`}
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
                  <FaClock className="text-[#1e455c] mr-2" />
                  {recipe.prep + recipe.cook} mins
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
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}



 

      

    


    
            
           





             
                