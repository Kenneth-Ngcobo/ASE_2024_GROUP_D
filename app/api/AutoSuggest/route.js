import { connectToDatabase } from '../../../db';
import Fuse from 'fuse.js';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');
    const limit = 10; // Set maximum number of results

    if (!query || query.length < 2) { // Add minimum query length check
        return new Response(JSON.stringify({ error: 'Query must be at least 2 characters' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const db = await connectToDatabase();
        const recipesCollection = db.collection('recipes');

        // Optimize database query by:
        // 1. Only fetching necessary fields
        // 2. Using case-insensitive regex for initial filtering
        // 3. Limiting the initial results
        const regexQuery = new RegExp(query, 'i');
        const allRecipes = await recipesCollection
            .find(
                { title: regexQuery },
                { projection: { title: 1, _id: 1 } }
            )
            .limit(50) // Fetch slightly more than needed for fuzzy matching
            .toArray();

        // Set up Fuse.js for fuzzy searching with optimized options
        const fuse = new Fuse(allRecipes, {
            keys: ['title'],
            includeScore: true,
            threshold: 0.4,
            shouldSort: true,
            minMatchCharLength: 2
        });

        // Get results and limit them
        const results = fuse.search(query)
            .slice(0, limit) // Limit to 10 results
            .map(result => ({
                id: result.item._id,
                title: result.item.title,
                score: result.score
            }));

        return new Response(JSON.stringify(results), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=300' // Add caching for 5 minutes
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