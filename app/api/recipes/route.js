import connectToDatabase from '../../../db.js';

/**
 * GET handler for fetching paginated and sorted recipes from the database.
 * @param {Request} req - The incoming HTTP request.
 * @returns {Response} - JSON response containing paginated recipes and metadata.
 */
export async function GET(req) {
  try {
    // Connect to the database and get the recipes collection
    const db = await connectToDatabase();
    const recipesCollection = db.collection('recipes');

    // Use req.nextUrl to parse query parameters
    const { searchParams } = req.nextUrl;

    const url = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = Math.min(parseInt(searchParams.get("limit")) || 50, 50);
    const sort = searchParams.get("sort") || "default";
    const order = searchParams.get("order")?.toLowerCase() === "desc" ? -1 : 1;
    const searchTerm = searchParams.get("search") || "";
    const category = searchParams.get("category");
    const tags = searchParams.get("tags");
    const ingredients = searchParams.get("ingredients");
    const instructions = parseInt(searchParams.get("instructions"));

    let query = {};
    let sortObj = {};

    // Validate sort parameter
    switch (sort) {
      case "published":
        sortObj = { createdAt: -1 }; // Always sort newest first for published date
        break;
      case "prep":
        sortObj = { preparationTime: order };
        break;
      case "cook":
        sortObj = { cookingTime: order };
        break;
      case "instructionsCount":
        sortObj = { "instructions": order };
        break;
      default:
        sortObj = { createdAt: -1 }; // Default sorting is newest first
        break;
    }

    // Construct query for text search
    if (searchTerm) {
      query.$text = { $search: searchTerm };
    }

    if (category) {
      query.category = {
        $regex: new RegExp(`^${category}$`, "i"),
      };
    }

    if (tags) {
      const tagArray = tags.split(",").map((tag) => tag.trim().toLowerCase());
      query.tags = {
        $elemMatch: { $in: tagArray.map((tag) => new RegExp(`^${tag}$`, "i")) },
      };
    }

    // Filter by ingredients (object structure)
    if (ingredients) {
      const ingredientArray = ingredients.split(",").map((ingredient) => ingredient.trim().toLowerCase());

      // Create a filter for each ingredient key, allowing case-insensitive matching
      query.$and = ingredientArray.map((ingredient) => ({
        [`ingredients.${ingredient}`]: { $exists: true },
      }));
    }

    // Filter by number of instructions
    if (!isNaN(instructions)) {
      query.instructions = { $size: instructions }; // Match recipes with exactly the specified number of instructions
    }

    const skip = (page - 1) * limit;

    // Fetch sorted and paginated recipes
    const recipes = await recipesCollection
      .find(query) // Use the constructed query
      .sort(sortObj)
      .skip(skip)
      .limit(limit)
      .toArray();

    // Count total number of matching documents for pagination
    const totalRecipes = await recipesCollection.countDocuments(query); // Count with query to match filters

    return new Response(
      JSON.stringify({
        totalRecipes,
        totalPages: Math.ceil(totalRecipes / limit),
        currentPage: page,
        category: category || "all",
        appliedTags: tags ? tags.split(',').map(tag => tag.trim()) : [],
        appliedIngredients: ingredients ? ingredients.split(",").map((ingredient) => ingredient.trim()) : [],
        appliedInstructions: instructions,
        sortedBy: sort,
        sortOrder: order === 1 ? "asc" : "desc",
        recipes,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return new Response(JSON.stringify({
      error: 'Failed to fetch recipes',
      details: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
