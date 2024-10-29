import connectToDatabase from '../../../db.js'; // Adjust the path based on your file structure

export async function GET(req) {
  try {
    const db = await connectToDatabase(); // Connect to the database
    const recipesCollection = db.collection('recipes'); // Fetch from the 'recipes' collection

    // Parse query parameters for pagination and search
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page')) || 1; // Default to page 1
    const limit = Math.min(parseInt(url.searchParams.get('limit')) || 50, 50); // Default to 50, max 50
    const searchTerm = url.searchParams.get('search') || ''; // Get the search term from query

    // Construct the query for text search
    const query = searchTerm ? { $text: { $search: searchTerm } } : {}; // Full-text search if there's a search term

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Fetch the paginated recipes from the collection with the search query
    const recipes = await recipesCollection.find(query).skip(skip).limit(limit).toArray();
    console.log('Recipes fetched successfully:', recipes);

    // Count the total number of recipes for pagination info, applying the same search query
    const totalRecipes = await recipesCollection.countDocuments(query);

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