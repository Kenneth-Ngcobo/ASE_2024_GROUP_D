'use client';

import { useEffect, useState } from 'react';

/**
 * Renders the shopping list page, displaying items fetched from the API.
 * 
 * @component
 * @returns {JSX.Element} Shopping list with functionality to delete items
 */
const ShoppingListPage = () => {
  const [shoppingList, setShoppingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the shopping list items from the API when the component mounts
  useEffect(() => {
    const fetchShoppingList = async () => {
      try {
        const response = await fetch('/api/shoppingList'); // Corrected endpoint
        const data = await response.json();
        if (data.success) {
          setShoppingList(data.data);
        } else {
          throw new Error('Failed to fetch shopping list');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShoppingList();
  }, []);

  /**
   * Deletes an item from the shopping list.
   * 
   * @param {string} id - The ID of the item to delete
   */
  const deleteItem = async (id) => {
    try {
      const response = await fetch('/api/shoppingList', { // Corrected endpoint
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();
      if (data.success) {
        setShoppingList((prevList) => prevList.filter((item) => item._id !== id));
      } else {
        throw new Error('Failed to delete item');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Shopping List</h1>
      {shoppingList.length === 0 ? (
        <div>Your shopping list is empty.</div>
      ) : (
        <ul className="space-y-2">
          {shoppingList.map((item) => (
            <li key={item._id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
              <div>
                <span className="text-gray-700 dark:text-gray-300">{item.name}</span> -{' '}
                <span className="text-gray-500 dark:text-gray-400">{item.quantity}</span>
              </div>
              <button
                onClick={() => deleteItem(item._id)}
                className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShoppingListPage;
