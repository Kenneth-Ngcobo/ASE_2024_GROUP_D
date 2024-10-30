'use client'; 
import React, { useEffect, useState } from 'react';

export default function IngredientsDisplay() {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false); 

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch('/api/recipes/ingredients'); 
        if (!response.ok) {
          throw new Error('Failed to fetch ingredients');
        }
        const data = await response.json();
        setIngredients(data);
        console.log('Fetched ingredients:', data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIngredients();
  }, []);


  if (loading) {
    return <div>Loading ingredients...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleIngredientSelect = (ingredient) => {
    console.log("Selected ingredient:", ingredient);
    setIsOpen(false); 
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
      <button
        onClick={() => setIsOpen((prev) => !prev)} 
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 transition duration-200"
      >
        Select Ingredients
      </button>
      {isOpen && ( 
        <div className="mt-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {ingredients.map((ingredient, index) => (
              <button
                key={index}
                className="p-2 bg-gray-200 border border-gray-300 rounded hover:bg-gray-300 transition duration-200"
                onClick={() => handleIngredientSelect(ingredient)} 
              >
                {ingredient} 
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
