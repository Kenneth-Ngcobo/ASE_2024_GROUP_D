const connectToDatabase = require("./db").default;

async function testMongoConnection() {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("recipes"); // You can change the collection name
    const document = await collection.findOne({ title: "Biryani" }); // Fetch a document to test
    console.log("Document found:", document);
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    process.exit(0); // Exit process when done
  }
}

testMongoConnection();
