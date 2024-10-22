import { fetchRecipes } from './api'
import Recipes from './components/recipes';
import RecipeDetails from './Recipe/[id]/page';

export default async function Home() {
  let recipes = [];
  let error = null;

  try {
    recipes = await fetchRecipes();
  } catch (e) {
    error = e.message;
  }

  return (
    <>
      <Recipes recipes={recipes} />
      <RecipeDetails />
      {error && <div className="text-red-500 text-center p-4">Error: {error}</div>}
    </>
  );
}
