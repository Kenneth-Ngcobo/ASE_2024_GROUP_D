'use client';

import { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const ShoppingListPage = () => {
    const [shoppingList, setShoppingList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [notification, setNotification] = useState(null);
    const [newItemName, setNewItemName] = useState('');
    const [newItemQuantity, setNewItemQuantity] = useState(1);

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
    setTimeout(() => setNotification(null), 3000);
    };
    
    const addItem = async (name, quantity) => {
        try {
          const response = await fetch('/api/shopping_lists', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, quantity }),
          });
    
          const data = await response.json();
          if (data.success) {
            setShoppingList((prevList) => [...prevList, data.item]);
            setNewItemName('');
            setNewItemQuantity(1);
            showNotification('Item added successfully!');
          } else {
            throw new Error('Failed to add item');
          }
        } catch (error) {
          console.error('Error adding item:', error);
        }
      };
    
      const handleAddItem = (event) => {
        event.preventDefault();
        if (newItemName.trim() === '') {
          showNotification('Item name cannot be empty');
          return;
        }
        addItem(newItemName, newItemQuantity);
      };

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

  const markAsPurchased = async (id) => {
    try {
      const response = await fetch('/api/shopping_lists/purchased', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, action: 'togglePurchased' }),
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

  const updateQuantity = async (id, quantity) => {
    try {
      const response = await fetch('/api/shopping_lists/quantity', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, quantity, action: 'updateQuantity' }),
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

      <form className="mb-4 flex space-x-2" onSubmit={handleAddItem}>
        <input
          type="text"
          placeholder="Item name"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          className="px-2 py-1 border rounded w-full"
          required
        />
        <input
          type="number"
          min="1"
          placeholder="Quantity"
          value={newItemQuantity}
          onChange={(e) => setNewItemQuantity(Number(e.target.value))}
          className="w-16 px-2 py-1 border rounded"
        />
        <button
          type="submit"
          className="bg-[#edd282] text-[#020123] px-3 py-1 rounded"
        >
          Add
        </button>
      </form>

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
                  onChange={(event) => updateQuantity(item._id, event.target.value)}
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
            className="bg-[#ff4f1a] dark:bg-[#e63600] text-[#020123] dark:text-[#dddcfe] px-4 py-2 rounded"
          >
            Clear List
          </button>
          <button
            onClick={shareOnWhatsApp}
            className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
          >
            <FaWhatsapp size={20} className="mr-2" />
            Share on WhatsApp
          </button>
        </div>
      )}
    </div>
  );
};

export default ShoppingListPage;
