'use client'


import React, { useState } from 'react';
import { useShoppingList } from '../context/ShoppingListContext';

const AddItemForm = () => {
  const [name, setName] = useState('');
  const { dispatch } = useShoppingList();

  const addItem = (e) => {
    e.preventDefault();
    dispatch({
      type: 'ADD_ITEM',
      payload: { id: Date.now(), name, purchased: false },
    });
    setName('');
  };

  return (
    <form onSubmit={addItem}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Add an item"
        required
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddItemForm;
