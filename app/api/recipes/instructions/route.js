

import connectToDatabase from "../../../../db";

export async function GET(request) {
  try {
    const db = await connectToDatabase();
    
    const url = new URL(request.url);
    const chunk = parseInt(url.searchParams.get('chunk') || '0');
    const chunkSize = 100;

    // Get a specific chunk of recipes
    const recipes = await db.collection('recipes')
      .find({})
      .skip(chunk * chunkSize)
      .limit(chunkSize)
      .toArray();

    // Extract unique instructions from this chunk
    const uniqueInstructions = new Set();
    recipes.forEach(recipe => {
      if (Array.isArray(recipe.instructions)) {
        recipe.instructions.forEach(instruction => {
          if (instruction) uniqueInstructions.add(instruction);
        });
      } else if (recipe.instructions) {
        uniqueInstructions.add(recipe.instructions);
      }
    });

    // Convert to array
    const instructionsArray = Array.from(uniqueInstructions);

    // Get total count of recipes for pagination info
    const totalRecipes = await db.collection('recipes').countDocuments();
    const totalChunks = Math.ceil(totalRecipes / chunkSize);

    return new Response(
      JSON.stringify({
        success: true,
        chunk,
        totalChunks,
        hasMore: chunk < totalChunks - 1,
        instructions: instructionsArray
      }), 
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error("Detailed error in GET route:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    });

    return new Response(
      JSON.stringify({ 
        error: "Failed to fetch instructions",
        details: error.message,
        type: error.name
      }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}