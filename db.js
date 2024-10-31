const { MongoClient } = require('mongodb');

// MongoDB connection URI
const uri = 'mongodb+srv://group-d:p0FlVQ6DhVbkZrYV@cluster0.knrq5.mongodb.net/';

const client = new MongoClient(uri, {
  maxPoolSize: 50,
  connectTimeoutMS: 5000,
  retryWrites: true,
});

let cachedDb = null; // Use caching to avoid reconnecting on every request

async function connectToDatabase() {
  try {
    if (cachedDb) {
      return cachedDb; // Return the cached DB if already connected
    }

    await client.connect();
    console.log('Connected to MongoDB!');

    const db = client.db('devdb'); // Use your database name
    cachedDb = db; // Cache the DB connection

    // Create a text index on the title field of the recipes collection
    await db.collection('recipes').createIndex({ title: "text" });
    console.log('Text index created on title field of recipes collection.');

    return db; // Return the database instance

  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error; // Rethrow the error to handle it later
  }
}

/**
 * Search for recipes by title using $regex for partial matching or $text for full-text search.
 *
 * @param {string} title - The title or partial title to search for.
 * @param {boolean} useRegex - Whether to use $regex (true) or text search (false).
 * @param {number} limit - The maximum number of results to return.
 * @returns {Promise<Array>} - A promise that resolves to an array of matching recipes.
 */
async function searchRecipesByTitle(title, useRegex = true, limit =10) {
  const db = await connectToDatabase();
  const collection = db.collection('recipes'); 

  // Define the query based on `useRegex`
  const query = useRegex
  ? { title: { $regex: `^${title}`, $options: 'i' } } // Case-insensitive regex
    : { $text: { $search: title } }; // Full-text search if text index exists

  try {
    const recipes = await collection.find(query).limit(limit).toArray();
    return recipes.map(recipe => recipe.title); // Return matched recipes
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw error; // Rethrow the error
  }
}

module.exports = { connectToDatabase, searchRecipesByTitle };
