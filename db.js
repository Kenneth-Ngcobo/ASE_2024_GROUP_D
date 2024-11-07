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
  
  // Ensure indexes and reviews setup
  await initializeIndexes(db);
  await checkAndCreateReviews(db);
  
  return db;
}

async function initializeIndexes(db) {
  const collection = db.collection("recipes");
  const errors = [];

  try {
    // Get existing indexes
    const existingIndexes = await collection.listIndexes().toArray();
    const indexNames = existingIndexes.map((index) => index.name);

    // Only attempt to drop if the index exists
    if (indexNames.includes("recipe_search_index")) {
      try {
        await collection.dropIndex("recipe_search_index");
        // Wait a short time to ensure the index drop is complete
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        if (error.code !== 27) {
          // Skip if index doesn't exist
          errors.push(`Failed to drop index recipe_search_index: ${error.message}`);
        }
      }
    }

    // Create new indexes
    const indexOperations = [
      {
        operation: async () => {
          try {
            await collection.createIndex(
              { title: "text", description: "text", tags: "text" },
              {
                weights: { title: 10, description: 5, tags: 3 },
                name: "recipe_search_index",
                background: true,
              }
            );
          } catch (error) {
            if (error.code !== 85) {
              throw error;
            }
          }
        },
        name: "recipe_search_index",
      },
      {
        operation: () => collection.createIndex({ category: 1 }, { background: true }),
        name: "category_index",
      },
      {
        operation: () => collection.createIndex({ tags: 1 }, { background: true }),
        name: "tags_index",
      },
      {
        operation: () => collection.createIndex({ "ingredients.name": 1 }, { background: true }),
        name: "ingredients_index",
      },
      {
        operation: () => collection.createIndex({ instructions: 1 }, { background: true }),
        name: "instructions_index",
      },
      {
        operation: () => collection.createIndex({ category: 1, createdAt: -1 }, { background: true }),
        name: "category_date_index",
      },
      // New index operations
      {
        operation: () => collection.createIndex({ "reviews.rating": 1, "reviews.createdAt": -1 }, { background: true }),
        name: "Reviews compound index",
      },
      {
        operation: () => collection.createIndex({ "reviews.userId": 1 }, { background: true }),
        name: "Review user index",
      },
      {
        operation: () => collection.createIndex({ averageRating: -1 }, { background: true }),
        name: "Average rating index",
      },
    ];

    // Execute each index operation with retries
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
            // Wait before retrying
            await new Promise((resolve) => setTimeout(resolve, 1000));
          }
        }
      }
    }

    if (errors.length > 0) {
      // Log errors but don't throw
      console.error(`Index initialization completed with warnings: ${errors.join("; ")}`);
    }
  } catch (error) {
    // Log error but don't throw
    console.error(`Index initialization error: ${error.message}`);
  }
}

// Function to check and create reviews if not present
async function checkAndCreateReviews(db) {
  const collection = db.collection("recipes");

  try {
    // Find all recipes without reviews
    const recipesWithoutReviews = await collection.find({ reviews: { $exists: false } }).toArray();
    
    // Update each recipe to add an empty reviews array if it does not exist
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
      console.log("No recipes without reviews found.");
    }
  } catch (error) {
    console.error(`Error checking and creating reviews: ${error.message}`);
  }
}


module.exports = connectToDatabase;