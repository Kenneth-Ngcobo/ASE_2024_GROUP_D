const { MongoClient, ServerApiVersion } = require('mongodb');

// Retrieve MongoDB URI from environment variables
if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    deprecationErrors: true,
  },
};

let client;
let cachedDb = null; // Cache database instance for reuse

async function connectToDatabase() {
  // Check if we're already connected and return cached DB
  if (cachedDb) {
    return cachedDb;
  }

  if (!client) {
    // Initialize a new MongoDB client if not already initialized
    client = new MongoClient(uri, options);
    await client.connect();
    console.log('Connected to MongoDB!');
  }

  // Connect to specific database
  const db = client.db('devdb'); 
  cachedDb = db; // Caches the DB connection for future requests
  return db;
}

module.exports = connectToDatabase;