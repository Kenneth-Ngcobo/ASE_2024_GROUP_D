import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Recipes = ({ recipe }) => {
  return (
    <Link href={`/recipes/${recipe.id}`} className="block p-4 bg-[#1C1C1C] border border-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-800">
      <Image
        src={recipe.image}
        alt={recipe.title}
        width={300}
        height={200}
        className="object-cover rounded-md"
      />
      <h2 className="text-xl font-bold mt-8 text-orage">{recipe.title}</h2>
      <p className="text-sm text-gray-400 mt-1">Category: {recipe.category}</p>
      <p className="text-sm text-gray-500">Prep Time: {recipe.prep} mins</p>
    </Link>
  );
};

export default Recipes;
