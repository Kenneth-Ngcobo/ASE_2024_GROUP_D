import connectToDatabase from '../../../../db';
import { getSession } from 'next-auth/react';

/**
 * Update a recipe's description in the MongoDB database.
 *
 * This function handles PATCH requests to update a recipe document's description
 * based on the provided `id` parameter. It verifies if the user is logged in,
 * validates the new description, and updates the recipe with the new description,
 * the ID of the editing user, and a timestamp.
 *
 * @param {Request} req - The HTTP request object.
 * @param {Object} param1 - An object containing the `params` object.
 * @param {Object} param1.params - Parameters from the request URL.
 * @param {string} param1.params.id - The ID of the recipe to update.
 *
 * @returns {Promise<Response>} A Response object with success or error messages.
 */
export async function PATCH(req, { params }) {
    const { id } = params;
    const session = await getSession({ req });

    // Check if the user is logged in
    if (!session) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    // Parse the request body
    let body;
    try {
        body = await req.json();
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
    }

    // Validate the new description
    const { description } = body;
    if (!description || typeof description !== 'string' || description.trim().length === 0) {
        return new Response(JSON.stringify({ error: 'Invalid description' }), { status: 400 });
    }

    try {
        const db = await connectToDatabase();
        const timestamp = new Date();

        // Update the recipe document in the 'recipes' collection
        const result = await db.collection('recipes').updateOne(
            { _id: id },
            {
                $set: {
                    description: description.trim(),
                    lastEditedBy: session.user.id,
                    lastEditedAt: timestamp,
                },
            }
        );

        if (result.matchedCount === 0) {
            return new Response(JSON.stringify({ error: 'Recipe not found' }), { status: 404 });
        }

        return new Response(
            JSON.stringify({
                message: 'Recipe updated successfully',
                lastEditedBy: session.user.name,
                lastEditedAt: timestamp,
            }),
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error('Error updating recipe:', error);
        return new Response(JSON.stringify({ error: 'Failed to update recipe' }), { status: 500 });
    }
}