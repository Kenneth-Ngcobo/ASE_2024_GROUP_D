// Import the default connectToDatabase function from the db module
const connectToDatabase = require("./db").default;

/**
 * Tests the MongoDB connection by fetching a document from the database.
 * Logs the fetched document or an error message to the console.
 */
async function testMongoConnection() {
  try {
    // Attempt to connect to the database
    const db = await connectToDatabase();

    // Access the 'recipes' collection from the database
    const collection = db.collection("recipes"); // You can change the collection name as needed

    // Fetch a document from the collection where the title is "Biryani"
    const document = await collection.findOne({ title: "Biryani" }); // This serves as a test to verify the connection

    // Log the document found to the console
    console.log("Document found:", document);
  } catch (error) {
    // Log any errors encountered during the fetch operation
    console.error("Error fetching data:", error);
  } finally {
    // Exit the process when done to prevent hanging connections
    process.exit(0); // Exits the Node.js process with success
  }
}

// Call the test function to execute the connection test
testMongoConnection();
