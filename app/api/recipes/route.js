import connectToDatabase from '../../../db.js';

export async function GET(req) {
  try {
    const db = await connectToDatabase();
    const recipesCollection = db.collection('recipes');

    // Parse query parameters
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page')) || 1;
    const limit = Math.min(parseInt(url.searchParams.get('limit')) || 50, 50);
    const sort = url.searchParams.get('sort') || 'published'; // Changed default to createdAt
    const order = url.searchParams.get('order')?.toLowerCase() === 'desc' ? -1 : 1;

    // Validate sort parameter
    const validSortFields = {
      'cookTime': 'cookingTime',
      'prepTime': 'preparationTime',
      'instructions': 'instructions',
      'createdAt': 'createdAt'  // Added creation date sorting
    };

    // Check if the sort field is valid
    if (!validSortFields[sort]) {
      return new Response(
        JSON.stringify({
          error: 'Invalid sort parameter. Valid options are: cookTime, prepTime, instructions, createdAt'
        }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }
      );
    }

    const skip = (page - 1) * limit;

    // Create sort object for MongoDB query
    const sortObj = {};
    sortObj[validSortFields[sort]] = order;

    // Fetch sorted and paginated recipes
    const recipes = await recipesCollection
      .find({})
      .sort(sortObj)
      .skip(skip)
      .limit(limit)
      .toArray();

    const totalRecipes = await recipesCollection.countDocuments();

    // Return response with pagination and sorting info
    return new Response(JSON.stringify({
      totalRecipes,
      totalPages: Math.ceil(totalRecipes / limit),
      currentPage: page,
      sortedBy: sort,
      sortOrder: order === 1 ? 'asc' : 'desc',
      recipes,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error fetching recipes:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch recipes' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}