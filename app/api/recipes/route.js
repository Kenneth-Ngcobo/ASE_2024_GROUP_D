import connectToDatabase from "../../../db.js";

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
    const page = parseInt(url.searchParams.get("page")) || 1;
    const limit = Math.min(parseInt(url.searchParams.get("limit")) || 50, 50);
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
    // Log incoming tags
    console.log("Incoming tags:", tags);

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
          [`ingredients.${ingredient}`]: { $exists: true }
        }));
      }

 
    // Filter by number of instructions
    if (!isNaN(instructions)) {
      query.instructions = { $size: instructions };
    }
    // Log constructed query
    console.log("Constructed query:", JSON.stringify(query, null, 2));

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

    return new Response(
      JSON.stringify({
        totalRecipes,
        totalPages: Math.ceil(totalRecipes / limit),
        currentPage: page,
        category: category || "all",
        appliedTags: tags ? tags.split(',').map(tag => tag.trim()) : [],
        appliedIngredients: ingredients ? ingredients.split(",").map((ingredient) => ingredient.trim()) : [],
        appliedInstructions: instructions,
        recipes,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
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
      headers: { "Content-Type": "application/json" },
    });
  }
}
