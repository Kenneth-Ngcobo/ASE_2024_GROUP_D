const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true // Regular index for basic queries
  },
  description: String,
  ingredients: [String],
  instructions: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create text index for full-text search capabilities
recipeSchema.index({ title: 'text' });

// Create partial index for case-insensitive prefix matching
recipeSchema.index(
  { title: 1 },
  {
    collation: { locale: 'en', strength: 2 },
    name: 'title_partial_index'
  }
);

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;