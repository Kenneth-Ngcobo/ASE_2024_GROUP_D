import { connectToDatabase } from "../../../../db";

/**
 * API handler for managing instructions.
 *
 * This handler processes POST and GET requests to save or retrieve instructions
 * stored in a MongoDB database. It supports the following functionality:
 * 
 * - **POST**: Saves a new set of instructions to the database.
 * - **GET**: Retrieves all instructions from the database.
 * 
 * For unsupported HTTP methods, the handler responds with a 405 status code.
 *
 * @async
 * @function handler
 * @param {Object} req - The HTTP request object.
 * @param {string} req.method - The HTTP method (e.g., POST, GET).
 * @param {Object} req.body - The request body, required for POST.
 * @param {Object} res - The HTTP response object.
 *
 * @returns {Promise<void>} Sends a JSON response with a status code and data or error message.
 *
 * * @throws {Error} Responds with specific status codes for errors:
 * - **400**: Missing or invalid `instructions` field in POST requests.
 * - **404**: No instructions found in GET requests.
 * - **500**: Internal server errors for database operations.
 * - **405**: Unsupported HTTP methods.
 */
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { instructions } = req.body;

    if (!instructions || !Array.isArray(instructions)) {
      return res.status(400).json({ error: "Instructions must be provided as an array" });
    }

    try {
      const { db } = await connectToDatabase();
      const result = await db.collection("instructions").insertOne({ instructions });
      res.status(200).json({ message: "Instructions saved successfully", data: result });
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ error: "Failed to save instructions", details: error.message });
    }
  } else if (req.method === "GET") {
    try {
      const { db } = await connectToDatabase();
      const instructions = await db.collection("instructions").find({}).toArray();
      if (instructions.length === 0) {
        return res.status(404).json({ message: "No instructions found" });
      }
      res.status(200).json({ instructions });
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ error: "Failed to retrieve instructions", details: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
