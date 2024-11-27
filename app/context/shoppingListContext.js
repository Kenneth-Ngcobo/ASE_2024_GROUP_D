'use client'

import React, { createContext, useReducer, useContext, useEffect } from 'react';

const ShoppingListContext = createContext();

const initialState = {
  items: [],
};

const shoppingListReducer = (state, action) => {
  let newState;
  switch (action.type) {
    case 'ADD_ITEM':
      // Prevent adding duplicate items
      if (state.items.some(item => item.id === action.payload.id)) {
        return state;
      }
      newState = { ...state, items: [...state.items, action.payload] };
      // Save to localStorage
      localStorage.setItem('shoppingList', JSON.stringify(newState.items));
      return newState;

    case 'REMOVE_ITEM':
      newState = {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
      };
      localStorage.setItem('shoppingList', JSON.stringify(newState.items));
      return newState;

    case 'CLEAR_LIST':
      localStorage.removeItem('shoppingList');
      return {
        ...state,
        items: [],
      };

    case 'TOGGLE_PURCHASED':
      newState = {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id 
            ? { ...item, purchased: !item.purchased } 
            : item
        ),
      };
      localStorage.setItem('shoppingList', JSON.stringify(newState.items));
      return newState;

    case 'UPDATE_QUANTITY':
      newState = {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id 
            ? { ...item, quantity: action.payload.quantity } 
            : item
        ),
      };
      localStorage.setItem('shoppingList', JSON.stringify(newState.items));
      return newState;

    case 'LOAD_ITEMS':
      return {
        ...state,
        items: action.payload,
      };

    default:
      return state;
  }
};

export const ShoppingListProvider = ({ children }) => {
  const [state, dispatch] = useReducer(shoppingListReducer, initialState);

  // Load items from localStorage when the provider mounts
  useEffect(() => {
    const savedItems = localStorage.getItem('shoppingList');
    if (savedItems) {
      dispatch({
        type: 'LOAD_ITEMS',
        payload: JSON.parse(savedItems)
      });
    }
  }, []);

  return (
    <ShoppingListContext.Provider value={{ state, dispatch }}>
      {children}
    </ShoppingListContext.Provider>
  );
};

export const useShoppingList = () => {
  const context = useContext(ShoppingListContext);
  if (context === undefined) {
    throw new Error('useShoppingList must be used within a ShoppingListProvider');
  }
  return context;
};
