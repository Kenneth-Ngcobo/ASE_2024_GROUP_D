'use client'

import { useState } from 'react';
import Image from 'next/image';
import { FaCalendarDay, FaClock, FaUtensils, FaListUl, FaTags, FaUtensilSpoon } from "react-icons/fa";
import { FavoriteButton } from './FavoriteButton';
import Carousel from './Carousel';

export default function Recipe({ recipe }) {
  const [activeTab, setActiveTab] = useState('ingredients');

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Recipe Header Section */}
      <div className="mb-8 relative">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-playfair font-bold text-green-800">
              {recipe.title}
            </h1>
            {/* Add FavoriteButton here with larger size */}
            <div className="relative top-0 right-0">
              <FavoriteButton 
                recipeId={recipe._id} 
                className="p-3" // Larger padding
                iconClassName="w-6 h-6" // Larger icon
              />
            </div>
          </div>

          {/* Recipe Image/Carousel */}
          <div className="relative w-full h-[400px] mb-6 rounded-lg overflow-hidden">
            {recipe.images.length > 1 ? (
              <Carousel images={recipe.images} />
            ) : (
              <Image
                src={recipe.images[0]}
                alt={recipe.title}
                fill
                objectFit="cover"
                className="rounded-lg"
              />
            )}
          </div>

          {/* Recipe Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <FaCalendarDay className="mr-2 text-green-600" />
              <span>{new Date(recipe.published).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FaClock className="mr-2 text-green-600" />
              <span>Prep: {recipe.prep} mins</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FaUtensilSpoon className="mr-2 text-green-600" />
              <span>Cook: {recipe.cook} mins</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FaUtensils className="mr-2 text-green-600" />
              <span>Serves: {recipe.servings}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FaListUl className="mr-2 text-green-600" />
              <span>{recipe.instructions.length} steps</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FaTags className="mr-2 text-green-600" />
              <span>{recipe.category}</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <p className="text-gray-700">{recipe.description}</p>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('ingredients')}
                className={`mr-4 py-2 px-4 font-medium ${
                  activeTab === 'ingredients'
                    ? 'border-b-2 border-green-600 text-green-600'
                    : 'text-gray-500 hover:text-green-500'
                }`}
              >
                Ingredients
              </button>
              <button
                onClick={() => setActiveTab('instructions')}
                className={`py-2 px-4 font-medium ${
                  activeTab === 'instructions'
                    ? 'border-b-2 border-green-600 text-green-600'
                    : 'text-gray-500 hover:text-green-500'
                }`}
              >
                Instructions
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === 'ingredients' ? (
              <div className="space-y-2">
                <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
                <ul className="list-disc pl-5 space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="text-gray-700">
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">Instructions</h2>
                <ol className="space-y-4">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex">
                      <span className="font-bold text-green-600 mr-4">
                        {index + 1}.
                      </span>
                      <span className="text-gray-700">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}