const express = require('express');
const router = express.Router();
const connectToDatabase = require('../../../db');
const {
  createReview,
  updateReview,
  deleteReview,
  getRecipeReviews
} = require('./reviews');

// Create a new review
router.post('/reviews', async (req, res) => {
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
router.put('/reviews/:reviewId', async (req, res) => {
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
router.delete('/reviews/:reviewId', async (req, res) => {
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
router.get('/recipes/:recipeId/reviews', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const sortOptions = {
      sortBy: req.query.sortBy || 'date',  // 'date' or 'rating'
      order: req.query.order || 'desc'     // 'asc' or 'desc'
    };
    
    const reviews = await getRecipeReviews(db, req.params.recipeId, sortOptions);
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});
// Create a new review if no reviews exist for the recipe
router.post('/reviews', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const recipeId = req.body.recipeId; // Assuming recipeId is passed in the body

    // Check if there are existing reviews for the recipe
    const existingReviews = await db.collection('reviews').find({ recipeId }).toArray();
    
    if (existingReviews.length > 0) {
      return res.status(400).json({ error: 'Reviews already exist for this recipe' });
    }
    
    // If no reviews exist, create the new review
    const review = await createReview(db, req.body);
    res.status(201).json(review);

  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ error: 'Failed to create review' });
  }
});


module.exports = router;
