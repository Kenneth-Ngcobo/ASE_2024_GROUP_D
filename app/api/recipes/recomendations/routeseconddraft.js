/**
 * @fileoverview API endpoint for generating personalized recipe recommendations based on user’s high-rated reviews and similar tags
 * @requires mongodb
 */

import connectToDatabase from '../../../db';

/**
 * Handles GET requests for recipe recommendations
 * @async
 * @param {Object} req - Next.js request object
 * @param {Object} req.query - Query parameters
 * @param {string} req.query.userId - ID of the user to get recommendations for
 * @param {Object} res - Next.js response object
 * @returns {Promise<void>}
 */
export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const db = await connectToDatabase();
        
        // Step 1: Retrieve user's reviews and sort by rating (highest first)
        const user = await db.collection('users').findOne({ _id: userId });
        
        if (!user || !user.reviews) {
            return res.status(200).json([]);
        }

        // Step 2: Sort reviews by rating (highest-rated first) and prioritize ratings of 10
        const sortedReviews = user.reviews
            .filter(review => review.rating >= 8) // Consider only reviews with rating >= 8
            .sort((a, b) => b.rating - a.rating) // Highest ratings first
        
        // Step 3: Prioritize top reviews (max of 10 reviews for recommendation)
        const topReviews = sortedReviews.slice(0, 10);

        // Step 4: Get similar recipes based on tags
        const recommendations = [];
        
        for (const { product: productId, rating } of topReviews) {
            // Fetch the recipe details to get tags for the reviewed product
            const reviewedRecipe = await db.collection('recipes').findOne({ _id: productId });
            
            if (!reviewedRecipe || !reviewedRecipe.tags) {
                continue;
            }

            // Use tags to find similar recipes (exclude the original productId)
            const similarRecipes = await db.collection('recipes').aggregate([
                { $match: { _id: { $ne: productId }, tags: { $in: reviewedRecipe.tags } } },
                {
                    $lookup: {
                        from: 'reviews',
                        localField: '_id',
                        foreignField: 'productId',
                        as: 'reviews'
                    }
                },
                { $addFields: { averageRating: { $avg: '$reviews.rating' } } },
                { $match: { averageRating: { $gte: 8 } } },
                { $project: { name: 1, category: 1, tags: 1, averageRating: 1 } },
                { $sort: { averageRating: -1 } },
                { $limit: 10 }
            ]).toArray();

            recommendations.push(...similarRecipes);

            // Limit recommendations to max 10 for carousel
            if (recommendations.length >= 10) break;
        }

        res.status(200).json(recommendations.slice(0, 10));

    } catch (error) {
        console.error('Recommendation error:', error);
        res.status(500).json({ message: 'Error generating recommendations' });
    }
}

/**
 * API Usage Example:
 * GET /api/recommendations?userId=507f1f77bcf86cd799439011
 */
