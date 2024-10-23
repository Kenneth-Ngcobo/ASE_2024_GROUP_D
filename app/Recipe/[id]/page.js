'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchRecipeById } from '../../api';
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

function goBack() {
    window.history.back();
}

export default function RecipeDetail() {
    const params = useParams();
    const { id } = params; // Ensure correct destructuring
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
                }
            } catch (err) {
                console.error('Error fetching recipe:', err); // Log error for debugging
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

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
        </div>
    );
}
