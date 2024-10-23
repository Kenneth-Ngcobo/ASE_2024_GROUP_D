<<<<<<<<< Temporary merge branch 1
'use client'
=========
'use client';
>>>>>>>>> Temporary merge branch 2

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchRecipeById } from '../../api';
<<<<<<<<< Temporary merge branch 1
import Image from 'next/image'; // Ensure Image is imported correctly
import Loading from '@/app/components/loading';
=========
import ImageGallery from '@/app/components/ImageGallery';
import Image from 'next/image';

// Loading component
const Loading = () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
        <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500 mx-auto mb-4"></div>
            <p className="text-lg text-green-700">Loading recipe...</p>
        </div>
    </div>
);

// Go back function
function goBack() {
    window.history.back();
}

export default function RecipeDetail() {
    const params = useParams();
<<<<<<<<< Temporary merge branch 1
    const { id } = params; // Ensure correct destructuring
=========
    const { id } = params;
>>>>>>>>> Temporary merge branch 2
    const [recipe, setRecipe] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const renderTags = (tags) => {
        if (!tags) return null;
        
        if (Array.isArray(tags)) {
            return tags.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    {tag}
                </span>
            ));
        }
        
        if (typeof tags === 'string') {
            return tags.split(',').map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    {tag.trim()}
                </span>
            ));
        }
        
        return null;
    };

    useEffect(() => {
<<<<<<<<< Temporary merge branch 1
        if (id) {
            const loadRecipe = async () => {
                try {
                    const data = await fetchRecipeById(id);
                    console.log("Fetched Recipe:", data); // Debug log the fetched data
                    setRecipe(data); // Set recipe state with fetched data
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
=========
        const loadRecipe = async () => {
            setIsLoading(true);
            try {
                if (id) {
                    const data = await fetchRecipeById(id);
                    setRecipe(data);
>>>>>>>>> Temporary merge branch 2
                }
            } catch (err) {
                console.error('Error fetching recipe:', err); // Log error for debugging
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

<<<<<<<<< Temporary merge branch 1
            loadRecipe();
        }
    }, [id]);

    if (loading) return <Loading />;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-center mb-8">
                <button
                    onClick={goBack}
                    className="bg-green-600 hover:bg-green-400 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
                >
                    Back to list ←
                </button>
            </div>

            {/* Check if recipe exists and render its details */}
            {recipe && (
                <>
                    {/* Check if images array exists and has at least one image */}
                    {recipe?.images?.length > 0 && (
                        <Image
                            src={recipe.images[0]} // Assuming images is an array
                            alt={recipe.title}
                            width={300}
                            height={200}
                            className="object-cover rounded-md"
                        />
                    )}
                    
                    <h2 className="text-xl font-semibold font-serif mb-2 text-green-800">{recipe.title}</h2>
                    <p className="text-sm text-green-600">Published: {new Date(recipe.published).toDateString()}</p>
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
                    <p className="mt-4">{recipe.instructions}</p>
                </>
            )}
=========
        loadRecipe();
    }, [id]);

    if (isLoading) return <Loading />;
    
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <p className="text-red-500 text-lg">Error: {error}</p>
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

    if (!recipe) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <p className="text-gray-700 text-lg">Recipe not found</p>
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
                            {renderTags(recipe.tags)}
                        </div>
                    </div>
                    
                    {/* Description */}
                    <h2 className="text-xl font-semibold font-serif mb-2 text-green-800">Description</h2>
                    <p className="mt-4">{recipe.description || 'No description available.'}</p>

                    {/* Ingredients */}
                    <h2 className="text-xl font-semibold font-serif mb-2 text-green-800">Ingredients:</h2>
                    <ul className="list-disc list-inside">
                        {Object.entries(recipe.ingredients || {}).map(([key, value], index) => (
                            <li key={index}>
                                {key}: {value}
                            </li>
                        ))}
                    </ul>

                    {/* Nutrition */}
                    <h2 className="text-xl font-semibold font-serif mb-2 text-green-800">Nutrition:</h2>
                    <ul className="list-disc list-inside">
                        {Object.entries(recipe.nutrition || {}).map(([key, value], index) => (
                            <li key={index}>
                                {key}: {value}
                            </li>
                        ))}
                    </ul>

                    {/* Published Date */}
                    <p className="text-sm text-green-600">Published: {new Date(recipe.published).toDateString()}</p>

                    {/* Prep Time */}
                    <p className="text-sm">
                        <strong className="text-green-600">Prep Time:</strong> {recipe.prep} minutes
                    </p>

                    {/* Cook Time */}
                    <p className="text-sm">
                        <strong className="text-green-600">Cook Time:</strong> {recipe.cook} minutes
                    </p>

                    {/* Servings */}
                    <p className="text-sm">
                        <strong className="text-green-600">Servings:</strong> {recipe.servings}
                    </p>

                    {/* Category */}
                    <p className="text-sm">
                        <strong className="text-green-600">Category:</strong> {recipe.category}
                    </p>

                    {/* Recipe Instructions */}
                    <h2 className="text-xl font-semibold font-serif mb-2 text-green-800">Instructions</h2>
                    <p className="mt-4">{recipe.instructions || 'No instructions available.'}</p>
                </div>
            </div>
>>>>>>>>> Temporary merge branch 2
        </div>
    );
}
