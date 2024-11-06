
const { ObjectId } = require('mongodb');

// Create a new review
async function createReview(db, reviewData) {
  const review = {
    recipeId: ObjectId.isValid(reviewData.recipeId) ? new ObjectId(reviewData.recipeId) : null,
    username: reviewData.username,
    rating: Number(reviewData.rating),
    reviewText: reviewData.reviewText,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  if (!review.recipeId) {
    throw new Error('Invalid recipe ID');
  }

  return await db.collection('reviews').insertOne(review);
}

// Update an existing review
async function updateReview(db, reviewId, updateData) {
  if (!ObjectId.isValid(reviewId)) {
    throw new Error('Invalid review ID');
  }

  const allowedUpdates = ['rating', 'reviewText'];
  const updates = {};
  
  allowedUpdates.forEach(field => {
    if (updateData[field] !== undefined) {
      updates[field] = field === 'rating' ? Number(updateData[field]) : updateData[field];
    }
  });
  
  updates.updatedAt = new Date();

  return await db.collection('reviews').updateOne(
    { _id: new ObjectId(reviewId) },
    { $set: updates }
  );
}

// Delete a review
async function deleteReview(db, reviewId) {
  if (!ObjectId.isValid(reviewId)) {
    throw new Error('Invalid review ID');
  }

  return await db.collection('reviews').deleteOne(
    { _id: new ObjectId(reviewId) }
  );
}

// Get reviews for a specific recipe
async function getRecipeReviews(db, recipeId, options = {}) {
  if (!ObjectId.isValid(recipeId)) {
    throw new Error('Invalid recipe ID');
  }

  const { sortBy = 'date', order = 'desc' } = options;
  
  const sortOptions = {};
  if (sortBy === 'date') {
    sortOptions.createdAt = order === 'desc' ? -1 : 1;
  } else if (sortBy === 'rating') {
    sortOptions.rating = order === 'desc' ? -1 : 1;
  }

  return await db.collection('reviews')
    .find({ recipeId: new ObjectId(recipeId) })
    .sort(sortOptions)
    .toArray();
}

module.exports = {
  createReview,
  updateReview,
  deleteReview,
  getRecipeReviews
};