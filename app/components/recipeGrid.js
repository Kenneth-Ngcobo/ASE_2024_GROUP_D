
import React from 'react';
import recipes from './Recipes';

const RecipeGrid = ({ recipes }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {recipes.map((recipe) => (
        <recipes key={recipe._id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeGrid;
