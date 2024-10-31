const express = require('express');
const Recipe = require('../models/Recipe'); // Adjust the path as needed

const router = express.Router();

/**
 * Endpoint to sort recipes by number of instructions
 * @route GET /api/recipes/sort/instructions
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
    const recipes = await Recipe.aggregate([
      // Add a field for instructions length
      { $addFields: { 
        instructionsCount: { $size: "$instructions" } 
      }},
      // Sort by the new field
      { $sort: { instructionsCount: sortOrder } },
      // Optional: Project to shape the output
      { $project: { 
        title: 1, 
        instructionsCount: 1,
        instructions: 1,
        prep: 1,
        cook: 1,
        published: 1
      }}
    ]);
    
    // Respond with sorted recipes
    res.json({
      totalRecipes: recipes.length,
      sortOrder: order.toLowerCase(),
      sortedBy: 'instructions count',
      recipes
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ 
      message: 'Error sorting recipes by number of instructions', 
      error: error.message 
    });
  }
});

module.exports = router;