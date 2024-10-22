const { MongoClient } = require('mongodb');

// Replace with your MongoDB URI
const uri = 'mongodb+srv://group-d:p0FlVQ6DhVbkZrYV@cluster0.knrq5.mongodb.net/'; // For local DB
// Or, for MongoDB Atlas: 'mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority'

const client = new MongoClient(uri, {
  maxPoolSize: 50,
  connectTimeoutMS: 5000,
  retryWrites: true
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB!');
    return client.db('devdb'); // Replace with your DB name
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

module.exports = connectToDatabase;