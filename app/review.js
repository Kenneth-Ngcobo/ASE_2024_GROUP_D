import { ObjectId } from 'mongodb';

async function createReview(db, reviewData) {
  const collection = db.collection('recipes');
  const recipeId = reviewData.recipeId;

  // Validation
  try {
    await validateRecipe(db, recipeId);
  } catch (error) {
    console.error(`Recipe validation error: ${error.message}`);
    throw new Error(`Recipe validation error: ${error.message}`);
  }

  // Prepare review object
  const review = {
    _id: new ObjectId(),  // Using ObjectId for MongoDB compatibility
    userId: reviewData.userId || 'test',
    rating: Number(reviewData.rating),
    comment: reviewData.comment,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // Attempt to update the database
  try {
    const updateResult = await collection.updateOne(
      { _id: recipeId },
      { $push: { reviews: review }, $set: { updatedAt: new Date() } }
    );
    if (updateResult.modifiedCount === 0) {
      throw new Error('Failed to add review to the recipe');
    }
  } catch (error) {
    console.error(`Database update error: ${error.message}`);
    throw new Error(`Database update error: ${error.message}`);
  }

  // Update average rating
  try {
    await updateAverageRating(db, recipeId);
  } catch (error) {
    console.error(`Error updating average rating: ${error.message}`);
    throw new Error(`Error updating average rating: ${error.message}`);
  }

  return review;
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

  // Convert reviewId to ObjectId if it's a string
  const objectId = typeof reviewId === 'string' ? new ObjectId(reviewId) : reviewId;

  const update = {
    $set: {
      "reviews.$.rating": Number(updateData.rating),
      "reviews.$.comment": updateData.comment,
      "reviews.$.updatedAt": new Date(),
      updatedAt: new Date(),
    }
  };

  try {
    // Attempt to update the specific review within the recipe
    const result = await collection.updateOne(
      { "reviews._id": objectId },
      update
    );

    if (result.matchedCount === 0) {
      throw new Error('Review not found');
    } else if (result.modifiedCount === 0) {
      throw new Error('Review found, but no changes were made');
    }

    // Find the recipe containing the review to update the average rating
    const recipe = await collection.findOne(
      { "reviews._id": objectId },
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
    // Convert reviewId to ObjectId if it's a string
    const objectId = typeof reviewId === 'string' ? new ObjectId(reviewId) : reviewId;

    // Find the recipe containing the review
    const recipe = await collection.findOne(
      { "reviews._id": objectId },
      { projection: { _id: 1 } }
    );

    if (!recipe) {
      throw new Error('Review not found');
    }

    // Remove the review from the recipe's reviews array
    const result = await collection.updateOne(
      { _id: recipe._id },
      {
        $pull: { reviews: { _id: objectId } },
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