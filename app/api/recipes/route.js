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
    const sort = searchParams.get("sort") || "createdAt"; // Default to createdAt
    const order = searchParams.get("order")?.toLowerCase() === "desc" ? -1 : 1;
    const searchTerm = searchParams.get("search") || "";
    const category = searchParams.get("category");
    const tags = searchParams.get("tags");
    const ingredients = searchParams.get("ingredients");
    const instructions = parseInt(searchParams.get("instructions"));

    // Define valid sorting fields based on database structure
    const validSortFields = {
      'cookingtime': 'cook',            // Maps 'cookingtime' to 'cook' field
      'preparationtime': 'prep',        // Maps 'preparationtime' to 'prep' field
      'published': 'published',         // Maps 'published' to 'published' field
      'instructionscount': 'instructionsCount' // Maps 'instructionscount' to computed field 'instructionsCount'
    };

    const sortLower = sort.toLowerCase();

    // Validate sort field
    if (!validSortFields[sortLower]) {
      return new Response(
        JSON.stringify({
          error: `Invalid sort parameter '${sort}'. Valid options are: cookingTime, preparationTime, published, calories, title, instructionsCount`
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

    const skip = (page - 1) * limit;
    const sortObj = { [validSortFields[sortLower]]: order };

    // MongoDB aggregation pipeline
    let pipeline = [
      {
        $addFields: {
          numericPrep: { $toInt: "$prep" },
          numericCook: { $toInt: "$cook" },
          numericCalories: { $toDouble: "$nutrition.calories" },
          instructionsCount: { $size: "$instructions" }
        }
      }
    ];

    if (sortLower === 'instructionscount') {
      pipeline.push({ $sort: { instructionsCount: order } });
    } else {
      pipeline.push({ $sort: sortObj });
    }

    pipeline.push(
      { $skip: skip },
      { $limit: limit }
    );

    const recipes = await recipesCollection.aggregate(pipeline).toArray();
    const totalRecipes = await recipesCollection.countDocuments();

    console.log('Sorting Debug:', {
      requestedSort: sort,
      sortField: validSortFields[sortLower],
      order: order,
      firstThreeValues: recipes.slice(0, 3).map(r => ({
        value: sortLower === 'instructionscount'
          ? r.instructionsCount
          : r[validSortFields[sortLower]],
        title: r.title,
        instructionsCount: r.instructionsCount
      }))
    });

    // Return successful response with paginated data
    return new Response(JSON.stringify({
      totalRecipes,
      totalPages: Math.ceil(totalRecipes / limit),
      currentPage: page,
      sortedBy: sort,
      sortOrder: order === 1 ? 'asc' : 'desc',
      sortQuery: sortObj,
      recipes,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

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
