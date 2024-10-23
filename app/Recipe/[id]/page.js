'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchRecipeById } from '../../api';
import ImageGallery from '@/app/components/ImageGallery'; // Import the new ImageGallery component
import Image from 'next/image'; // Ensure Image is imported correctly
import Loading from '@/app/components/loading'; // Import the loading component

// Function to navigate back to the previous page
function goBack() {
    window.history.back();
}

export default function RecipeDetail() {
    const params = useParams(); // Destructure the URL parameters
    const { id } = params; // Ensure correct destructuring for the recipe ID
    const [recipe, setRecipe] = useState(null); // State for holding the recipe data
    const [loading, setLoading] = useState(true); // State for loading status
    const [error, setError] = useState(null); // State for handling errors

    console.log("id:", id); // Log the recipe ID for debugging

    // Fetch the recipe data when the component mounts
    useEffect(() => {
        if (id) {
            const loadRecipe = async () => {
                try {
                    const data = await fetchRecipeById(id); // Fetch the recipe by ID
                    console.log("Fetched Recipe:", data); // Debug log the fetched data
                    setRecipe(data); // Set the recipe state with fetched data
                } catch (err) {
                    setError(err.message); // Handle errors by setting the error state
                } finally {
                    setLoading(false); // Set loading to false after fetching data
                }
            };

            loadRecipe(); // Call the loadRecipe function
        }
    }, [id]);

    // If the data is still loading, show a loading spinner
    if (loading) return <Loading />;
    
    // If an error occurred, display the error message
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="container mx-auto p-4">
            {/* Back button to navigate to the previous page */}
            <div className="flex justify-center mb-8">
                <button
                    onClick={goBack}
                    className="bg-green-600 hover:bg-green-400 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
                >
                    Back to list ←
                </button>
            </div>

            {/* Check if the recipe exists and render its details */}
            {recipe && (
                <>
                    {/* Render the ImageGallery if there are multiple images */}
                    {recipe?.images?.length > 0 ? (
                        <ImageGallery images={recipe.images} /> // Use the gallery for multiple images
                    ) : (
                        <Image
                            src={recipe.images[0]} // Show the first image if no gallery
                            alt={recipe.title}
                            width={300}
                            height={200}
                            className="object-cover rounded-md"
                        />
                    )}
                    
                    {/* Display recipe title */}
                    <h2 className="text-xl font-semibold font-serif mb-2 text-green-800">{recipe.title}</h2>

                    {/* Display recipe tags */}
                    <h2 className="text-xl font-semibold font-serif mb-2 text-green-800">{recipe.tags}</h2>

                    {/* Display the published date */}
                    <p className="text-sm text-green-600">Published: {new Date(recipe.published).toDateString()}</p>

                    {/* Display prep time */}
                    <p className="text-sm">
                        <strong className="text-green-600">Prep Time:</strong> {recipe.prep} minutes
                    </p>

                    {/* Display cook time */}
                    <p className="text-sm">
                        <strong className="text-green-600">Cook Time:</strong> {recipe.cook} minutes
                    </p>

                    {/* Display servings */}
                    <p className="text-sm">
                        <strong className="text-green-600">Servings:</strong> {recipe.servings}
                    </p>

                    {/* Display category */}
                    <p className="text-sm">
                        <strong className="text-green-600">Category:</strong> {recipe.category}
                    </p>

                    {/* Display the recipe instructions */}
                    <p className="mt-4">{recipe.instructions}</p>
                </>
            )}
        </div>
    );
}
