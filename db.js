const { MongoClient } = require('mongodb');

// MongoDB connection URI
const uri = 'mongodb+srv://group-d:p0FlVQ6DhVbkZrYV@cluster0.knrq5.mongodb.net/';

const client = new MongoClient(uri, {
  maxPoolSize: 50,
  connectTimeoutMS: 5000,
  retryWrites: true,
});

let cachedDb = null; // Use caching to avoid reconnecting on every request

/**
 * Connect to the MongoDB database.
 *
 * This function establishes a connection to the MongoDB database, reusing an existing 
 * connection if one is already cached. It also creates a text index on the "title" field
 * of the "recipes" collection to enable full-text search.
 *
 * @returns {Promise<Db>} A promise that resolves to the database instance.
 *
 * @throws {Error} Throws an error if the connection to the database fails.
 */
async function connectToDatabase() {
  try {
    if (cachedDb) {
      return cachedDb; // Return the cached DB if already connected
    }

    // Connect to the database
    await client.connect();
    console.log('Connected to MongoDB!');

    const db = client.db('devdb'); // Use your database name
    const recipesCollection = db.collection('recipes'); // Access the collection

    // The text index on the "title" field (create only if it doesn't exist)
    await recipesCollection.createIndex({ title: 'text' });
    console.log('Text index on "title" field created (or already exists).');

    cachedDb = db; // Cache the DB connection for reuse

    return db; // Return the database instance
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error; // Rethrow the error to handle it later
  }
}

module.exports = connectToDatabase;
