"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Star, Clock, User } from 'lucide-react';
import Image from 'next/image';

const RecipeCarousel = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [topRecipes, setTopRecipes] = useState([]);

  useEffect(() => {
    // Fetch recommended recipes from API
    const fetchTopRecipes = async () => {
      try {
        const response = await fetch('/api/recipes/recommendations');
        if (!response.ok) throw new Error('Failed to fetch recipes');
        
        const recipes = await response.json();
        setTopRecipes(recipes);
      } catch (error) {
        console.error('Error fetching top recipes:', error);
      }
    };

    fetchTopRecipes();
  }, []);

  const visibleRecipes = 3;
  const maxIndex = Math.max(0, topRecipes.length - visibleRecipes);

  const nextSlide = () => setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  const prevSlide = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  const handleRecipeClick = (recipeId, e) => {
    if (e.target.closest('button')) return;
    router.push(`/recipes/${recipeId}`);
  };

  const StarRating = ({ rating }) => (
    <div className="flex items-center gap-1.5 bg-yellow-50 px-2 py-1 rounded-full">
      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      <span className="text-sm font-medium text-yellow-700">
        {rating !== undefined ? rating.toFixed(1) : "N/A"}</span>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
          Top Rated Recipes
          <div className="h-1 w-20 bg-blue-500 mt-2 rounded-full" />
        </h2>
        <div className="flex gap-2">
          <button onClick={prevSlide} disabled={currentIndex === 0} className="p-2 rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" aria-label="Previous recipes">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button onClick={nextSlide} disabled={currentIndex === maxIndex} className="p-2 rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" aria-label="Next recipes">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
      
      <div className="relative">
        <div className="overflow-hidden rounded-xl">
          <div className="flex gap-6 transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentIndex * (100 / visibleRecipes)}%)` }}>
            {topRecipes.map((recipe) => (
              <div key={recipe.recipeId} className="flex-none w-1/3 group cursor-pointer" onClick={(e) => handleRecipeClick(recipe.recipeId, e)}>
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="relative pt-[70%]">
                    <Image
                      src={recipe.images && recipe.images.length > 0 ? recipe.images[0] : "/fallback-placeholder.jpg"} 
                      alt={recipe.title} 
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-4 left-4">
                      <StarRating rating={recipe.rating} />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-xl text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">{recipe.title}</h3>
                    <div className="flex items-center gap-4 text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{recipe.cookTime || '30 mins'}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User className="w-4 h-4" />
                        <span className="text-sm">{recipe.servings || '4'} servings</span>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <span className="text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors">View Recipe →</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCarousel;
