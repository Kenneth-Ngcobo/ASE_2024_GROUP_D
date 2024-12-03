import connectToDatabase from "../../../../db";

/**
 * Retrieves distinct recipe tags from the database.
 * 
 * @async
 * @function GET
 * @returns {Response} JSON response containing an array of unique recipe tags
 * - Success (200): string[] (list of tags)
 * - Error (500): { error: 'Failed to fetch tags' }
 * 
 * @description
 * - Connects to the database
 * - Fetches unique tags from the recipes collection
 * - Returns an array of distinct tag names
 */
export async function GET() {
  try {
    const db = await connectToDatabase();
    const tags = await db.collection('recipes').distinct('tags');
    console.log("Fetched tags:", tags);
    return new Response(JSON.stringify(tags), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Error fetching tags:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch tags" }), {
      status: 500,
    });
  }
}