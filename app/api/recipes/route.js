import connectToDatabase from '../../../db.js';

/**
 * Retrieves paginated and filtered recipes from the database.
 * 
 * @async
 * @function GET
 * @param {Request} req - The incoming HTTP request object
 * @returns {Response} JSON response with paginated recipes and metadata
 * - Success (200): {
 *     totalRecipes: number,
 *     totalPages: number,
 *     currentPage: number,
 *     recipes: Recipe[]
 * }
 * - Error (500): { 
 *     error: 'Failed to fetch recipes', 
 *     details: string 
 * }
 * 
 * @description
 * - Supports multiple filtering options:
 *   - Search term
 *   - Category
 *   - Tags
 *   - Ingredients
 *   - Number of instructions
 * - Supports pagination (page and limit)
 * - Supports sorting by various fields
 * - Provides exact title search
 * - Uses MongoDB aggregation pipeline for complex querying
 * 
 * @query-params
 * - page: number (default: 1)
 * - limit: number (default: 50, max: 50)
 * - sort: string (field to sort by)
 * - order: 'asc' | 'desc'
 * - search: string (text search)
 * - exactTitle: string (exact title match)
 * - category: string
 * - tags: string (comma-separated)
 * - ingredients: string (comma-separated)
 * - instructions: number (exact number of instructions)
 */
export async function GET(req) {
  try {
    const db = await connectToDatabase();
    const recipesCollection = db.collection('recipes');

    const url = new URL(req.url);
    const searchParams = url.searchParams;
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = Math.min(parseInt(searchParams.get("limit")) || 50, 50);
    const sort = searchParams.get("sort") || "";
    const order = searchParams.get("order")?.toLowerCase() === "desc" ? -1 : 1;
    const searchTerm = searchParams.get("search") || "";
    const exactTitle = searchParams.get("exactTitle");
    const category = searchParams.get("category");
    const tags = searchParams.get("tags");
    const ingredients = searchParams.get("ingredients");
    const instructions = parseInt(searchParams.get("instructions"));

    const pipeline = [];
    const matchStage = {};

    // Exact Title Match Logic for Multiple Matches
if (exactTitle) {
  const recipes = await recipesCollection.find({ title: exactTitle }).toArray();
  if (recipes.length > 0) {
    return new Response(
      JSON.stringify({
        totalRecipes: recipes.length,
        recipes: recipes,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } else {
    return new Response(
      JSON.stringify({
        totalRecipes: 0,
        recipes: [],
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

    // Fallback to text-based and other filters
    if (searchTerm) {
      matchStage.title = { $regex: searchTerm, $options: "i" }; // Partial match with regex
    }

    if (category) {
      matchStage.category = {
        $regex: new RegExp(`^${category}$`, "i"),
      };
    }

    if (tags) {
      const tagArray = tags.split(",").map((tag) => tag.trim().toLowerCase());
      matchStage.tags = {
        $elemMatch: { $in: tagArray.map((tag) => new RegExp(`^${tag}$`, "i")) },
      };
    }

    if (ingredients) {
      const ingredientArray = ingredients.split(",").map((ingredient) => ingredient.trim().toLowerCase());
      matchStage.$and = ingredientArray.map((ingredient) => ({
        [`ingredients.${ingredient}`]: { $exists: true },
      }));
    }

    if (!isNaN(instructions)) {
      matchStage.instructions = { $size: instructions };
    }

    // Add the $match stage if there are any conditions
    if (Object.keys(matchStage).length > 0) {
      pipeline.push({ $match: matchStage });
    }

    // Sorting Logic
    if (sort === "instructions") {
      pipeline.push({
        $addFields: {
          instructionsLength: { $size: "$instructions" },
        },
      });

      pipeline.push({
        $sort: { instructionsLength: order },
      });
    } else if (sort) {
      pipeline.push({
        $sort: { [sort]: order },
      });
    }

    // Pagination
    pipeline.push({ $skip: (page - 1) * limit });
    pipeline.push({ $limit: limit });

    // Execute the Aggregation Pipeline
    const recipes = await recipesCollection.aggregate(pipeline).toArray();
    const totalRecipes = await recipesCollection.countDocuments(matchStage);

    return new Response(
      JSON.stringify({
        totalRecipes,
        totalPages: Math.ceil(totalRecipes / limit),
        currentPage: page,
        recipes,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to fetch recipes",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
