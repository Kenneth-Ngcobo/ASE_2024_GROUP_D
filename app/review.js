const { ObjectId } = require('mongodb');

async function createReview(db, reviewData) {
  const collection = db.collection('recipes');
  const recipeId = reviewData.recipeId;

  // Validate recipeId
  if (!ObjectId.isValid(recipeId)) {
    throw new Error('Invalid recipe ID');
  }

  const review = {
    _id: new ObjectId(),
    userId: reviewData.userId,
    rating: Number(reviewData.rating),
    comment: reviewData.comment,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  // Add the review and update average rating
  const result = await collection.updateOne(
    { _id: new ObjectId(recipeId) },
    { 
      $push: { reviews: review },
      $set: { updatedAt: new Date() }
    }
  );

  if (result.matchedCount === 0) {
    throw new Error('Recipe not found');
  }

  await updateAverageRating(db, recipeId);
  return review;
}

async function updateReview(db, reviewId, updateData) {
  const collection = db.collection('recipes');

  if (!ObjectId.isValid(reviewId)) {
    throw new Error('Invalid review ID');
  }

  const update = {
    $set: {
      "reviews.$.rating": Number(updateData.rating),
      "reviews.$.comment": updateData.comment,
      "reviews.$.updatedAt": new Date(),
      updatedAt: new Date()
    }
  };

  const result = await collection.updateOne(
    { "reviews._id": new ObjectId(reviewId) },
    update
  );

  if (result.matchedCount === 0) {
    throw new Error('Review not found');
  }

  // Update average rating for the recipe
  const recipe = await collection.findOne(
    { "reviews._id": new ObjectId(reviewId) },
    { projection: { _id: 1 } }
  );
  
  if (recipe) {
    await updateAverageRating(db, recipe._id.toString());
  }

  return result;
}

async function deleteReview(db, reviewId) {
  const collection = db.collection('recipes');

  if (!ObjectId.isValid(reviewId)) {
    throw new Error('Invalid review ID');
  }

  // First find the recipe containing the review
  const recipe = await collection.findOne(
    { "reviews._id": new ObjectId(reviewId) },
    { projection: { _id: 1 } }
  );

  if (!recipe) {
    throw new Error('Review not found');
  }

  // Remove the review
  const result = await collection.updateOne(
    { _id: recipe._id },
    {
      $pull: { reviews: { _id: new ObjectId(reviewId) } },
      $set: { updatedAt: new Date() }
    }
  );

  // Update average rating
  await updateAverageRating(db, recipe._id.toString());

  return result;
}

async function getRecipeReviews(db, recipeId, sortOptions) {
  const collection = db.collection('recipes');

  if (!ObjectId.isValid(recipeId)) {
    throw new Error('Invalid recipe ID');
  }

  const recipe = await collection.findOne(
    { _id: new ObjectId(recipeId) },
    { projection: { reviews: 1 } }
  );

  if (!recipe) {
    throw new Error('Recipe not found');
  }

  let reviews = recipe.reviews || [];

  // Apply sorting
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
}

async function updateAverageRating(db, recipeId) {
  const collection = db.collection('recipes');

  const recipe = await collection.findOne(
    { _id: new ObjectId(recipeId) },
    { projection: { reviews: 1 } }
  );

  if (!recipe || !recipe.reviews || recipe.reviews.length === 0) {
    await collection.updateOne(
      { _id: new ObjectId(recipeId) },
      { $set: { averageRating: 0 } }
    );
    return;
  }

  const totalRating = recipe.reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = Number((totalRating / recipe.reviews.length).toFixed(1));

  await collection.updateOne(
    { _id: new ObjectId(recipeId) },
    { $set: { averageRating } }
  );
}

module.exports = {
  createReview,
  updateReview,
  deleteReview,
  getRecipeReviews,
  updateAverageRating
};
