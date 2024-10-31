import { connectToDatabase } from '../../../db';

// Cache configuration
const queryCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

// Ensure MongoDB title indexing
async function createTitleIndex() {
    const db = await connectToDatabase();
    const recipes = db.collection('recipes');
    await recipes.createIndex({ title: 1 });
}
createTitleIndex();

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('search')?.trim().toLowerCase() || ''; // Match parameter 'search' used by searchbar.js
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 10);

    if (!query || query.length < 2) {
        return new Response(JSON.stringify({
            suggestions: [],
            message: 'Query must be at least 2 characters'
        }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    try {
        // Check cache
        const cacheKey = `${query}_${limit}`;
        const cachedResult = queryCache.get(cacheKey);
        if (cachedResult && Date.now() - cachedResult.timestamp < CACHE_DURATION) {
            return new Response(JSON.stringify(cachedResult.data), {
                status: 200,
                headers: { 'Content-Type': 'application/json', 'X-Cache': 'HIT' }
            });
        }

        // Fetch from DB
        const db = await connectToDatabase();
        const recipes = db.collection('recipes');
        const sanitizedQuery = query.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
        const searchQuery = { title: new RegExp(`^${sanitizedQuery}`, 'i') };
        const projection = { _id: 1, title: 1, description: 1, cookTime: 1 };

        const results = await recipes.find(searchQuery).project(projection).limit(limit).toArray();

        // Highlight and format suggestions
        const suggestions = results.map(recipe => ({
            id: recipe._id,
            title: recipe.title,
            description: recipe.description,
            cookTime: recipe.cookTime,
            highlights: highlightMatches(recipe.title, query)
        }));

        // Include a message when no suggestions are found
   const responseData = {
    suggestions,
    total: suggestions.length,
    query,
    message: suggestions.length === 0 ? 'No recipes found' : undefined
       };

        // Cache and respond
        queryCache.set(cacheKey, { data: responseData, timestamp: Date.now() });
        cleanCache();

        return new Response(JSON.stringify(responseData), {
            status: 200,
            headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=300', 'X-Cache': 'MISS' }
        });
    } catch (error) {
        console.error('Autosuggest error:', error);
        return new Response(JSON.stringify({ error: 'Internal server error', suggestions: [] }), {
            status: 500, headers: { 'Content-Type': 'application/json' }
        });
    }
}

// Helpers for highlight matches and cache cleanup
function highlightMatches(text, query) {
    const sanitizedQuery = query.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(${sanitizedQuery})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) => ({ text: part, isMatch: regex.test(part) }));
}

function cleanCache() {
    const now = Date.now();
    for (const [key, value] of queryCache.entries()) {
        if (now - value.timestamp > CACHE_DURATION) queryCache.delete(key);
    }
}

setInterval(() => {
    if (queryCache.size > 1000) {
        const oldestEntries = Array.from(queryCache.entries()).sort(([, a], [, b]) => a.timestamp - b.timestamp).slice(0, 500);
        for (const [key] of oldestEntries) queryCache.delete(key);
    }
}, 60000); 