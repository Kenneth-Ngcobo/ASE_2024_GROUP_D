'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchRecipeById } from '../../api';
import Image from 'next/image';
import Loading from '@/app/components/loading';

// Function to navigate back to the previous page
function goBack() {
    window.history.back(); // Uses browser's history to go back
}

export default function RecipeDetail() {
    // Get the URL parameters (such as the recipe ID)
    const params = useParams();
    // Destructure 'id' from params for easy access
    const { id } = params;
    // State to store the fetched recipe data
    const [recipe, setRecipe] = useState(null);
    // State to handle the loading state
    const [loading, setLoading] = useState(true);
    // State to store any errors
    const [error, setError] = useState(null);

    console.log("id:", id); // Log the ID for debugging purposes

    // Effect hook to fetch recipe data based on the recipe ID when the component is mounted or when the ID changes
    useEffect(() => {
        if (id) {
            const loadRecipe = async () => {
                try {
                    const data = await fetchRecipeById(id); // Fetch recipe by ID
                    console.log("Fetched Recipe:", data); // Debug log to see fetched data
                    setRecipe(data); // Update recipe state with fetched data
                } catch (err) {
                    setError(err.message); // Set error state if fetching fails
                } finally {
                    setLoading(false); // Turn off the loading state once data is fetched or an error occurs
                }
            };

            loadRecipe(); // Call the function to fetch the recipe
        }
    }, [id]); // Only run this effect when 'id' changes

    // Show loading spinner if data is still being fetched
    if (loading) return <Loading />;

    // Show error message if an error occurred
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="container mx-auto p-4">
            {/* Button to go back to the previous page */}
            <div className="flex justify-center mb-8">
                <button
                    onClick={goBack}
                    className="bg-green-600 hover:bg-green-400 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
                >
                    Back to list ←
                </button>
            </div>

            {/* Render recipe details if the recipe data has been successfully fetched */}
            {recipe && (
                <>
                    {/* Render the first image if there are any images in the recipe */}
                    {recipe?.images?.length > 0 && (
                        <Image
                            src={recipe.images[0]} // Display the first image in the array
                            alt={recipe.title} // Use the recipe title as the image alt text
                            width={300}
                            height={200}
                            className="object-cover rounded-md" // Ensure image is well-styled
                        />
                    )}

                    {/* Display the recipe details */}
                    <h2 className="text-xl font-semibold font-serif mb-2 text-green-800">{recipe.title}</h2>
                    <p className="text-sm text-green-600">
                        Published: {new Date(recipe.published).toDateString()} {/* Convert published date to a readable string */}
                    </p>
                    <p className="text-sm">
                        <strong className="text-green-600">Prep Time:</strong> {recipe.prep} minutes {/* Show prep time */}
                    </p>
                    <p className="text-sm">
                        <strong className="text-green-600">Cook Time:</strong> {recipe.cook} minutes {/* Show cook time */}
                    </p>
                    <p className="text-sm">
                        <strong className="text-green-600">Servings:</strong> {recipe.servings} {/* Show servings */}
                    </p>
                    <p className="text-sm">
                        <strong className="text-green-600">Category:</strong> {recipe.category} {/* Show recipe category */}
                    </p>
                    <p className="mt-4">
                        {recipe.instructions} {/* Render recipe instructions */}
                    </p>
                </>
            )}
        </div>
    );
}
