// /pages/api/favorites/list.js
import connectToDatabase from "../../../../db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        // Verify user is authenticated
        const session = await getServerSession(req, res, authOptions);
        if (!session) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const db = await connectToDatabase();
        
        // First get the user's favorites list
        const userFavorites = await db.collection('user_favorites').findOne(
            { userId: session.user.id }
            
        );
        console.log('Received a request');

        // If user has no favorites yet, return empty array
        if (!userFavorites || !userFavorites.favorites || userFavorites.favorites.length === 0) {
            return res.status(200).json({ 
                favorites: [],
                totalCount: 0
            });
        }

        // Get pagination parameters from query string
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Fetch the full recipe details for favorites with pagination
        const favoriteRecipes = await db.collection('recipes')
            .find({ _id: { $in: userFavorites.favorites } })
            .skip(skip)
            .limit(limit)
            .toArray();

        // Get total count for pagination
        const totalCount = userFavorites.favorites.length;

        // Calculate pagination metadata
        const totalPages = Math.ceil(totalCount / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;

        return res.status(200).json({
            favorites: favoriteRecipes.map(recipe => ({
                _id: recipe._id,
                title: recipe.title,
                description: recipe.description,
                category: recipe.category,
                images: recipe.images,
                prep: recipe.prep,
                cook: recipe.cook,
                servings: recipe.servings,
                // Add any other recipe fields you want to include
            })),
            pagination: {
                currentPage: page,
                totalPages,
                totalCount,
                hasNextPage,
                hasPrevPage,
                limit
            }
        });

    } catch (error) {
        console.error('Error fetching favorited recipes:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}