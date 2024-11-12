// Base URL for the API requests related to recipes
const API_BASE_URL = process.env.API_BASE_URL;

if (!API_BASE_URL) {
    console.error("API_BASE_URL is not defined. Check your environment variables.");
}

/**
 * Fetches a paginated list of recipes from the API.
 */
export async function fetchRecipes(limit = 20, page, search, tags, category, ingredients, instructions) {
    const query = new URLSearchParams({
        limit,
        ...(page && { page }),
        ...(search && { search }),
        ...(tags && { tags }),
        ...(category && { category }),
        ...(ingredients && { ingredients }),
        ...(instructions && { instructions }),
    }).toString();

    try {
        const response = await fetch(`${API_BASE_URL}/api/recipes?${query}`);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Failed to fetch recipes. Status: ${response.status}. Message: ${errorText}`);
            throw new Error(`Failed to fetch recipes: ${errorText}`);
        }

        return await response.json();

    } catch (error) {
        console.error("Error in fetchRecipes:", error);
        throw error;
    }
}

/**
 * Fetches a specific recipe by its ID from the API.
 */
export async function fetchRecipeById(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/recipes/${id}`);

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Failed to fetch recipe with ID ${id}. Status: ${response.status}. Message: ${errorText}`);
            throw new Error(`Failed to fetch recipe: ${errorText}`);
        }

        return await response.json();

    } catch (error) {
        console.error("Error in fetchRecipeById:", error);
        throw error;
    }
}

/**
 * Fetches all reviews for a specific recipe.
 */
export async function fetchReviewsForRecipe(recipeId, sortOptions = { sortBy: 'createdAt', order: 'desc' }) {
    const query = new URLSearchParams({
        sortBy: sortOptions.sortBy,
        order: sortOptions.order,
    }).toString();

    try {
        const response = await fetch(`${API_BASE_URL}/api/recipes/${recipeId}/reviews?${query}`);

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Failed to fetch reviews for recipe ${recipeId}. Status: ${response.status}. Message: ${errorText}`);
            throw new Error(`Failed to fetch reviews: ${errorText}`);
        }

        return await response.json();

    } catch (error) {
        console.error("Error in fetchReviewsForRecipe:", error);
        throw error;
    }
}

/**
 * Creates a new review for a specific recipe.
 */
export async function createReview(recipeId, reviewData) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/recipes/${recipeId}/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reviewData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Failed to create review for recipe ${recipeId}. Status: ${response.status}. Message: ${errorText}`);
            throw new Error(`Failed to create review: ${errorText}`);
        }

        return await response.json();

    } catch (error) {
        console.error("Error in createReview:", error);
        throw error;
    }
}

/**
 * Updates an existing review for a specific recipe.
 */
export async function updateReview(recipeId, reviewId, updateData) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/recipes/${recipeId}/reviews/${reviewId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Failed to update review for recipe ${recipeId}. Status: ${response.status}. Message: ${errorText}`);
            throw new Error(`Failed to update review: ${errorText}`);
        }

        return await response.json();

    } catch (error) {
        console.error("Error in updateReview:", error);
        throw error;
    }
}

/**
 * Deletes a review for a specific recipe.
 */
export async function deleteReview(recipeId, reviewId) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/recipes/${recipeId}/reviews/${reviewId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Failed to delete review for recipe ${recipeId}. Status: ${response.status}. Message: ${errorText}`);
            throw new Error(`Failed to delete review: ${errorText}`);
        }

        return;

    } catch (error) {
        console.error("Error in deleteReview:", error);
        throw error;
    }
}
