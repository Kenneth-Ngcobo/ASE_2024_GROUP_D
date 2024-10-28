import connectToDatabase from "../../../../db";

/**
 * Handles GET requests to fetch recipes filtered by category.
 * @param {Request} req - The HTTP request.
 * @returns {Promise<Response} A response object containing the filtered recipes.
 * in JSON format if found, or an error message if not found.
 */
export async function GET(req) {
    {/**extracts search params from request url*/}
    const {searchParams} = new URL(req.url);
    {/**gets value of categories from search params */}
    const category = searchParams.get('categories');

    {/**checks if param is provided*/}
    if(!category) {
        return new Response(JSON.stringify({message: 'category is required'}), {status: 400});
    }
    
    try {
        const db = await connectToDatabase();
        {/**queries recipe collection to find recipes matching provided category */}
        const recipes = await db.collection('recipes').find({ category }).toArray();
    
        {/**return fetched recipes as JSON*/}
        return new Response(JSON.stringify(recipes), { status: 200, headers: { 'Content-Type': 'application/json' } });
      } catch (error) {
        {/**returns 500 Internal server error response */}
        return new Response(JSON.stringify({ error: 'Failed to fetch recipes' }), { status: 500 });
      }
}