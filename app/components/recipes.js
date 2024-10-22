
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Recipes({ recipes }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (!recipes) {
      setError("No recipes available");
    }
    setLoading(false);
  }, [recipes]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Recipes</h1>
      <div>
        {recipes?.length > 0 ? (
          recipes.map((recipe) => (
            <Link key={recipe.id} href={`/recipes/${recipe.id}`}>
              <div>
                <h2>{recipe.title}</h2>
                <p>Published: {new Date(recipe.published).toDateString()}</p>
                <p><strong>Prep Time:</strong> {recipe.prep} minutes</p>
                <p><strong>Cook Time:</strong> {recipe.cook} minutes</p>
                <p><strong>Servings:</strong> {recipe.servings}</p>
                <p><strong>Category:</strong> {recipe.Category}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
}
