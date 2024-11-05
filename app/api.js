import { SORT_OPTIONS, SORT_ORDERS } from "./components/sortUtils";

// Base URL for the API requests related to recipes
const API_BASE_URL = process.env.API_BASE_URL;

/**
 * Fetches a paginated list of recipes from the API.
 *
 * @param {number} limit - The maximum number of recipes to fetch (default is 20).
 * @param {number} [page] - The current page number (optional).
 * @returns {Promise<Object>} - Returns a promise that resolves with the recipe data, or throws an error if the request fails.
 */
export const fetchRecipes = async (options = {}) => {
    const {
        limit = 20,
        page = 1,
        sortBy = SORT_OPTIONS.DEFAULT,
        sortOrder = SORT_ORDERS.ASC,
        search = ''
    } = options;

    const query = new URLSearchParams({
        limit: String(limit),
        page: String(page),
        sortBy,
        sortOrder,
        ...(search && { search })
    }).toString();

    try {
        const response = await fetch(`${process.env.API_BASE_URL}/api/recipes?${query}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Apply client-side sorting if needed
        if (sortBy !== SORT_OPTIONS.DEFAULT) {
            data.recipes = sortRecipes(data.recipes, sortBy, sortOrder);
        }

        return {
            recipes: data.recipes,
            currentPage: data.currentPage,
            totalPages: data.totalPages,
            error: null
        };
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return {
            recipes: [],
            currentPage: 1,
            totalPages: 1,
            error: error.message
        };
    }
};

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
