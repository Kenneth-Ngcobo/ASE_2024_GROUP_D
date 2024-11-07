const connectToDatabase = require('../../../../../db'); // Adjust path as necessary

export async function GET(req, { params }) {
  const { email } = params; // Extract the user's email from the URL parameters for filtering the reviews

  try {
    // Step 1: Connect to the database
    console.log('Attempting to connect to the database...');
    const db = await connectToDatabase();
    
    // Check if the database connection is successful
    if (!db) {
      console.error('Database connection failed');
      return new Response('Database connection failed', { status: 500 });
    }
    console.log('Database connected successfully');

    // Access the 'reviews' and 'recipes' collections from the database
    const reviewsCollection = db.collection('reviews');
    const recipesCollection = db.collection('recipes');

    // Step 2: Fetch reviews for the user with rating greater than 7
    console.log(`Fetching reviews for email: ${email} with rating greater than 7...`);
    const reviews = await reviewsCollection
      .find({ email, review: { $gt: 7 } }) // Filter reviews by the user's email and rating greater than 7
      .toArray();
    console.log(`Reviews found: ${reviews.length}`); // Log the number of reviews found for the user

    // If no reviews are found for the user, return an empty array
    if (reviews.length === 0) {
      console.log('No reviews found for the user.');
      return new Response(JSON.stringify([])); // Return an empty array if no reviews
    }

    // Step 3: Get the highest review rating for the user and pick the corresponding recipeId
    const highestRatedReview = reviews.reduce((max, review) => (review.review > max.review ? review : max), reviews[0]);
    console.log(`Highest rated review found: ${highestRatedReview.review} for recipe ID: ${highestRatedReview.recipeId}`);

    // Step 4: Initialize an array to store recommended recipeIds
    const recommendedRecipeIds = [];

    // Fetch the related recipe details (tags) using the highest rated review's recipeId
    const recipe = await recipesCollection.findOne({ _id: highestRatedReview.recipeId });
    if (recipe) {
      console.log(`Recipe found for recipe ID: ${highestRatedReview.recipeId}, Tags: ${recipe.tags}`);
    } else {
      console.log(`No recipe found for recipe ID: ${highestRatedReview.recipeId}`);
    }

    if (!recipe || !recipe.tags) {
      return new Response(JSON.stringify([])); // Return empty if no recipe or tags found
    }

    const recipeTags = recipe.tags; // Tags from the highest-rated review's recipe

    // Step 5: Find similar reviews based on matching tags, excluding the user's reviews
    console.log('Searching for similar reviews...');
    const similarReviews = await reviewsCollection
      .find({
        email: { $ne: email }, // Exclude reviews by the user's email
        recipeId: { $ne: highestRatedReview.recipeId }, // Exclude the review for the same recipe
        review: { $gt: 7 }, // Ensure rating is greater than 7
      })
      .toArray();
    console.log(`Found ${similarReviews.length} similar reviews for recipe ID: ${highestRatedReview.recipeId}`);

    // Step 6: Loop through similar reviews to find common tags
    for (const similarReview of similarReviews) {
      const similarRecipe = await recipesCollection.findOne({ _id: similarReview.recipeId });
      if (!similarRecipe || !similarRecipe.tags) continue; // Skip if no similar recipe or tags

      // Find common tags between the current recipe and the similar recipe
      const commonTags = similarRecipe.tags.filter(tag => recipeTags.includes(tag));
      console.log(`Found ${commonTags.length} common tags between recipe ${highestRatedReview.recipeId} and recipe ${similarReview.recipeId}`);

      if (commonTags.length > 0) {
        // Add the recipeId of the similar review to the recommended list
        recommendedRecipeIds.push(similarReview.recipeId); // Add only the recipeId
        console.log('Added recipeId to recommendations');
      }
    }

    // Step 7: Remove duplicates from the recommended recipeIds list
    const uniqueRecommendedRecipeIds = [...new Set(recommendedRecipeIds)];
    console.log(`Returning unique recommended recipeIds, total: ${uniqueRecommendedRecipeIds.length}`);

    // Return the unique recommended recipeIds as a response in JSON format
    return new Response(JSON.stringify(uniqueRecommendedRecipeIds));

  } catch (error) {
    // Log any errors that occur during the process
    console.error('Error during recommendation request:', error);
    
    // Return a generic error response
    return new Response('Internal server error', { status: 500 });
  }
}
