/**
 * @fileoverview API endpoint for generating personalized recipe recommendations based on user reviews
 * @requires mongodb
 */

import connectToDatabase from '../../../db'

/**
 * Database schema for a review document
 * @typedef {Object} Review
 * @property {ObjectId} _id - Unique identifier for the review
 * @property {string} email - Email of the user who left the review
 * @property {ObjectId} productId - ID of the reviewed recipe
 * @property {number} rating - Rating given (1-10)
 * @property {Date} createdAt - When the review was created
 */

/**
 * Database schema for a recipe document
 * @typedef {Object} Recipe
 * @property {ObjectId} _id - Unique identifier for the recipe
 * @property {string} name - Name of the recipe
 * @property {string} category - Category the recipe belongs to
 * @property {string[]} tags - Array of tags associated with the recipe
 */

/**
 * Recommendation response object
 * @typedef {Object} Recommendation
 * @property {ObjectId} _id - Recipe ID
 * @property {string} name - Recipe name
 * @property {string} category - Recipe category
 * @property {number} averageRating - Average rating of the recipe
 */

/**
 * Handles GET requests for recipe recommendations
 * @async
 * @param {Object} req - Next.js request object
 * @param {Object} req.query - Query parameters
 * @param {string} req.query.email - User's email to get recommendations for
 * @param {Object} res - Next.js response object
 * @returns {Promise<void>}
 */
export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { email } = req.query;
        if (!email) {
            return res.status(400).json({ message: 'email is required' });
        }

        const db = await connectToDatabase();

        /**
         * Retrieves user's most recent high-rated review
         * @type {Review[]}
         */
        const latestHighReview = await db.collection('reviews')
            .find({
                email: email,
                rating: { $gt: 8 }
            })
            .sort({ 
                createdAt: -1 
            })
            .limit(1)
            .toArray();

        if (latestHighReview.length === 0) {
            return res.status(200).json([]);
        }

        /**
         * Gets full recipe details for the reviewed item
         * @type {Recipe}
         */
        const reviewedRecipe = await db.collection('recipes')
            .findOne({ 
                _id: latestHighReview[0].productId 
            });

        if (!reviewedRecipe) {
            return res.status(200).json([]);
        }

        /**
         * MongoDB aggregation pipeline for finding recommendations
         * @type {Recommendation[]}
         */
        const recommendations = await db.collection('recipes').aggregate([
            // STAGE 1: Match recipes in same category
            {
                $match: {
                    category: reviewedRecipe.category,
                    _id: { $ne: reviewedRecipe._id }
                }
            },

            // STAGE 2: Join with reviews collection
            {
                $lookup: {
                    from: 'reviews',
                    localField: '_id',
                    foreignField: 'productId',
                    as: 'reviews'
                }
            },

            // STAGE 3: Add calculated fields
            {
                $addFields: {
                    averageRating: {
                        $avg: '$reviews.rating'
                    }
                }
            },

            // STAGE 4: Filter by minimum rating
            {
                $match: {
                    averageRating: { $gt: 8 }
                }
            },

            // STAGE 5: Sort by rating
            {
                $sort: {
                    averageRating: -1
                }
            },

            // STAGE 6: Limit results
            {
                $limit: 10
            },

            // STAGE 7: Shape output
            {
                $project: {
                    name: 1,
                    category: 1,
                    averageRating: 1,
                    reviews: 0
                }
            }
        ]).toArray();

        res.status(200).json(recommendations);

    } catch (error) {
        /**
         * Error handler for recommendation generation
         * @type {Error}
         */
        console.error('Recommendation error:', error);
        res.status(500).json({ 
            message: 'Error generating recommendations'
        });
    }
}

/**
 * API Usage Example:
 * GET /api/recommendations?email=user@example.com
 * 
 * @example
 * // Response format:
 * {
 *   _id: "507f1f77bcf86cd799439011",
 *   name: "Chocolate Cake",
 *   category: "Desserts",
 *   averageRating: 9.2
 * }[]
 */