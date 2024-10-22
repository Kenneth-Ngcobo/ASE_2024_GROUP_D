const { MongoClient } = require('mongodb');

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
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

module.exports = connectToDatabase;
