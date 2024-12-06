'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Renders a list of recipe ingredients with selection and shopping list functionality.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.ingredients - Object containing ingredients and their amounts
 * @returns {JSX.Element} Ingredient list with add to shopping list options
 */
const RecipeIngredientsSection = ({ ingredients }) => {
  const [selectedIngredients, setSelectedIngredients] = useState(new Set());
  const [notification, setNotification] = useState(null);
  const router = useRouter();

  /**
   * Toggles an ingredient's selection state.
   * Adds or removes the ingredient from the selectedIngredients set.
   * 
   * @param {string} ingredient - The name of the ingredient
   * @param {string} amount - The quantity of the ingredient
   * 
   * 
   */

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const toggleIngredient = (ingredient, amount) => {
    const newSelected = new Set(selectedIngredients);
    const ingredientId = `${ingredient.toLowerCase().replace(/\s+/g, '-')}`;

    if (newSelected.has(ingredientId)) {
      newSelected.delete(ingredientId);
    } else {
      newSelected.add(ingredientId);
    }
    setSelectedIngredients(newSelected);
  };

  /**
   * Adds selected ingredients to the shopping list.
   * Sends a POST request to the API for each selected ingredient.
   * Navigates to the shopping list page after adding.
   */
  const addSelectedToList = async () => {
    for (const [ingredient, amount] of Object.entries(ingredients)) {
      const ingredientId = `${ingredient.toLowerCase().replace(/\s+/g, '-')}`;
      if (selectedIngredients.has(ingredientId)) {
        await fetch('/api/shopping_lists', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: ingredientId,
            name: ingredient,
            quantity: amount,
            purchased: false,
          }),
        });
      }
    }
    // Clear selections after adding
    setSelectedIngredients(new Set());
    showNotification('Selected ingredients added to shopping list!');
    // Navigate to shopping list page
    router.push('/ShoppingList');
  };

  /**
   * Adds all ingredients to the shopping list.
   * Sends a POST request to the API for every ingredient.
   * Navigates to the shopping list page after adding.
   */
  const addAllToList = async () => {
    for (const [ingredient, amount] of Object.entries(ingredients)) {
      const ingredientId = `${ingredient.toLowerCase().replace(/\s+/g, '-')}`;
      await fetch('/api/shopping_lists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: ingredientId,
          name: ingredient,
          quantity: amount,
          purchased: false,
        }),
      });
    }
    // Clear selections after adding
    setSelectedIngredients(new Set());
    showNotification('All ingredients added to shopping list!');
    // Navigate to shopping list page
    router.push('/ShoppingList');
  };

  return (
    <div className="space-y-6">
            {notification && (
        <div className="mb-4 bg-green-200 text-green-800 p-2 rounded">
          {notification}
        </div>
      )}
      <div className="flex justify-end gap-4 mb-4">
        <button
          onClick={addSelectedToList}
          disabled={selectedIngredients.size === 0}
          className={`px-4 py-2 rounded-lg text-sm ${selectedIngredients.size === 0
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-[#fc9d4f] hover:bg-[#edd282] text-white'
            }`}
        >
          Add Selected ({selectedIngredients.size})
        </button>
        <button
          onClick={addAllToList}
          className="bg-[#fc9d4f] hover:bg-[#edd282] text-[#020123] px-4 py-2 rounded-lg text-sm"
        >
          Add All
        </button>
      </div>
      <div className="space-y-2">
        {Object.entries(ingredients).map(([ingredient, amount]) => (
          <div key={ingredient} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={selectedIngredients.has(ingredient.toLowerCase().replace(/\s+/g, '-'))}
                onChange={() => toggleIngredient(ingredient, amount)}
                className="form-checkbox h-5 w-5 text-[#fc9d4f] rounded border-gray-300 focus:ring-[#fc9d4f]"
              />
              <span className="text-gray-700 dark:text-gray-300">{ingredient}</span>
            </div>
            <span className="text-gray-500 dark:text-gray-400">{amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeIngredientsSection;
