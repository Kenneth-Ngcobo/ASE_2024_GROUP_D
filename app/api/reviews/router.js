const express = require('express');
const router = express.Router();
const connectToDatabase = require('../../../db');
const {
  createReview,
  updateReview,
  deleteReview,
  getRecipeReviews
} = require('./reviews');

// Middleware to check and create reviews array if it doesn't exist
async function ensureReviewsArrayExists(req, res, next) {
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

    if (!recipe.reviews) {
      await db.collection('recipes').updateOne(
        { _id: recipeId },
        { $set: { reviews: [] } }
      );
    }

    next();
  } catch (error) {
    console.error('Error ensuring reviews array exists:', error);
    res.status(500).json({ error: 'Failed to ensure reviews array exists' });
  }
}

// Create a new review
router.post('/reviews', ensureReviewsArrayExists, async (req, res) => {
  try {
    const db = await connectToDatabase();
    const review = await createReview(db, req.body);
    res.status(201).json(review);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ error: 'Failed to create review' });
  }
});

// Update a review
router.put('/reviews/:reviewId', ensureReviewsArrayExists, async (req, res) => {
  try {
    const db = await connectToDatabase();
    const result = await updateReview(db, req.params.reviewId, req.body);

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.json({ message: 'Review updated successfully' });
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ error: 'Failed to update review' });
  }
});

// Delete a review
router.delete('/reviews/:reviewId', ensureReviewsArrayExists, async (req, res) => {
  try {
    const db = await connectToDatabase();
    const result = await deleteReview(db, req.params.reviewId);

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ error: 'Failed to delete review' });
  }
});

// Get all reviews for a recipe with sorting
router.get('/recipes/:recipeId/reviews', ensureReviewsArrayExists, async (req, res) => {
  try {
    const db = await connectToDatabase();
    const sortOptions = {
      sortBy: req.query.sortBy || 'date',  
      order: req.query.order || 'desc'     
    };

    const reviews = await getRecipeReviews(db, req.params.recipeId, sortOptions);
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

module.exports = router;

