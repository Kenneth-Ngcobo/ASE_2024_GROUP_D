/* eslint-disable @next/next/no-page-custom-font */
'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaCalendarDay, FaClock, FaUtensils, FaTags, FaListUl } from "react-icons/fa";
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
  }, [initialRecipes]);

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
          {/* Sort Control*/}
          <div className="mb-8">
            <SortControl
              onSortChange={handleSort}
              sortBy={sortBy}
              sortOrder={sortOrder}
              className="bg-white rounded-lg shadow-sm"
            />
          </div>

          {/*  grid layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recipes && recipes.map((recipe) => (
              <Link
                href={`/Recipe/${recipe._id}`}
                key={recipe._id}
                className="group block bg-white rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 shadow-sm hover:shadow-md"
              >
                {/* Image section */}
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

                {/* Content section */}
                <div className="p-4">
                  <h2 className="text-[#1e455c] font-bold text-xl mb-3 font-montserrat group-hover:text-[#2b617f]">
                    {recipe.title}
                  </h2>

                  {/* Recipe details */}
                 {/*  <div className="flex justify-between items-center mb-2">*/}
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
