'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Recipes({ recipes }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (recipes) {
      setLoading(false);
    }
  }, [recipes]);

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-4">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Recipes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recipes && recipes.map((recipe) => (
          <Link href={`/recipes/${recipe.id}`} key={recipe.id} className="block p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
            <Image
              src={recipe.images}
              alt={recipe.title}
              width={300}
              height={200}
              className='object-cover rounded-md'
            
            />
            <p className="text-sm text-gray-600">Published: {new Date(recipe.published).toDateString()}</p>
            <p className="text-sm mt-2"><strong>Prep Time:</strong> {recipe.prep} minutes</p>
            <p className="text-sm"><strong>Cook Time:</strong> {recipe.cook} minutes</p>
            <p className="text-sm"><strong>Servings:</strong> {recipe.servings}</p>
            <p className="text-sm"><strong>Category:</strong> {recipe.category}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
