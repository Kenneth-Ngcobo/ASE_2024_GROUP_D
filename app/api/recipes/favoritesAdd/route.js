// /pages/api/favorites/add.js
import connectToDatabase from "../../../../db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        // Get user session
        const session = await getServerSession(req, res, authOptions);
        
        // Check if user is authenticated
        if (!session) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Get recipe ID from request body
        const { recipeId } = req.body;
        
        if (!recipeId) {
            return res.status(400).json({ message: 'Recipe ID is required' });
        }

        // Connect to database
        const db = await connectToDatabase();
        
        // First, verify that the recipe exists
        const recipe = await db.collection('recipes').findOne({
            _id: recipeId
        });

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        // Add to favorites collection using upsert
        // This will either create a new document for the user or update existing one
        const result = await db.collection('user_favorites').updateOne(
            { userId: session.user.id },
            {
                $addToSet: { // Use addToSet instead of push to avoid duplicates
                    favorites: recipeId
                }
            },
            { upsert: true }
        );

        return res.status(200).json({
            message: 'Recipe added to favorites',
            success: true
        });

    } catch (error) {
        console.error('Error adding favorite:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}