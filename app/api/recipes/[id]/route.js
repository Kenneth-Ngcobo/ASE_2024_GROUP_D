import connectToDatabase from '../../../../db';
import { ObjectId } from 'mongodb';

/**
 * Retrieves a single recipe by its ID from the database.
 * 
 * @async
 * @function GET
 * @param {Request} req - The incoming HTTP request object
 * @param {Object} context - Route context containing recipe ID
 * @param {Object} context.params - Route parameters
 * @param {string} context.params.id - The ID of the recipe to fetch
 * @returns {Response} JSON response containing the recipe data
 * - Success (200): Full recipe object
 * - Error (404): { message: 'Recipe not found' }
 * - Error (500): { 
 *     error: 'Failed to fetch recipe', 
 *     details: string 
 * }
 * 
 * @description
 * - Connects to the database
 * - Retrieves a single recipe using its ObjectId
 * - Returns the complete recipe details
 */
export async function GET(req, { params }) {
  const awaitedParams = await params;
  const { id } = params;

  try {
    const db = await connectToDatabase();

    if (!db) {
      // Throw an error if the database connection is not established
      throw new Error('Failed to get database connection');
    }

    const objectId = new ObjectId(id);

    // Attempt to find a single recipe by its ID in the 'recipes' collection
    const recipe = await db.collection('recipes').findOne({ _id: ObjectId });


    if (!recipe) {
      return new Response(
        JSON.stringify({ message: 'Recipe not found' }),
        { status: 404 }
      );
    }

    // If a recipe is found, return the recipe data as a JSON response
    return new Response(JSON.stringify(recipe), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    // If any error occurs during the process, log the error and return a 500 response
    console.error('Error fetching recipe:', error);

    return new Response(
      JSON.stringify({ error: 'Failed to fetch recipe', details: error.message }),
      { status: 500 }
    );
  }
}
