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
 * connection if one is already cached. It returns the database instance for use in 
 * further database operations.
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

module.exports = connectToDatabase;
