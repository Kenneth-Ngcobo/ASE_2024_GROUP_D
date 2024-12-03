// CheckRecipePopularity.js
import connectToDatabase from '../db';
import { sendNotification } from './actions/Actions';

export async function checkRecipePopularity() {
  const db = await connectToDatabase();
  const users = await db.collection('users').find().toArray();
  const recipes = await db.collection('recipes').find().toArray();

  for (const user of users) {
    for (const favoriteRecipeId of user.favorites) {
      const recipe = recipes.find(r => r._id === favoriteRecipeId);

      if (recipe && recipe.averageRating >= 4.5 && recipe.reviewCount >= 10) { 
        const message = {
          recipeId: recipe._id,
          text: `Your favorite recipe "${recipe.title}" is now highly rated. Check out the new reviews!`
        };
        await sendNotification(user._id, message);
      }
    }
  }
}

export async function handler(req, res) {
  try {
    await checkRecipePopularity();
    res.status(200).json({ message: 'Checked recipe popularity successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
