async function createReview(db, reviewData, recipeId) {
  try {
    try {
  const collection = db.collection('recipes');
    // const recipeId = reviewData.recipeId;

  const userEmail = localStorage.getItem("LoggedInUserEmail")
  // try {
    const response = await fetch(`/api/user/profile?${userEmail}`)
    if(!response.ok) throw new Error("User Email not found")
    
      const userData = await response.json();

      const userId = userData.userId;
      console.log("user id ", userId)
      return userId
  }catch(error){
    console.log(error)
  }

    // Validate the recipe
    await validateRecipe(db, recipeId);

    const review = {
      _id: new Date().getTime().toString(), // Unique review ID based on the timestamp
      userId: reviewData.userId || 'test', // Default userId if none is provided
      rating: Number(reviewData.rating),   // Rating should be a number
      comment: reviewData.comment,         // Comment provided by the user
      createdAt: new Date(),               // Current timestamp
      updatedAt: new Date()                // Current timestamp
    };

    console.log("Review document:", review); // Log the review document to ensure it looks correct

    // Insert the review into the recipe's reviews array
    const updateResult = await collection.updateOne(
      { _id: recipeId },
      {
        $push: { reviews: review },  // Add the review to the reviews array
        $set: { updatedAt: new Date() }  // Update the recipe's `updatedAt` field
      }
    );

    if (updateResult.modifiedCount === 0) {
      throw new Error('Failed to add review to the recipe');
    }

    // Update the average rating for the recipe
    await updateAverageRating(db, recipeId);

    return review;  // Return the created review document
  } catch (error) {
    throw new Error(`Error creating review: ${error.message}`);
  }
}

async function validateRecipe(db, recipeId) {
  const recipe = await db.collection('recipes').findOne({ _id: recipeId });
  if (!recipe) {
    throw new Error('Recipe not found');
  }
}

async function updateAverageRating(db, recipeId) {
  const collection = db.collection('recipes');

  try {
    const recipe = await collection.findOne(
      { _id: recipeId },
      { projection: { reviews: 1 } }
    );

    if (!recipe || !recipe.reviews || recipe.reviews.length === 0) {
      // Set the average rating to 0 if there are no reviews
      await collection.updateOne(
        { _id: recipeId },
        { $set: { averageRating: 0 } }
      );
      return;
    }

    // Calculate the total rating
    const totalRating = recipe.reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = Number((totalRating / recipe.reviews.length).toFixed(1));  // Round to 1 decimal

    // Update the average rating for the recipe
    await collection.updateOne(
      { _id: recipeId },
      { $set: { averageRating } }
    );
  } catch (error) {
    throw new Error(`Error updating average rating: ${error.message}`);
  }
}

async function updateReview(db, reviewId, updateData) {
  const collection = db.collection('recipes');

  const update = {
    $set: {
      "reviews.$.rating": Number(updateData.rating),
      "reviews.$.comment": updateData.comment,
      "reviews.$.updatedAt": new Date(),
      updatedAt: new Date()
    }
  };

  try {
    const result = await collection.updateOne(
      { "reviews._id": reviewId },
      update
    );

    if (result.matchedCount === 0) {
      throw new Error('Review not found');
    }

    // Update average rating for the recipe
    const recipe = await collection.findOne(
      { "reviews._id": reviewId },
      { projection: { _id: 1 } }
    );

    if (recipe) {
      await updateAverageRating(db, recipe._id);
    }

    return result;
  } catch (error) {
    throw new Error(`Error updating review: ${error.message}`);
  }
}

async function deleteReview(db, reviewId) {
  const collection = db.collection('recipes');

  try {
    // First find the recipe containing the review
    const recipe = await collection.findOne(
      { "reviews._id": reviewId },
      { projection: { _id: 1 } }
    );

    if (!recipe) {
      throw new Error('Review not found');
    }

    // Remove the review from the recipe's reviews array
    const result = await collection.updateOne(
      { _id: recipe._id },
      {
        $pull: { reviews: { _id: reviewId } },
        $set: { updatedAt: new Date() }
      }
    );

    // Update the average rating after review deletion
    await updateAverageRating(db, recipe._id);

    return result;
  } catch (error) {
    throw new Error(`Error deleting review: ${error.message}`);
  }
}

async function getRecipeReviews(db, recipeId, sortOptions) {
  const collection = db.collection('recipes');

  try {
    const recipe = await collection.findOne(
      { _id: recipeId },
      { projection: { reviews: 1 } }
    );

    if (!recipe) {
      throw new Error('Recipe not found');
    }

    let reviews = recipe.reviews || [];

    // Apply sorting based on the provided sort options
    if (sortOptions) {
      const { sortBy, order } = sortOptions;
      reviews.sort((a, b) => {
        const multiplier = order.toLowerCase() === 'asc' ? 1 : -1;

        switch (sortBy.toLowerCase()) {
          case 'rating':
            return (a.rating - b.rating) * multiplier;
          case 'date':
            return (a.createdAt - b.createdAt) * multiplier;
          default:
            return 0;
        }
      });
    }

    return reviews;
  } catch (error) {
    throw new Error(`Error getting recipe reviews: ${error.message}`);
  }
}

module.exports = {
  createReview,
  updateReview,
  deleteReview,
  getRecipeReviews,
  updateAverageRating
};
