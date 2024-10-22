'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchRecipeById } from '../../api';
import Link from 'next/link'; // For navigation
import Image from 'next/image'; // For optimized image rendering

export default function RecipeDetail() {
    const params = useParams();
    const { id } = params; // Extract the recipe ID from URL parameters
    const [recipe, setRecipe] = useState(null); // State for recipe details
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        if (id) {
            const loadRecipe = async () => {
                try {
                    const data = await fetchRecipeById(id); // Fetch the recipe by ID
                    console.log("Fetched Recipe Data:", data); // Log fetched data
                    setRecipe(data); // Set the recipe state
                } catch (err) {
                    setError(err.message); // Set error message if fetching fails
                } finally {
                    setLoading(false); // Stop loading
                }
            };

            loadRecipe(); // Call function to load recipe
        }
    }, [id]); // Dependency array includes id to re-fetch when it changes

    // Render loading state
    if (loading) return <div>Loading...</div>;
    // Render error state
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <Link href="/" className="text-blue-500 mb-4 inline-block">
                &#8592; Back to Home {/* Back button */}
            </Link>
            
            {recipe?.images && recipe.images.length > 0 && ( // Check if images array exists and has at least one image
                <Image
                    src={recipe.images[0]} // Assuming images is an array
                    alt={recipe.title}
                    width={300}
                    height={200}
                    className='object-cover rounded-md'
                />
            )}

            <h1 className="text-3xl font-bold">{recipe.title}</h1>
            <p className="text-sm text-gray-600">Published: {new Date(recipe.published).toDateString()}</p>
            <p className="text-sm"><strong>Prep Time:</strong> {recipe.prep} minutes</p>
            <p className="text-sm"><strong>Cook Time:</strong> {recipe.cook} minutes</p>
            <p className="text-sm"><strong>Servings:</strong> {recipe.servings}</p>
            <p className="text-sm"><strong>Category:</strong> {recipe.category}</p>
            <p className="mt-4">{recipe.instructions}</p> {/* Instructions */}
        </div>
    );
}
