import { connectToDatabase } from '../../../db';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');
    const limit = 10; // Limit the number of results

    if (!query || query.length < 2) { // Minimum query length check
        return new Response(JSON.stringify({ error: 'Query must be at least 2 characters' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const db = await connectToDatabase();
        const recipesCollection = db.collection('recipes');

        // Use MongoDB $text and $regex to perform efficient search
        const regexQuery = new RegExp(`^${query}`, 'i'); // Matches titles starting with the query

        const results = await recipesCollection
            .find(
                {
                    $and: [
                        { title: { $regex: regexQuery } },
                        { $text: { $search: query } }, // Leverage text index for performance
                    ],
                },
                { projection: { title: 1, _id: 1, score: { $meta: "textScore" } } }
            )
            .sort({ score: { $meta: "textScore" } }) // Sort by relevance score
            .limit(limit) // Limit to the specified number of results
            .toArray();

        // Format results for response
        const formattedResults = results.map((recipe) => ({
            id: recipe._id,
            title: recipe.title,
        }));

        return new Response(JSON.stringify(formattedResults), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
            },
        });
    } catch (error) {
        console.error('Error in autosuggest route:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
