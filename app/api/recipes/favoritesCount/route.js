// /pages/api/favorites/count.js
import connectToDatabase from "../../../../db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const session = await getServerSession(req, res, authOptions);
        if (!session) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const db = await connectToDatabase();
        
        // Get user's favorites document and use array length for count
        const userFavorites = await db.collection('user_favorites').findOne(
            { userId: session.user.id }
        );

        // If no favorites document exists, return count as 0
        const favoritesCount = userFavorites?.favorites?.length || 0;

        return res.status(200).json({
            count: favoritesCount
        });

    } catch (error) {
        console.error('Error fetching favorites count:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}