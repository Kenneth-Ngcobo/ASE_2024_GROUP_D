import bcrypt from "bcryptjs";
import connectToDatabase from "../../../../db";

/**
 * Handles user registration process.
 * 
 * This function performs the following steps:
 * 1. Checks if a user with the provided email already exists
 * 2. Hashes the user's password using bcrypt
 * 3. Inserts a new user document into the database
 *
 * @async
 * @function POST
 * @param {Request} request - The incoming HTTP request containing user data.
* @returns {Promise<Response>} A promise that resolves to a Response object:
 *                             - 201 status with success message if user is created successfully
 *                             - 400 status if user already exists
 * @throws {Error} Throws an error if database connection or user creation fails
 */
export async function POST(request) {
    const { fullName, email, phoneNumber, password } = await request.json();
    const db = await connectToDatabase();

    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
        return new Response(JSON.stringify({ message: "User already exists" }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.collection("users").insertOne({ fullName, email, phoneNumber, password: hashedPassword });

    return new Response(JSON.stringify({ message: "User created successfully" }), { status: 201 });
}
