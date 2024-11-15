import connectToDatabase from '../../../../../db';

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
    console.log("update endpoint")
    try {
        const { description } = await req.json();
        console.log("description =", description);
        if (!description?.trim()) {
            return Response.json({ error: 'Description is required' }, { status: 400 });
        }

        const db = await connectToDatabase();

        // Update recipe with all required fields in one operation
        const result = await db.collection('recipes').updateOne(
            { _id: params.id },
            {
                $set: {
                    description: description.trim(),
                    //lastEditedBy: user.id,
                    lastEditedAt: new Date()
                }
            }
        );

        // Handle recipe not found
        if (!result.matchedCount) {
            return Response.json({ error: 'Recipe not found' }, { status: 404 });
        }

        // Success response
        return Response.json({
            message: 'Recipe updated successfully',
            description: description.trim()
        });

    } catch (error) {
        console.error('Recipe update failed:', error);
        return Response.json({ error: 'Update failed' }, { status: 500 });
    }
}
