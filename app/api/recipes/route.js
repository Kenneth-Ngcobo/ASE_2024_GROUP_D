//Pagenation and limiting, wont function if there is not limmiting to mny items Default 50 items for demonstration: http://localhost:3000/api/recipes?page=1&limit=10

import connectToDatabase from '../../../db.js';

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
    const limit = Math.min(parseInt(url.searchParams.get('limit')) || 20); // Default 20

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Fetch the paginated recipes from the collection
    const recipes = await recipesCollection.find({}).skip(skip).limit(limit).toArray();
    console.log('Recipes fetched successfully:', recipes);

    // Count the total number of recipes for pagination info
    const totalRecipes = await recipesCollection.countDocuments();

    // Return the data as JSON response, including pagination info
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
