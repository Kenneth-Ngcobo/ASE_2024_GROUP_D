// Pagination and limiting. This endpoint will not function correctly without limiting 
// the number of items returned. Default to 20 items per page. 


import connectToDatabase from '../../../db.js';


// Example request: http://localhost:3000/api/recipes?page=1&limit=10
/**
 * Fetch a paginated list of recipes from the MongoDB database.
 *
 * This function handles GET requests to retrieve recipes with support for pagination.
 * It connects to the MongoDB database, queries the `recipes` collection, and returns 
 * the requested page of recipes along with pagination information.
 *
 * @param {Request} req - The HTTP request object.
 *
 * @returns {Promise<Response>} A Response object containing the paginated recipe data 
 * in JSON format, including total recipe count and pagination info, or an error message 
 * if a failure occurs.
 */
export async function GET(req) {
  try {
    const db = await connectToDatabase(); // Connect to the database

    if (!db) {
      throw new Error('Failed to get database connection');
    }
    
    const recipesCollection = db.collection('recipes'); // Fetch from the 'recipes' collection

    // Parse query parameters for pagination
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page')) || 1; // Default to page 1
    const limit = Math.min(parseInt(url.searchParams.get('limit')) || 20, 50); // Default to 20, max 50

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Fetch the paginated recipes from the collection
    const recipes = await recipesCollection.find({}).skip(skip).limit(limit).toArray();
    console.log('Recipes fetched successfully:', recipes);

    // Count the total number of recipes for pagination info
    const totalRecipes = await recipesCollection.countDocuments();

    // Return the data as a JSON response, including pagination info
    return new Response(JSON.stringify({
      totalRecipes,
      totalPages: Math.ceil(totalRecipes / limit),
      currentPage: page,
      recipes,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching recipes:', error);

    // Return error response in case of failure
    return new Response(JSON.stringify({ error: 'Failed to fetch recipes' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
