import connectToDatabase from "../../../../db";

/**
 * Retrieves unique ingredients from all recipes in the database.
 * 
 * @async
 * @function GET
 * @returns {Response} JSON response containing an array of unique ingredient names
 * - Success (200): string[] (list of ingredient names)
 * - Error (500): { error: 'Failed to fetch ingredients' }
 * 
 * @description
 * - Uses aggregation pipeline to extract unique ingredient names
 * - Converts ingredients object to array
 * - Groups and extracts unique ingredient names
 */
export async function GET() {
  try {
    const db = await connectToDatabase();


    const ingredients = await db.collection('recipes').aggregate([
      { $project: { ingredients: { $objectToArray: "$ingredients" } } }, // Convert the ingredients object to an array of key-value pairs
      { $unwind: "$ingredients" }, // Deconstruct the array of key-value pairs
      { $group: { _id: "$ingredients.k" } }, // Group by the ingredient name (the key)
      { $project: { _id: 0, name: "$_id" } } // Project to include only the name field
    ]).toArray();

    // Extract names from the aggregation result
    const ingredientNames = ingredients.map(ingredient => ingredient.name);

    console.log("Fetched ingredients:", ingredientNames);
    return new Response(JSON.stringify(ingredientNames), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    return new Response(JSON.stringify({ error: 'Failed to fetch ingredients' }), { status: 500 });
  }
}
