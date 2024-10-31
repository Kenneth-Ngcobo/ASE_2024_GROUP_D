const express = require('express');
const Recipe = require('../models/Recipe'); // Adjust the path as needed

const router = express.Router();

/**
 * Endpoint to sort recipes by preparation time
 * @route GET /api/recipes/sort/prep-time
 * @param {string} order - Sort order (asc or desc), defaults to asc
 * @returns {Object[]} Sorted array of recipes
 */
router.get('/', async (req, res) => {
  try {
    // Extract order from query parameter, default to ascending
    const { order = 'asc' } = req.query;
    
    // Determine sort order (1 for ascending, -1 for descending)
    const sortOrder = order.toLowerCase() === 'desc' ? -1 : 1;
    
    // Find and sort recipes
    const recipes = await Recipe.find()
      .sort({ prep: sortOrder })
      .select('-__v'); // Optionally exclude version key
    
    // Respond with sorted recipes
    res.json({
      totalRecipes: recipes.length,
      sortOrder: order.toLowerCase(),
      sortedBy: 'preparation time',
      recipes
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ 
      message: 'Error sorting recipes by preparation time', 
      error: error.message 
    });
  }
});

module.exports = router;