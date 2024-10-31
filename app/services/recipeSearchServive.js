// const Recipe = require('../models/Recipe');

// class RecipeSearchService {
//   static async getSuggestions(searchTerm) {
//     if (!searchTerm || typeof searchTerm !== 'string') {
//       return [];
//     }

//     // Escape special regex characters
//     const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
//     try {
//       const suggestions = await Recipe.find({
//         title: {
//           $regex: `^${escapedSearchTerm}`,
//           $options: 'i'
//         }
//       })
//         .select('title -_id') // Only return title field
//         .limit(10) // Limit to 10 results
//         .collation({ locale: 'en', strength: 2 }) // Case-insensitive matching
//         .lean() // Return plain JavaScript objects
//         .exec();

//       return suggestions.map(recipe => recipe.title);
//     } catch (error) {
//       console.error('Error in getSuggestions:', error);
//       throw error;
//     }
//   }

//   static async searchByTitle(searchTerm) {
//     if (!searchTerm || typeof searchTerm !== 'string') {
//       return [];
//     }

//     try {
//       // Use text search for full-text matching
//       return await Recipe.find(
//         { $text: { $search: searchTerm } },
//         { score: { $meta: 'textScore' } }
//       )
//         .select('title description')
//         .sort({ score: { $meta: 'textScore' } })
//         .limit(10)
//         .lean()
//         .exec();
//     } catch (error) {
//       console.error('Error in searchByTitle:', error);
//       throw error;
//     }
//   }
// }

// module.exports = RecipeSearchService;