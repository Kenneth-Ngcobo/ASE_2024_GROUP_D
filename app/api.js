// Base URL for the API requests related to recipes
const API_BASE_URL = process.env.API_BASE_URL;

/**
 * Fetches a paginated list of recipes from the API.
 *
 * @param {number} limit - The maximum number of recipes to fetch (default is 20).
 * @param {number} [page] - The current page number (optional).
 * @returns {Promise<Object>} - Returns a promise that resolves with the recipe data, or throws an error if the request fails.
 */
export async function fetchRecipes(limit = 100000000000000000000000, page,search, tags, category) {
    // Construct query string with limit and page parameters
    const query = new URLSearchParams({
        limit, // Set the limit of items per page
        ...(page && { page }), // Conditionally add 'page' to the query if it's provided
        ...(search && {search}),
        ...(tags && { tags }), // Conditionally add 'tags' to the query if it
        ...(category && { category }), // Conditionally add 'category' to the query if it's provided
    }).toString();

    try {
        // Make a GET request to the API with the constructed query string
        console.log(`!!!!!!!!!!!!!!${API_BASE_URL}/api/recipes?${query}!!!!!!!!!!!!!!!!!!!!!`)
        const response = await fetch(`${API_BASE_URL}/api/recipes?${query}`);

        // Check if the response is successful (HTTP status code 200-299)
        if (!response.ok) {
            throw new Error('Failed to fetch recipes'); // Throw an error if the response status is not ok
        }

        // Parse the response data as JSON
        const data = await response.json();
        return data; // Return the fetched recipe data

    } catch (error) {
        return error; // Return the error if the request fails
    }
}

/**
 * Fetches a specific recipe by its ID from the API.
 *
 * @param {string} id - The unique ID of the recipe to fetch.
 * @returns {Promise<Object>} - Returns a promise that resolves with the recipe data for the given ID, or throws an error if the request fails.
 */
export async function fetchRecipeById(id) {
    try {
        // Make a GET request to the API to fetch a specific recipe by its ID
        const response = await fetch(`${API_BASE_URL}/api/recipes/${id}`);

        // Check if the response is successful
        if (!response.ok) {
            throw new Error('Failed to fetch recipe'); // Throw an error if the response is not ok
        }

        // Parse the response data as JSON
        const data = await response.json();
        return data; // Return the fetched recipe data

    } catch (error) {
        throw error; // Throw the error if the request fails
    }
}
