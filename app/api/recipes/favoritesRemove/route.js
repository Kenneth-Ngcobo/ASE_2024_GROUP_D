// /pages/api/favorites/remove.js
import connectToDatabase from "../../../../db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const session = await getServerSession(req, res, authOptions);
        if (!session) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const { recipeId } = req.body;
        if (!recipeId) {
            return res.status(400).json({ message: 'Recipe ID is required' });
        }

        const db = await connectToDatabase();
        
        const result = await db.collection('user_favorites').updateOne(
            { userId: session.user.id },
            {
                $pull: { favorites: recipeId }
            }
        );

        return res.status(200).json({
            message: 'Recipe removed from favorites',
            success: true
        });

    } catch (error) {
        console.error('Error removing favorite:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}