import connectToDatabase from '@/db.js';

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const db = await connectToDatabase();

    if (!db) {
      throw new Error('Failed to get database connection');
    }

    const recipe = await db.collection('recipes').findOne({ _id: id });

    console.log(recipe)
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
