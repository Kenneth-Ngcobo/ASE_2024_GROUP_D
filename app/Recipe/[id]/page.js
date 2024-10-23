// "use client";

// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { fetchRecipeById } from '../api'; // Adjust path as necessary

// const RecipeDetails = () => {
//   const router = useRouter();
//   const query = router.query || {}; // Default to an empty object if query is undefined
//   const { id } = query; // Destructure id from query
//   const [recipe, setRecipe] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const getRecipeDetails = async () => {
//       // Check if id exists before fetching recipe details
//       if (id) {
//         try {
//           const data = await fetchRecipeById; // Fetch recipe details by ID
//           setRecipe(data);
//         } catch (err) {
//           setError(err.message);
//         } finally {
//           setLoading(false);
//         }
//       } else {
//         // If id is not defined, stop loading
//         setLoading(false);
//       }
//     };

//     getRecipeDetails();
//   }, [id]);

//   // Render loading state
//   if (loading) return <div>Loading...</div>;
  
//   // Render error state
//   if (error) return <div className="text-red-500">{error}</div>;

//   // Handle case where recipe is not found
//   if (!recipe) return <div>Recipe not found</div>;

//   // Render recipe details
//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold">{recipe.title}</h1>
//       <p><strong>Published:</strong> {new Date(recipe.published).toDateString()}</p>
//       <p><strong>Prep Time:</strong> {recipe.prep} minutes</p>
//       <p><strong>Cook Time:</strong> {recipe.cook} minutes</p>
//       <p><strong>Servings:</strong> {recipe.servings}</p>
//       <p><strong>Category:</strong> {recipe.category}</p>
//       <p><strong>Description:</strong> {recipe.description}</p>
//     </div>
//   );
// };

// export default RecipeDetails;

'use client'

// RecipeDetail.js
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchRecipeById } from '../../api';

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

    console.log("Recipes:", recipe)
    console.log(id)

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold">{recipe.title}</h1>
            <p className="text-sm text-gray-600">Published: {new Date(recipe.published).toDateString()}</p>
            <p className="text-sm"><strong>Prep Time:</strong> {recipe.prep} minutes</p>
            <p className="text-sm"><strong>Cook Time:</strong> {recipe.cook} minutes</p>
            <p className="text-sm"><strong>Servings:</strong> {recipe.servings}</p>
            <p className="text-sm"><strong>Category:</strong> {recipe.category}</p>
            <p className="mt-4">{recipe.instructions}</p> {/* Example of showing instructions */}
        </div>
    );
}
