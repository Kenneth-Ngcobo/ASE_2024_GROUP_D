const express = require('express');
const RecipeController = require('../controller/recipeController');

const router = express.Router();

router.get('/suggestions', RecipeController.getSuggestions);
router.get('/search', RecipeController.searchRecipes);

module.exports = router;