// app/components/Recipes.js
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Recipes = ({ recipe }) => {
  return (
    <Link href={`/recipes/${recipe.id}`} className="block p-4 bg-white border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <Image
        src={recipe.image}
        alt={recipe.title}
        width={300}
        height={200}
        className="object-cover rounded-md"
      />
      <h2 className="text-xl font-semibold mt-2">{recipe.title}</h2>
      <p className="text-sm text-gray-600 mt-1">Category: {recipe.category}</p>
      <p className="text-sm text-gray-500">Prep Time: {recipe.prep} mins</p>
    </Link>
  );
};

export default Recipes;
