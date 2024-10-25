/* eslint-disable @next/next/no-page-custom-font */
'use client'

// Import necessary dependencies from Next.js and React
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaCalendarDay, FaClock, FaUtensils, FaTags, FaUtensilSpoon } from "react-icons/fa"; // Importing relevant icons
import Head from 'next/head';
import Carousel from './Carousel';

export default function Recipes({ recipes }) {

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
                  <Carousel images={recipe.images}/>
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
