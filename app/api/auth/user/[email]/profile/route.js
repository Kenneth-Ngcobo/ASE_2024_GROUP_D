import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../../../db';

/**
 * Retrieves a user's profile information by email.
 * 
 * @async
 * @function GET
 * @param {Request} req - The incoming HTTP request
 * @param {Object} params - Route parameters
 * @param {string} params.email - The email of the user whose profile is being retrieved
 * @returns {Promise<NextResponse>} A promise that resolves to a Response object:
 *                                  - 200 status with user profile data if found
 *                                  - 400 status if no email is provided
 *                                  - 404 status if user is not found
 *                                  - 500 status for internal server errors
 */
export async function GET(req, { params }) {
    try {
        const { email } = params;

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        const db = await connectToDatabase();
        const usersCollection = db.collection('users');

        // Fetch user profile by email
        const user = await usersCollection.findOne({ email: email });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Return the user profile data
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error('Error fetching user data:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

/**
 * Updates a user's profile information.
 * 
 * @async
 * @function PUT
 * @param {Request} req - The incoming HTTP request with updated user profile data
 * @returns {Promise<NextResponse>} A promise that resolves to a Response object:
 *                                  - 200 status with success message if profile is updated
 *                                  - 400 status if no email is provided
 *                                  - 404 status if user is not found or no changes made
 *                                  - 500 status for internal server errors
 */
export async function PUT(req) {
    try {
        const { fullName, email, phoneNumber, password } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        const db = await connectToDatabase();
        const usersCollection = db.collection('users');

        // Update user profile with provided data
        const updateResult = await usersCollection.updateOne(
            { email: email },
            { $set: { fullName, phoneNumber, password } }
        );

        if (updateResult.modifiedCount === 0) {
            return NextResponse.json({ error: 'User not found or no changes made' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Profile updated successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error updating profile:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
