import connectToDatabase from '../../../db.js';

/**
 * GET handler for fetching paginated and sorted recipes from the database.
 * @param {Request} req - The incoming HTTP request.
 * @returns {Response} - JSON response containing paginated recipes and metadata.
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

    // Prioritize exact title search
    if (exactTitle) {
      const recipe = await recipesCollection.findOne({ title: exactTitle });
      if (recipe) {
        return new Response(
          JSON.stringify({
            totalRecipes: 1,
            recipes: [recipe],
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );
      } else {
        // Return empty if no exact match is found
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
      matchStage.$text = { $search: searchTerm };
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

    if (Object.keys(matchStage).length > 0) {
      pipeline.push({ $match: matchStage });
    }

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

    pipeline.push({ $skip: (page - 1) * limit });
    pipeline.push({ $limit: limit });

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
