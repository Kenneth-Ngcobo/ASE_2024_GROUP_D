'use client';

import { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

/**
 * Renders the shopping list page, displaying items fetched from the API.
 * 
 * @component
 * @returns {JSX.Element} Shopping list with functionality to delete items, mark items as purchased, share on WhatsApp, and adjust quantities.
 */
const ShoppingListPage = () => {
  const [shoppingList, setShoppingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  // Fetch the shopping list items from the API when the component mounts
  useEffect(() => {
    const fetchShoppingList = async () => {
      try {
        const response = await fetch('/api/shopping_lists');
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

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000); // Clear message after 3 seconds
  };


  /**
   * Deletes an item from the shopping list.
   * 
   * @param {string} id - The ID of the item to delete
   */
  const deleteItem = async (id) => {
    try {
      const response = await fetch('/api/shopping_lists', {
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
      console.error('Error deleting item:', error);
    }
  };

  /**
   * Clears all items from the shopping list.
   */
  const clearList = async () => {
    try {
      const response = await fetch('/api/shopping_lists', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clearAll: true }),
      });

      const data = await response.json();
      if (data.success) {
        setShoppingList([]);
      } else {
        throw new Error('Failed to clear shopping list');
      }
    } catch (error) {
      console.error('Error clearing shopping list:', error);
    }
  };

  /**
   * Marks an item as purchased.
   * 
   * @param {string} id - The ID of the item to mark as purchased
   */
  const markAsPurchased = async (id) => {
    try {
      const response = await fetch('/api/shopping_lists/purchased', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();
      if (data.success) {
        setShoppingList((prevList) => prevList.map((item) =>
          item._id === id ? { ...item, purchased: !item.purchased } : item
        ));
      } else {
        throw new Error('Failed to mark item as purchased');
      }
    } catch (error) {
      console.error('Error marking item as purchased:', error);
    }
  };

  /**
   * Updates the quantity of an item.
   * 
   * @param {string} id - The ID of the item to update
   * @param {number} quantity - The new quantity
   */
  const updateQuantity = async (id, quantity) => {
    try {
      const response = await fetch('/api/shopping_lists/quantity', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, quantity }),
      });

      const data = await response.json();
      if (data.success) {
        setShoppingList((prevList) => prevList.map((item) =>
          item._id === id ? { ...item, quantity } : item
        ));
      } else {
        throw new Error('Failed to update quantity');
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleQuantityChange = (id, event) => {
    const quantity = event.target.value;
    if (quantity >= 0) {
      updateQuantity(id, quantity);
    }
  };

  const generateWhatsAppMessage = () => {
    const baseURL = 'https://api.whatsapp.com/send?text=';
    const message = shoppingList.map(item => `${item.name}: ${item.quantity}`).join('\n');
    return `${baseURL}${encodeURIComponent(`Here is my shopping list:\n${message}`)}`;
  };

  const shareOnWhatsApp = () => {
    const url = generateWhatsAppMessage();
    window.open(url, '_blank');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mx-auto py-6">
      {notification && (
        <div className="mb-4 bg-green-200 text-green-800 p-2 rounded">
          {notification}
        </div>
      )}
      <h1 className="text-2xl text-[#fc9d4f] dark:text-[#b05103] font-semibold mb-4">Shopping List</h1>
      <ul className="space-y-4">
        {shoppingList.length > 0 ? (
          shoppingList.map((item) => (
            <li key={item._id} className={`flex items-center justify-between ${item.purchased ? 'line-through' : ''}`}>
              <span>{item.name}</span>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="0"
                  value={item.quantity}
                  onChange={(event) => handleQuantityChange(item._id, event)}
                  className="w-16 px-2 py-1 border rounded"
                />
                <button
                  className={`px-3 py-1 rounded ${item.purchased ? 'bg-gray-500 text-white' : 'bg-[#edd282] text-[#020123]'}`}
                  onClick={() => markAsPurchased(item._id)}
                >
                  {item.purchased ? 'Unmark' : 'Mark as Purchased'}
                </button>
                <button
                  className="bg-[#fc9d4f] dark:bg-[#b05103] text-[#020123] dark:text-[#dddcfe] px-3 py-1 rounded"
                  onClick={() => deleteItem(item._id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>Your shopping list is empty.</p>
        )}
      </ul>
      {shoppingList.length > 0 && (
        <div className="flex space-x-4 mt-4">
          <button
            onClick={clearList}
            className="bg-[#ff4f1a] dark:bg-[#e63600] text-[#020123] dark:text-[ #dddcfe] px-4 py-2 rounded"
          >
            Clear List
          </button>
          <button
            onClick={shareOnWhatsApp}
            className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
          >
            <FaWhatsapp size={20} className="mr-2" />

          </button>
        </div>
      )}
    </div>
  );
};

export default ShoppingListPage;


