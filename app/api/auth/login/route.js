import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import connectToDatabase from "../../../../db";

/**
 * Handles the user login process.
 * 
 * This function performs the following steps:
 * 1. Validates user credentials against the database
 * 2. Verifies the password using bcrypt
 * 3. Generates a JWT token
 * 4. Sets an HTTP-only authentication cookie
 *
 * @async
 * @function POST
 * @param {Request} req - The incoming HTTP request containing user credentials.
 * @returns {Promise<Response>} A promise that resolves to a Response object:
 *                             - 200 status with success message and set authentication cookie on successful login
 *                             - 400 status if user not found or password is invalid
 * @throws {Error} Throws an error if database connection or authentication process fails
 */
export async function POST(req) {
    const { email, password } = await req.json();
    const db = await connectToDatabase();

    const user = await db.collection("users").findOne({ email });
    if (!user) {
        return new Response(JSON.stringify({ message: "User not found" }), { status: 400 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return new Response(JSON.stringify({ message: "Invalid password" }), { status: 400 });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Serialize the cookie
    const cookie = serialize('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 3600,
        sameSite: 'strict',
        path: '/',
    });

    return new Response(
        JSON.stringify({ message: "Logged in successfully" }),
        {
            status: 200,
            headers: {
                "Set-Cookie": cookie,
            },
        }
    );
}