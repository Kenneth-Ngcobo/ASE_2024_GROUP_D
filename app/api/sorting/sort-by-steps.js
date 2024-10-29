import dbConnect from '../../../lib/dbConnect';
import Recipe from '../../../models/Recipe';

export default async function handler(req, res) {
    await dbConnect();

    const { order = 'asc' } = req.query;
    const sortOrder = order === 'desc' ? -1 : 1;

    try {
        const recipes = await Recipe.find().sort({ stepsCount: sortOrder });
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching recipes', error });
    }
}
