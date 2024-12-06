import connectToDatabase from '../../../../db';

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
 */
export async function GET(req, { params }) {
  const { id } = params;

  try {
    const db = await connectToDatabase();

    if (!db) {
      throw new Error('Failed to get database connection');
    }

    // Attempt to find a single recipe by its ID
    const recipe = await db.collection('recipes').findOne({ _id: id });

    if (!recipe) {
      return new Response(
        JSON.stringify({ message: 'Recipe not found' }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(recipe), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Error fetching recipe:', error);

    return new Response(
      JSON.stringify({ error: 'Failed to fetch recipe', details: error.message }),
      { status: 500 }
    );
  }
}
