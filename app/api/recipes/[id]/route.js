import connectToDatabase from '@/db.js';

export async function GET(req, { params }) {
  const { id } = params;

  try {
<<<<<<< HEAD
  
    {/**connects and destructures the db obj */}
    const  db  = await connectToDatabase();

    /** 
     * Access recipes collection in database 
     * findOne method to find a single document that matches the specified query.
     * uses the ObjectId constructor to convert the 'id' string into a valid MongoDB ObjectId.
     */
    const recipe = await db.collection('recipes').findOne({ _id: id }); 
=======
    const db = await connectToDatabase();

    if (!db) {
      throw new Error('Failed to get database connection');
    }

    const recipe = await db.collection('recipes').findOne({ _id: id });
>>>>>>> e5a4e47a286d80de8eb283fb6f0e9117645c2541

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
