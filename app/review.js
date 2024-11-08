const { ObjectId } = require('mongodb');

const createReview = async (db, reviewData) => {
  const { recipeId, rating, comment, reviewerEmail, reviewerName } = reviewData;

  if (!recipeId) {
    throw new Error('Recipe ID is required to add a review');
  }

  const newReview = {
    _id: new ObjectId(),
    rating,
    comment,
    reviewerEmail,
    reviewerName,
    date: new Date(),
  };

  console.log(`Adding review to recipe ID: ${recipeId}`);
  console.log(`New review data: ${JSON.stringify(newReview, null, 2)}`);

  const result = await db.collection('recipes').updateOne(
    { _id: new ObjectId(recipeId) },
    { $push: { reviews: newReview } }
  );

  if (result.modifiedCount === 0) {
    throw new Error('Failed to add review to the recipe');
  }

  return newReview;
};

const updateReview = async (db, reviewId, reviewData) => {
 
};

const deleteReview = async (db, reviewId) => {

};

const getRecipeReviews = async (db, recipeId, sortOptions) => {
  
};

module.exports = {
  createReview,
  updateReview,
  deleteReview,
  getRecipeReviews
};
