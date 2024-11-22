
'use client'

import { useState, useEffect } from 'react';
import { useShoppingList } from '../context/shoppingListContext';

const ShoppingList = () => {
    const { state, dispatch } = useShoppingList();
    
    const [newItemName, setNewItemName] = useState('');
    const [newItemQuantity, setNewItemQuantity] = useState('');
  
  
  useEffect(() => {
    setNewItemName(true)
  },[])

  const removeItem = (id) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: { id },
    });
  };

  const clearList = () => {
    dispatch({ type: 'CLEAR_LIST' });
  };

  const togglePurchased = (id) => {
    dispatch({
      type: 'TOGGLE_PURCHASED',
      payload: { id },
    });
    };
    
    const handleAddItem = (e) => {
        e.preventDefault();

        if (!newItemName.trim()) {
            setError('Please enter a valid item name');
            return;
        }
    // Dispatch the action to add the new item
    dispatch({
        type: 'ADD_ITEM',
        payload: { 
          id: newItemName.toLowerCase().replace(/\s+/g, '-'),  // Generate an ID based on the name
          name: `${newItemName} - ${newItemQuantity || 'N/A'}`, // Include the quantity if provided
          purchased: false
        },
      });
  
      // Clear the input fields after adding
      setNewItemName('');
      setNewItemQuantity('');
      setError('');
    };

    

    return (
        <div className="shopping-list p-4 bg-white rounded shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Shopping List</h2>
    
          {/* Form to add items manually */}
          <form onSubmit={handleAddItem} className="mb-4 flex space-x-4">
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="Item name"
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              value={newItemQuantity}
              onChange={(e) => setNewItemQuantity(e.target.value)}
              placeholder="Quantity (optional)"
              className="border p-2 rounded w-1/4"
            />
           <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Add Item
            </button>
          </form>*
    
          {/* List of items */}
          <ul>
            {state.items.map((item) => (
              <li
                key={item.id}
                className={`flex justify-between items-center mb-2 ${item.purchased ? 'line-through text-gray-500' : ''}`}
              >
                <div className="flex items-center">
                  {/* Checkbox to mark item as purchased */}
                  <input
                    type="checkbox"
                    checked={item.purchased}
                    onChange={() => togglePurchased(item.id)}
                    className="mr-2"
                  />
                  <span>{item.name}</span>
                </div>
    
                <div>
                  {/* Remove Item Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 ml-2"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
    
          {/* Clear List Button */}
            <button onClick={clearList} className="mt-4 bg-red-500 text-white p-2 rounded">Clear List</button>
            <addItemForm/>
        </div>
      );
    };
    
    export default ShoppingList;