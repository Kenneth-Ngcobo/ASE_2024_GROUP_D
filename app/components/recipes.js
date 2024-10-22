'use client'

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Recipes({ recipes }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (recipes) {
      setLoading(false);
    }
  }, [recipes]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-4">Error: {error}</div>;

  return (
    <div>
      <h1>Recipes</h1>
      <div>
        {recipes && recipes.map((recipe) => (
          <Link href={`/recipes/${recipe.id}`} key={recipe.id}>
            
              <h2>{recipe.title}</h2>
              <p>Published: {new Date(recipe.published).toDateString()}</p>
              <p><strong>Prep Time:</strong> {recipe.prep} minutes</p>
              <p><strong>Cook Time:</strong> {recipe.cook} minutes</p>
              <p><strong>Servings:</strong> {recipe.servings}</p>
              <p><strong>Category:</strong> {recipe.category}</p>
          
          </Link>
        ))}
      </div>
    </div>
  );
    </div>
  );
}
