const express = require('express');
const Recipe = require('../models/Recipe'); // Adjust the path as needed

const router = express.Router();

/**
 * Endpoint to sort recipes by creation date
 * @route GET /api/recipes/sort/date
 * @param {string} order - Sort order (asc or desc), defaults to desc
 * @returns {Object[]} Sorted array of recipes
 */
router.get('/', async (req, res) => {
  try {
    // Extract order from query parameter, default to descending
    const { order = 'desc' } = req.query;
    
    // Determine sort order (1 for ascending, -1 for descending)
    const sortOrder = order.toLowerCase() === 'asc' ? 1 : -1;
    
    // Find and sort recipes
    const recipes = await Recipe.find()
      .sort({ published: sortOrder })
      .select('-__v'); // Optionally exclude version key
    
    // Respond with sorted recipes
    res.json({
      totalRecipes: recipes.length,
      sortOrder: order.toLowerCase(),
      sortedBy: 'publication date',
      recipes
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ 
      message: 'Error sorting recipes by date', 
      error: error.message 
    });
  }
});

module.exports = router;