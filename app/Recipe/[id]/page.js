"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation
import { getRecipe } from '@/app/lib/getRecipe'; // Correctly import the server-side fetch function
import ImageGallery from '@/app/components/ImageGallery'; // Import ImageGallery component
import Image from 'next/image'; // Import Image component from Next.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

// Loading component
const Loading = () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
        <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500 mx-auto mb-4"></div>
            <p className="text-lg text-green-700">Loading recipe...</p>
        </div>
    </div>
);
import { useParams } from 'next/navigation';
import { fetchRecipeById } from '../../api';

// Go back function
function goBack() {
    window.history.back(); // Uses browser's history to go back
}

// Main Recipe Page Component
export default function RecipePage({ params }) {
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [recipe, setRecipe] = useState(null); // State for recipe data
    const [error, setError] = useState(null); // State for error handling
    const [openSections, setOpenSections] = useState({}); // State to track open/close sections
    const router = useRouter(); // Use router for navigation
    const { id } = params; // Get recipe ID from URL parameters

    // Fetch recipe data
    useEffect(() => {
        const fetchRecipe = async () => {
            const { recipe, error } = await getRecipe(id);
            if (error) {
                setError(error);
            } else {
                setRecipe(recipe);
            }
            setIsLoading(false);
        };

        fetchRecipe();
    }, [id]);

    // Function to toggle open/close sections
    const toggleSection = (section) => {
        setOpenSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    // Render loading state
    if (isLoading) return <Loading />;

    // Render error state
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <p className="text-gray-700 text-lg">{error}</p>
                    <button
                        onClick={goBack}
                        className="mt-4 bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    // Render the recipe page
    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8">
            <div className="container mx-auto px-4 max-w-5xl">
                {/* Back Button */}
                <div className="mb-8">
                    <button
                        onClick={goBack}
                        className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 
                                 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 
                                 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        ← Back to Recipes
                    </button>
                </div>

                <div className="space-y-8">
                    {/* Image Section */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 overflow-hidden">
                        {recipe.images && recipe.images.length > 0 ? (
                            <ImageGallery images={recipe.images} />
                        ) : recipe.images?.[0] ? (
                            <Image
                                src={recipe.images[0]}
                                alt={recipe.title || 'Recipe Image'}
                                width={300}
                                height={200}
                                className="w-full h-[400px] object-cover rounded-xl"
                            />
                        ) : (
                            <div className="w-full h-[400px] bg-gray-100 rounded-xl flex items-center justify-center">
                                <p className="text-gray-500">No image available</p>
                            </div>
                        )}
                    </div>

                    {/* Title and Tags Section */}
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <h1 className="text-4xl font-bold text-green-800 mb-4">
                            {recipe.title || 'Untitled Recipe'}
                        </h1>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {recipe.tags?.map((tag, index) => (
                                <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Description */}
                    <h2
                        className="text-xl font-semibold font-serif mb-2 text-green-800 cursor-pointer flex items-center justify-between"
                        onClick={() => toggleSection('description')}
                    >
                        Description
                        <FontAwesomeIcon
                            icon={openSections['description'] ? faChevronUp : faChevronDown}
                            className={`ml-2 text-green-600 transition-transform duration-300 transform ${openSections['description'] ? 'rotate-180' : ''
                                }`}
                        />
                    </h2>
                    {openSections['description'] && (
                        <p className="mt-4">{recipe.description || 'No description available.'}</p>
                    )}

                    {/* Ingredients */}
                    <h2
                        className="text-xl font-semibold font-serif mb-2 text-green-800 cursor-pointer flex items-center justify-between"
                        onClick={() => toggleSection('ingredients')}
                    >
                        Ingredients
                        <FontAwesomeIcon
                            icon={openSections['ingredients'] ? faChevronUp : faChevronDown}
                            className={`ml-2 text-green-600 transition-transform duration-300 transform ${openSections['ingredients'] ? 'rotate-180' : ''
                                }`}
                        />
                    </h2>
                    {openSections['ingredients'] && (
                        <ul className="list-disc list-inside mt-2">
                            {Object.entries(recipe.ingredients || {}).map(([key, value], index) => (
                                <li key={index}>
                                    {key}: {value}
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* Nutrition */}
                    <h2
                        className="text-xl font-semibold font-serif mb-2 text-green-800 cursor-pointer flex items-center justify-between"
                        onClick={() => toggleSection('nutrition')}
                    >
                        Nutrition
                        <FontAwesomeIcon
                            icon={openSections['nutrition'] ? faChevronUp : faChevronDown}
                            className={`ml-2 text-green-600 transition-transform duration-300 transform ${openSections['nutrition'] ? 'rotate-180' : ''
                                }`}
                        />
                    </h2>
                    {openSections['nutrition'] && (
                        <ul className="list-disc list-inside mt-2">
                            {Object.entries(recipe.nutrition || {}).map(([key, value], index) => (
                                <li key={index}>
                                    {key}: {value}
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* Recipe Instructions */}
                    <h2
                        className="text-xl font-semibold font-serif mb-2 text-green-800 cursor-pointer flex items-center justify-between"
                        onClick={() => toggleSection('instructions')}
                    >
                        Instructions
                        <FontAwesomeIcon
                            icon={openSections['instructions'] ? faChevronUp : faChevronDown}
                            className={`ml-2 text-green-600 transition-transform duration-300 transform ${openSections['instructions'] ? 'rotate-180' : ''
                                }`}
                        />
                    </h2>
                    {openSections['instructions'] && (
                        <p className="mt-4">{recipe.instructions || 'No instructions available.'}</p>
                    )}

                    {/* Footer Information */}
                    <div className="mt-8 bg-white p-6 rounded-xl shadow-xl">
                        <p className="text-sm text-green-600">
                            <strong>Published:</strong> {new Date(recipe.published).toDateString()}
                        </p>
                        <p className="text-sm">
                            <strong className="text-green-600">Prep Time:</strong> {recipe.prep} minutes
                        </p>
                        <p className="text-sm">
                            <strong className="text-green-600">Cook Time:</strong> {recipe.cook} minutes
                        </p>
                        <p className="text-sm">
                            <strong className="text-green-600">Servings:</strong> {recipe.servings}
                        </p>
                        <p className="text-sm">
                            <strong className="text-green-600">Category:</strong> {recipe.category}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
