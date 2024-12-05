import connectToDatabase from "../../../../db";

/**
 * Retrieves distinct recipe categories from the database.
 * 
 * @async
 * @function GET
 * @param {Request} req - The incoming HTTP request object
 * @returns {Response} JSON response containing an array of unique recipe categories
 * - Success (200): string[] (list of categories)
 * - Error (500): { error: 'Failed to fetch categories' }
 * 
 * @description
 * - Connects to the database
 * - Fetches unique categories from the categories collection
 * - Returns an array of distinct category names
 */
export async function GET(req) {
    try {
        const db = await connectToDatabase();

        {/** fetch categories from the categories collection */ }
        const categories = await db.collection('categories').distinct('categories');

        {/**return a successful response with the categories in JSON format*/ }
        return new Response(JSON.stringify(categories), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        {/**log the error message for debugging*/ }
        console.error('Error fetching categories:', error.message);

        {/**return an error response with status 500*/ }
        return new Response(JSON.stringify({ error: 'Failed to fetch categories' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
