const RecipeSearchService = require('../services/recipeSearchService');

class RecipeController {
  static async getSuggestions(req, res) {
    try {
      const { query } = req.query;
      
      if (!query || query.length < 1) {
        return res.status(400).json({
          success: false,
          message: 'Search query is required'
        });
      }

      const suggestions = await RecipeSearchService.getSuggestions(query);
      
      return res.json({
        success: true,
        data: suggestions
      });
    } catch (error) {
      console.error('Error in getSuggestions controller:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async searchRecipes(req, res) {
    try {
      const { query } = req.query;
      
      if (!query || query.length < 1) {
        return res.status(400).json({
          success: false,
          message: 'Search query is required'
        });
      }

      const recipes = await RecipeSearchService.searchByTitle(query);
      
      return res.json({
        success: true,
        data: recipes
      });
    } catch (error) {
      console.error('Error in searchRecipes controller:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
}

module.exports = RecipeController;