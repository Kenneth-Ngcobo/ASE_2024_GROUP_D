import connectToDatabase from '../../../../../db';
import { NextResponse } from 'next/server';

/**
 * Updates a recipe's description in the database.
 * 
 * @async
 * @function PATCH
 * @param {Request} request - The incoming HTTP request object
 * @param {Object} context - Route context containing recipe ID
 * @param {Object} context.params - Route parameters
 * @param {string} context.params.id - The ID of the recipe to update
 * @returns {NextResponse} JSON response indicating the result of the description update
 * - Success (200): {
 *     message: 'Recipe updated successfully',
 *     description: string,
 *     lastEditedBy: string,
 *     lastEditedAt: Date
 * }
 * - Error (400): { error: 'Invalid request body' | 'Description is required' | 'Invalid recipe ID format' }
 * - Error (404): { error: 'Recipe not found' }
 * - Error (500): { error: 'Internal server error' }
 * 
 * @description
 * - Validates the request body and recipe ID
 * - Updates the recipe's description
 * - Tracks the last editor and timestamp
 * - Requires user email for tracking who made the edit
 */
export async function PATCH(request, { params }) {
    try {
        // Extract and parse URL and request body
        const url = new URL(request.url);

        // Parse the request body
        let body;
        try {
            body = await request.json();
            console.log("Request Body:", body);
        } catch (error) {
            return NextResponse.json(
                { error: "Invalid request body" },
                { status: 400 }
            );
        }
        //get new desciption input
        const { description } = body;

        if (!description?.trim()) {
            return NextResponse.json(
                { error: 'Description is required' },
                { status: 400 }
            );
        }

        const db = await connectToDatabase();

        // Validate recipe ID as a string
        if (!params.id || typeof params.id !== 'string') {
            return NextResponse.json(
                { error: 'Invalid recipe ID format' },
                { status: 400 }
            );
        }

        const recipeId = params.id; // Use the string ID directly

        console.log("Looking for recipe with ID:", recipeId);

        // Log the existing recipes in the collection for debugging// Logs new Info into DataBase with email
        const recipe = await db.collection('recipes').findOne({ _id: recipeId });
        if (!recipe) {
            return NextResponse.json(
                { error: 'Recipe not found' },
                { status: 404 }
            );
        }

        // Update recipe with all required fields in one operation
        const emailData = url.searchParams.get('email')
        console.log("Description to update:", description);
        console.log("Email of editor:", emailData);
        const result = await db.collection('recipes').findOneAndUpdate(
            { _id: recipeId },
            {
                $set: {
                    description: description.trim(),
                    lastEditedBy: emailData,
                    lastEditedAt: new Date(),
                }
            },
            { returnDocument: 'after' } // This returns the updated document
        );

        // Handle recipe not found or no update
        if (!result) {
            return NextResponse.json(
                { error: 'Recipe not found or no changes made' },
                { status: 404 }
            );
        }

        // Return success response with updated data
        return NextResponse.json({
            message: 'Recipe updated successfully',
            description: result.description,
            lastEditedBy: result.lastEditedBy,
            lastEditedAt: result.lastEditedAt
        });

    } catch (error) {
        console.error('Recipe update failed:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
