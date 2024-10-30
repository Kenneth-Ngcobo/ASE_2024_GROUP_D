import connectToDatabase from '../../../db.js';

export async function GET(req) {
  try {
    const db = await connectToDatabase();
    const recipesCollection = db.collection('recipes');

    // Parse query parameters
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page')) || 1;
    const limit = Math.min(parseInt(url.searchParams.get('limit')) || 50, 50);
    const sort = url.searchParams.get('sort') || 'published';
    const order = url.searchParams.get('order')?.toLowerCase() === 'desc' ? -1 : 1;

    // Updated to match actual database field names and added instructionsCount
    const validSortFields = {
      'cookingtime': 'cook',        
      'preparationtime': 'prep',    
      'published': 'published',     
      'calories': 'nutrition.calories',  
      'title': 'title',
      'instructionscount': 'instructionsCount'  // Added in lowercase
    };

    // Convert sort parameter to lowercase for case-insensitive comparison
    const sortLower = sort.toLowerCase();
    
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

    const skip = (page - 1) * limit;

    // Create sort object for MongoDB query
    const sortObj = { [validSortFields[sortLower]]: order };

    // Updated pipeline to include instructions count
    let pipeline = [
      {
        $addFields: {
          // Convert string numbers to actual numbers for sorting
          numericPrep: { $toInt: "$prep" },
          numericCook: { $toInt: "$cook" },
          numericCalories: { $toDouble: "$nutrition.calories" },
          // Add instructions count field
          instructionsCount: { $size: "$instructions" }
        }
      }
    ];

    // If sorting by instructions count, use the computed field
    if (sortLower === 'instructionscount') {
      pipeline.push({ $sort: { instructionsCount: order } });
    } else {
      pipeline.push({ $sort: sortObj });
    }

    // Add pagination after sorting
    pipeline.push(
      { $skip: skip },
      { $limit: limit }
    );

    // Fetch sorted and paginated recipes
    const recipes = await recipesCollection
      .aggregate(pipeline)
      .toArray();

    const totalRecipes = await recipesCollection.countDocuments();

    // Debug log to verify sorting
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