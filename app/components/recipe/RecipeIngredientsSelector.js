'use client';

import { useState } from 'react';
import { useShoppingList } from '../../context/ShoppingListContext';
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
  const { dispatch } = useShoppingList();
  const [selectedIngredients, setSelectedIngredients] = useState(new Set());
  const router = useRouter();

  /**
   * Toggles an ingredient's selection state.
   * Adds or removes the ingredient from the selectedIngredients set.
   * 
   * @param {string} ingredient - The name of the ingredient
   * @param {string} amount - The quantity of the ingredient
   */
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
   * Dispatches an 'ADD_ITEM' action for each selected ingredient.
   * Navigates to the shopping list page after adding.
   */
  const addSelectedToList = () => {
    Object.entries(ingredients).forEach(([ingredient, amount]) => {
      const ingredientId = `${ingredient.toLowerCase().replace(/\s+/g, '-')}`;
      if (selectedIngredients.has(ingredientId)) {
        dispatch({
          type: 'ADD_ITEM',
          payload: {
            id: ingredientId,
            name: ingredient,
            quantity: amount,
            purchased: false
          }
        });
      }
    });
    // Clear selections after adding
    setSelectedIngredients(new Set());
    // Navigate to shopping list page
    router.push('/shopping-list');
  };

  /**
   * Adds all ingredients to the shopping list.
   * Dispatches an 'ADD_ITEM' action for every ingredient.
   * Navigates to the shopping list page after adding.
   */
  const addAllToList = () => {
    Object.entries(ingredients).forEach(([ingredient, amount]) => {
      const ingredientId = `${ingredient.toLowerCase().replace(/\s+/g, '-')}`;
      dispatch({
        type: 'ADD_ITEM',
        payload: {
          id: ingredientId,
          name: ingredient,
          quantity: amount,
          purchased: false
        }
      });
    });
    // Clear selections after adding
    setSelectedIngredients(new Set());
    // Navigate to shopping list page
    router.push('/shopping-list');
  };

  return (
    <div className="space-y-6">
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