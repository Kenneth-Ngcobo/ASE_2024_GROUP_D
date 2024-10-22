

'use client'

// RecipeDetail.js
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchRecipeById } from '../../api';
import Loading from '@/app/components/loading';

function goBack() {
    window.history.back();
}

export default function RecipeDetail() {
    const params = useParams();
    const {id} = params
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log("id:", id);

    useEffect(() => {
        // const { id } = router.query; // Safely extract the id here

        if (id) {
            const loadRecipe = async () => {
                try {
                    const data = await fetchRecipeById(id);
                    setRecipe(data);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };

            loadRecipe();
        }
    }, [id]); // Add router.query as a dependency to ensure it updates when it changes

    console.log("Recipes:", recipe)
    console.log(id)

    if (loading) return <Loading/>
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
            <h2 className="text-xl font-semibold font-serif mb-2 text-green-800">{recipe.title}</h2>
            <p className="text-sm text-green-600">Published: {new Date(recipe.published).toDateString()}</p>
            <p className="text-sm"><strong className='text-green-600'>Prep Time:</strong> {recipe.prep} minutes</p>
            <p className="text-sm"><strong className='text-green-600'> Cook Time:</strong> {recipe.cook} minutes</p>
            <p className="text-sm"><strong className='text-green-600'>Servings:</strong> {recipe.servings}</p>
            <p className="text-sm"><strong className='text-green-600'>Category:</strong> {recipe.category}</p>
            <p className="mt-4">{recipe.instructions}</p> {/* Example of showing instructions */}
        </div>
    );
}
