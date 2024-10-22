'use client';
import React, { useEffect, useState } from 'react';
import RecipeGrid from './components/RecipeGrid';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await fetch('/api/recipes?page=1&limit=20');
        const data = await response.json();
        setRecipes(data.recipes);
      } catch (error) {
        console.error('Failed to fetch recipes:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecipes();
  }, []);

  return (
    <div className="container mx-auto">
      {loading ? (
        <p>Loading recipes...</p>
      ) : (
        <RecipeGrid recipes={recipes} />
      )}
    </div>
  );
};

export default HomePage;
