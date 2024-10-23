'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Loading from './loading';
import Head from 'next/head';

export default function Recipes({ recipes }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (recipes) {
      setLoading(false);
    }
  }, [recipes]);

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500 text-center p-4">Error: {error}</div>;

  return (
    <>
      <Head>
        {/* Import Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Roboto:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-8 font-playfair text-green-700">
          
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recipes && recipes.map((recipe) => (
            <Link
              href={`/Recipe/${recipe._id}`}
              key={recipe._id}
              className="block p-4 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 duration-300 ease-in-out"
            >
              <h2 className="text-xl font-semibold font-playfair mb-2 text-green-800">
                {recipe.title}
              </h2>
              <div className="relative w-full h-48 mb-4">
                <Image
                  src={recipe.images[0]}
                  alt={recipe.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
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
