import connectToDatabase from '@/db';
import { ObjectId } from 'mongodb';

export async function GET(req, { params }) {
    {/**extracts id param from req param */}
  const { id } = params;

  try {
  
    {/**connects and destructures the db obj */}
    const  db  = await connectToDatabase();

    /** 
     * Access recipes collection in database 
     * findOne method to find a single document that matches the specified query.
     * uses the ObjectId constructor to convert the 'id' string into a valid MongoDB ObjectId.
     */
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
    return new Response(
      JSON.stringify({ error: 'Failed to fetch recipe' }),
      { status: 500 }
    );
  }
}
