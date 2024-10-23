// app/lib/getRecipe.js

import { fetchRecipeById } from '../api'; // Adjust the path based on your API file location

export async function getRecipe(id) {
    let recipe = null;
    let error = null;

    try {
        // Fetch recipe data from the API
        recipe = await fetchRecipeById(id);
    } catch (err) {
        console.error('Error fetching recipe:', err);
        error = 'Failed to load recipe data.';
    }

    return { recipe, error };
}
