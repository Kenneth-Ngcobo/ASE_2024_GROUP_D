// /pages/api/recipes/high-rated/[email].js
const connectToDatabase = require('../../../../../db'); // Adjust path as necessary

export async function GET(req, { params }) {
  const { email } = params; // Extract the user's email from the URL parameters

  try {
    // Step 1: Connect to the database
    console.log('Attempting to connect to the database...');
    const db = await connectToDatabase();

    if (!db) {
      console.error('Database connection failed');
      return new Response('Database connection failed', { status: 500 });
    }
    console.log('Database connected successfully');

    // Access the 'reviews' collection from the database
    const reviewsCollection = db.collection('reviews');

    // Step 2: Aggregate average ratings for each recipe
    const highRatedRecipes = await reviewsCollection.aggregate([
      // Group reviews by recipeId and calculate average rating
      {
        $group: {
          _id: "$recipeId", // Group by recipeId
          avgRating: { $avg: "$review" } // Calculate average rating
        }
      },
      // Sort recipes by average rating in descending order
      { $sort: { avgRating: -1 } },
      // Limit to top 10 recipes
      { $limit: 10 }
    ]).toArray();

    if (highRatedRecipes.length === 0) {
      console.log('No high-rated recipes found.');
      return new Response(JSON.stringify([]), { status: 200 });
    }

    // Step 3: Extract only the recipeIds from the results
    const topRecipeIds = highRatedRecipes.map(recipe => recipe._id);

    console.log(`Returning ${topRecipeIds.length} high-rated recipe IDs`);

    // Return the recipeIds as a response in JSON format
    return new Response(JSON.stringify(topRecipeIds), { status: 200 });
  } catch (error) {
    console.error('Error fetching high-rated recipes:', error);
    return new Response('Internal server error', { status: 500 });
  }
}
