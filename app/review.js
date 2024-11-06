
const { ObjectId } = require('mongodb');

// Create a new review
async function createReview(db, reviewData) {
  const review = {
    ...reviewData,
    createdAt: new Date()
  };
  const result = await db.collection('reviews').insertOne(review);
  return result.ops[0];
}

// Update an existing review
async function updateReview(db, reviewId, updateData) {
  const result = await db.collection('reviews').updateOne(
    { _id: new ObjectId(reviewId) },
    { $set: updateData }
  );
  return result;
}

// Delete a review
async function deleteReview(db, reviewId) {
  const result = await db.collection('reviews').deleteOne({ _id: new ObjectId(reviewId) });
  return result;
}

// Get all reviews for a recipe with sorting
async function getRecipeReviews(db, recipeId, sortOptions) {
  const sortField = sortOptions.sortBy === 'rating' ? 'rating' : 'createdAt';
  const sortOrder = sortOptions.order === 'asc' ? 1 : -1;
  const reviews = await db.collection('reviews')
    .find({ recipeId })
    .sort({ [sortField]: sortOrder })
    .toArray();
  return reviews;
}

module.exports = {
  createReview,
  updateReview,
  deleteReview,
  getRecipeReviews
};
