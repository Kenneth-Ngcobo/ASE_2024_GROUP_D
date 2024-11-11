const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('../../../db');
const {
  createReview,
  updateReview,
  deleteReview,
  getRecipeReviews
} = require('../../review');

// Middleware for handling errors
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Middleware to validate recipe existence
async function validateRecipe(req, res, next) {
  try {
    const db = await connectToDatabase();
    const recipeId = req.params.recipeId || req.body.recipeId;

    if (!recipeId) {
      return res.status(400).json({ error: 'Recipe ID is required' });
    }

    const recipe = await db.collection('recipes').findOne({ _id: recipeId });

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    req.recipe = recipe;
    next();
  } catch (error) {
    next(error);
  }
}

// Create a new review
router.post('/reviews', validateRecipe, asyncHandler(async (req, res) => {
  const db = await connectToDatabase();
  const review = await createReview(db, req.body);
  res.status(201).json(review);
}));

// Update a review
router.put('/reviews/:reviewId', asyncHandler(async (req, res) => {
  const db = await connectToDatabase();
  await updateReview(db, req.params.reviewId, req.body);
  res.json({ message: 'Review updated successfully' });
}));

// Delete a review
router.delete('/reviews/:reviewId', asyncHandler(async (req, res) => {
  const db = await connectToDatabase();
  await deleteReview(db, req.params.reviewId);
  res.json({ message: 'Review deleted successfully' });
}));

// Get all reviews for a recipe
router.get('/recipes/:recipeId/reviews', validateRecipe, asyncHandler(async (req, res) => {
  const db = await connectToDatabase();
  const sortOptions = {
    sortBy: req.query.sortBy || 'date',
    order: req.query.order || 'desc'
  };

  const reviews = await getRecipeReviews(db, req.params.recipeId, sortOptions);
  res.json(reviews);
}));

// Error handling middleware
router.use((error, req, res, next) => {
  console.error('API Error:', error);
  res.status(500).json({ 
    error: error.message || 'Internal server error'
  });
});

module.exports = router;

