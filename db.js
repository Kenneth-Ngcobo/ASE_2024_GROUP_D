const { MongoClient, ServerApiVersion } = require('mongodb');

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    deprecationErrors: true,
  },
  maxPoolSize: 20, // Maximum pool size
};

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
} else {
  clientPromise = global._mongoClientPromise;
}

let cachedDb = null; // Cache database instance for reuse



async function connectToDatabase() {
  if (!clientPromise) {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }

  if (cachedDb) {
    return cachedDb;
  }

  const dbConnection = await clientPromise;
  cachedDb = dbConnection.db('devdb'); // Replace 'devdb' with your database name

  // Ensure indexes and reviews setup
  await initializeIndexes(cachedDb);
  await checkAndCreateReviews(cachedDb);

  return cachedDb;
}

async function initializeIndexes(db) {
  const collection = db.collection('recipes');
  const errors = [];

  try {
    const existingIndexes = await collection.listIndexes().toArray();
    const indexNames = existingIndexes.map((index) => index.name);

    if (indexNames.includes('recipe_search_index')) {
      try {
        await collection.dropIndex('recipe_search_index');
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        if (error.code !== 27) {
          errors.push(`Failed to drop index recipe_search_index: ${error.message}`);
        }
      }
    }

    const indexOperations = [
      {
        operation: async () => {
          try {
            await collection.createIndex(
              { title: 'text', description: 'text', tags: 'text' },
              {
                weights: { title: 10, description: 5, tags: 3 },
                name: 'recipe_search_index',
                background: true,
              }
            );
          } catch (error) {
            if (error.code !== 85) {
              throw error;
            }
          }
        },
        name: 'recipe_search_index',
      },
      {
        operation: () => collection.createIndex({ category: 1 }, { background: true }),
        name: 'category_index',
      },
      {
        operation: () => collection.createIndex({ tags: 1 }, { background: true }),
        name: 'tags_index',
      },
      {
        operation: () => collection.createIndex({ 'ingredients.name': 1 }, { background: true }),
        name: 'ingredients_index',
      },
      {
        operation: () => collection.createIndex({ instructions: 1 }, { background: true }),
        name: 'instructions_index',
      },
      {
        operation: () => collection.createIndex({ category: 1, createdAt: -1 }, { background: true }),
        name: 'category_date_index',
      },
      {
        operation: () => collection.createIndex({ 'reviews.rating': 1, 'reviews.createdAt': -1 }, { background: true }),
        name: 'Reviews compound index',
      },
      {
        operation: () => collection.createIndex({ 'reviews.userId': 1 }, { background: true }),
        name: 'Review user index',
      },
      {
        operation: () => collection.createIndex({ averageRating: -1 }, { background: true }),
        name: 'Average rating index',
      },
    ];

    for (const { operation, name } of indexOperations) {
      let retries = 3;
      while (retries > 0) {
        try {
          await operation();
          break;
        } catch (error) {
          retries--;
          if (retries === 0) {
            if (error.code !== 85) {
              errors.push(`Failed to create index ${name}: ${error.message}`);
            }
          } else {
            await new Promise((resolve) => setTimeout(resolve, 1000));
          }
        }
      }
    }

    if (errors.length > 0) {
      console.error(`Index initialization completed with warnings: ${errors.join('; ')}`);
    }
  } catch (error) {
    console.error(`Index initialization error: ${error.message}`);
  }
}

async function checkAndCreateReviews(db) {
  const collection = db.collection('recipes');

  try {
    const recipesWithoutReviews = await collection.find({ reviews: { $exists: false } }).toArray();
    
    if (recipesWithoutReviews.length > 0) {
      const updatePromises = recipesWithoutReviews.map(recipe => {
        return collection.updateOne(
          { _id: recipe._id },
          { $set: { reviews: [] } } // Create an empty array for reviews
        );
      });
      await Promise.all(updatePromises);
      console.log(`${updatePromises.length} recipes updated with empty reviews array.`);
    } else {
      console.log('No recipes without reviews found.');
    }
  } catch (error) {
    console.error(`Error checking and creating reviews: ${error.message}`);
  }
}

module.exports = connectToDatabase;
