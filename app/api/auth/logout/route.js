import { serialize } from "cookie";

/**
 * Handles the user logout process.
 * 
 * This function clears the authentication token by:
 * 1. Setting the `authToken` cookie to an empty value
 * 2. Setting the cookie's expiration to the past, effectively invalidating it
 * 
 * @async
 * @function POST
 * @returns {Promise<Response>} A promise that resolves to a Response object:
 *                             - 200 status with logout success message
 *                             - Sets a cookie with zero length and past expiration
 */
export async function POST() {
    return new Response(
        JSON.stringify({ message: "Logged out successfully" }),
        {
            status: 200,
            headers: {
                "Set-Cookie": serialize("authToken", "", {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== "development",
                    maxAge: -1, // Cookie expires immediately
                    sameSite: "strict",
                    path: "/",
                }),
            },
        }
    );
}