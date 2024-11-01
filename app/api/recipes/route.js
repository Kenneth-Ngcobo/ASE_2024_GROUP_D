import connectToDatabase from "../../../db.js";

export async function GET(req) {
  try {
    const db = await connectToDatabase();
    const recipesCollection = db.collection("recipes");

    // Parse query parameters
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page")) || 1;
    const limit = Math.min(parseInt(url.searchParams.get("limit")) || 50, 50);
    const sort = url.searchParams.get("sort") || "createdAt"; // Default to createdAt
    const order = url.searchParams.get("order")?.toLowerCase() === "desc" ? -1 : 1;
    const searchTerm = url.searchParams.get("search") || "";
    const category = url.searchParams.get("category");
    const tags = url.searchParams.get("tags");
    const ingredients = url.searchParams.get("ingredients");
    const instructions = parseInt(url.searchParams.get("instructions"));

    let query = {};

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

    // Log constructed query
    console.log("Constructed query:", JSON.stringify(query, null, 2));

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
    return new Response(JSON.stringify({ error: 'Failed to fetch recipes' }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
