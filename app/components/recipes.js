'use client'

// Import necessary dependencies from Next.js and React
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Loading from './loading';
import Head from 'next/head';

export default function Recipes({ recipes }) {
  // State to track if data is still loading
  const [loading, setLoading] = useState(true);

  // State to handle any potential errors
  const [error, setError] = useState(null);

  // useEffect hook to manage loading state based on whether 'recipes' is available
  useEffect(() => {
    if (recipes) {
      setLoading(false);  // Stop loading if recipes are provided
    }
  }, [recipes]);

  // Return a loading component if still fetching recipes
  if (loading) return <Loading />;

  // Return an error message if there's an error
  if (error) return <div className="text-red-500 text-center p-4">Error: {error}</div>;

  return (
    <>
      {/* Use the Head component to include external resources like fonts */}
      <Head>
        {/* Import Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Roboto:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Main container for the recipes grid */}
      <div className="container mx-auto p-4">
        {/* Page heading */}
        <h1 className="text-4xl font-bold text-center mb-8 font-playfair text-green-700">
          {/* Heading for the Recipes page */}
        </h1>

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
                <Image
                  src={recipe.images[0]}  // First image from the recipe images array
                  alt={recipe.title}  // Alternative text for the image
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>

              {/* Recipe details */}
              <p className="text-sm text-gray-600 font-roboto">
                <strong className="text-green-600">Published:</strong> {new Date(recipe.published).toDateString()}
              </p>
              <p className="text-sm mt-2 font-roboto">
                <strong className="text-green-600">Prep Time:</strong> {recipe.prep} minutes
              </p>
              <p className="text-sm font-roboto">
                <strong className="text-green-600">Cook Time:</strong> {recipe.cook} minutes
              </p>
              <p className="text-sm font-roboto">
                <strong className="text-green-600">Servings:</strong> {recipe.servings}
              </p>
              <p className="text-sm font-roboto">
                <strong className="text-green-600">Category:</strong> {recipe.category}
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
