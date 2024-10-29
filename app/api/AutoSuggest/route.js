import { connectToDatabase } from '../../../db'; // Adjust path if necessary
import Fuse from 'fuse.js';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');

    if (!query) {
        return new Response(JSON.stringify({ error: 'Query parameter is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const db = await connectToDatabase();
        const recipesCollection = db.collection('recipes');

        // Fetch all recipes (if the dataset is too large, consider fetching only necessary fields)
        const allRecipes = await recipesCollection.find({}, { projection: { title: 1 } }).toArray();

        // Set up Fuse.js for fuzzy searching
        const fuse = new Fuse(allRecipes, {
            keys: ['title'],
            includeScore: true,
            threshold: 0.4, // Adjust the threshold for search sensitivity
        });

        const results = fuse.search(query).map(result => result.item);
        console.log(results);

        return new Response(JSON.stringify(results), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error in autosuggest route:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
