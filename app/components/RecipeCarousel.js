"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaClock, FaUtensils } from "react-icons/fa";

const RecipeCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [topRecipes, setTopRecipes] = useState([]);

  useEffect(() => {
    const fetchTopRecipes = async () => {
      try {
        const response = await fetch("/api/recipes/recommendations?limit=10");
        if (!response.ok) throw new Error("Failed to fetch recipes");

        const recipes = await response.json();
        const sortedRecipes = recipes.sort((a, b) => b.averageRating - a.averageRating);
        setTopRecipes(sortedRecipes);
      } catch (error) {
        console.error("Error fetching top recipes:", error);
      }
    };

    fetchTopRecipes();
  }, []);

  const visibleRecipes = 3;
  const maxIndex = Math.max(0, topRecipes.length - visibleRecipes);

  const nextSlide = () => setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  const prevSlide = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-4 h-4 ${
              index < fullStars
                ? "fill-yellow-400 text-yellow-400"
                : index === fullStars && hasHalfStar
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">({rating.toFixed(1)})</span>
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-8 bg-[#fcfde2] dark:bg-[#1c1d02]">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-[#ff4f1a] tracking-tight">
          Top Rated Recipes
          <div className="h-1 w-20 bg-[#fc9d4f] mt-2 rounded-full" />
        </h2>
      </div>

      <div className="relative">
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className="absolute left-[-16px] top-1/2 transform -translate-y-1/2 p-2 rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed z-10"
          aria-label="Previous recipes"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>

        <div className="overflow-hidden rounded-xl">
          <div
            className="flex gap-6 transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleRecipes)}%)`,
            }}
          >
            {topRecipes.map((recipe) => (
              <div
                key={recipe._id}
                className="flex-none w-1/3 group cursor-pointer"
              >
                <Link href={`/Recipe/${recipe._id}`}>
                  <div
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    style={{ height: "360px" }} // Fixed height
                  >
                    <div
                      className="relative pt-[70%]"
                      style={{ height: "60%" }} // Fixed height for the image container
                    >
                      <Image
                        src={
                          recipe.images && recipe.images.length > 0
                            ? recipe.images[0]
                            : "/fallback-placeholder.jpg"
                        }
                        alt={recipe.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div
                      className="p-6 flex flex-col justify-between"
                      style={{ height: "40%" }} // Fixed height for the text content
                    >
                      <h3 className="font-semibold text-xl text-[#fc9d4f] mb-3 line-clamp-2">
                        {recipe.title}
                      </h3>
                      <div className="flex items-center gap-4 text-[#020123]">
                        <StarRating rating={recipe.averageRating || 0} />
                        <div className="flex items-center gap-1.5">
                          <FaClock className="w-4 h-4" />
                          <span className="text-sm">
                            {recipe.cookTime || "30 mins"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaUtensils className="w-4 h-4" />
                          <span className="text-sm">
                            serves {recipe.servings || "4"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={nextSlide}
          disabled={currentIndex === maxIndex}
          className="absolute right-[-16px] top-1/2 transform -translate-y-1/2 p-2 rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed z-10"
          aria-label="Next recipes"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default RecipeCarousel;
