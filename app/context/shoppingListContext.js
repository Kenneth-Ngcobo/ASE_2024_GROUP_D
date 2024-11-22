
'use client'

import React, { createContext, useReducer, useContext, useEffect } from 'react';

const ShoppingListContext = createContext();

const initialState = {
  items: [],
};

const shoppingListReducer = (state, action) => {
  switch (action.type) {
   /* case 'SET_ITEMS':
      return { ...state, items: action.payload };*/
    case 'ADD_ITEM':
      if (state.items.some(item => item.id === action.payload.id)) {
        return state;
      }
      return { ...state, items: [...state.items, action.payload] };
      case 'TOGGLE_PURCHASED':
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, purchased: !item.purchased }
              : item
          ),
        };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
      };
    case 'CLEAR_LIST':
      return initialState;
    default:
      return state;
  }
};

export const ShoppingListProvider = ({ children }) => {
  const [state, dispatch] = useReducer(shoppingListReducer, initialState);


  return (
    <ShoppingListContext.Provider value={{ state, dispatch }}>
      {children}
    </ShoppingListContext.Provider>
  );
};

export const useShoppingList = () => useContext(ShoppingListContext);

