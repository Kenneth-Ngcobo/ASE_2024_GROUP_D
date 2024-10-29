import dbConnect from '../../../lib/dbConnect';
import Recipe from '../../../models/Recipe';

export default async function handler(req, res) {
    await dbConnect();

    try {
        const recipes = await Recipe.find().sort({ createdAt: -1 }); // Default: newest first
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching recipes', error });
    }
}
