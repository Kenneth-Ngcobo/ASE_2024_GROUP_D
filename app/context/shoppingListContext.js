'use client'

import React, { createContext, useContext, useReducer, useEffect } from 'react';

/**
 * Initial state structure for the shopping list context.
 * @typedef {Object} ShoppingListState
 * @property {Array<Object>} items - List of items in the shopping list.
 * @property {string|null} userId - ID of the user associated with the shopping list.
 * @property {boolean} isLoading - Indicates whether the shopping list is being loaded.
 * @property {string|null} error - Error message, if any.
 */

/**
 * Action dispatched to the reducer.
 * @typedef {Object} Action
 * @property {string} type - Type of action.
 * @property {*} [payload] - Additional data required for the action.
 */
const initialState = {
  items: [],
  userId: null,
  isLoading: false,
  error: null
};

/**
 * Reducer function to manage the shopping list state.
 * @param {ShoppingListState} state - Current state.
 * @param {Action} action - Action to update the state.
 * @returns {ShoppingListState} Updated state.
 */
function shoppingListReducer(state, action) {
  switch (action.type) {
    case 'SET_USER_ID':
      return { ...state, userId: action.payload };
    case 'LOAD_LIST_START':
      return { ...state, isLoading: true, error: null };
    case 'LOAD_LIST_SUCCESS':
      return {
        ...state,
        items: action.payload,
        isLoading: false,
        error: null
      };
    case 'LOAD_LIST_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id)
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    case 'TOGGLE_PURCHASED':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, purchased: !item.purchased }
            : item
        )
      };
    case 'CLEAR_LIST':
      return { ...state, items: [] };
    default:
      return state;
  }
}

// Create context
const ShoppingListContext = createContext();

/**
 * Provider component for the ShoppingListContext.
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Child components to render.
 * @returns {JSX.Element} Context provider for shopping list.
 */
export function ShoppingListProvider({ children }) {
  const [state, dispatch] = useReducer(shoppingListReducer, initialState);

  /**
   * Loads the shopping list for the specified user.
   * @async
   * @param {string} userId - ID of the user.
   */
  const syncLoadList = async (userId) => {
    if (!userId) return;

    dispatch({ type: 'LOAD_LIST_START' });
    try {
      const response = await fetch(`/api/shopping-list?userId=${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch shopping list');
      }
      const data = await response.json();
      dispatch({
        type: 'LOAD_LIST_SUCCESS',
        payload: data.data.items || []
      });
    } catch (error) {
      dispatch({
        type: 'LOAD_LIST_ERROR',
        payload: error.message
      });
    }
  };

  /**
   * Adds a new item to the shopping list.
   * @async
   * @param {string} userId - ID of the user.
   * @param {Object} newItem - New item to add.
   */
  const syncAddItem = async (userId, newItem) => {
    try {
      const response = await fetch('/api/shopping-list', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          newItem: {
            ...newItem,
            _id: newItem.id  // Ensure MongoDB compatible ID
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to add item');
      }

      dispatch({ type: 'ADD_ITEM', payload: newItem });
    } catch (error) {
      console.error('Sync add item failed:', error);
    }
  };

  /**
   * Removes an item from the shopping list.
   * @async
   * @param {string} userId - ID of the user.
   * @param {string} itemId - ID of the item to remove.
   */
  const syncRemoveItem = async (userId, itemId) => {
    try {
      const response = await fetch('/api/shopping-list', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          itemId
        })
      });

      if (!response.ok) {
        throw new Error('Failed to remove item');
      }

      dispatch({ type: 'REMOVE_ITEM', payload: { id: itemId } });
    } catch (error) {
      console.error('Sync remove item failed:', error);
    }
  };

  /**
   * Updates the quantity of an item in the shopping list.
   * @async
   * @param {string} userId - ID of the user.
   * @param {string} itemId - ID of the item to update.
   * @param {number} newQuantity - New quantity for the item.
   */
  const syncUpdateQuantity = async (userId, itemId, newQuantity) => {
    try {
      const response = await fetch('/api/shopping-list', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          itemId,
          updatedItem: { quantity: newQuantity }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update quantity');
      }

      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { id: itemId, quantity: newQuantity }
      });
    } catch (error) {
      console.error('Sync update quantity failed:', error);
    }
  };

  /**
   * Toggles the purchased status of an item in the shopping list.
   * @async
   * @param {string} userId - ID of the user.
   * @param {string} itemId - ID of the item to toggle.
   */
  const syncTogglePurchased = async (userId, itemId) => {
    try {
      const response = await fetch('/api/shopping-list', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          itemId,
          updatedItem: { purchased: true }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to toggle purchased status');
      }

      dispatch({ type: 'TOGGLE_PURCHASED', payload: { id: itemId } });
    } catch (error) {
      console.error('Sync toggle purchased failed:', error);
    }
  };

  /**
   * Clears the entire shopping list for the specified user.
   * @async
   * @param {string} userId - ID of the user.
   */
  const syncClearList = async (userId) => {
    try {
      const response = await fetch(`/api/shopping-list`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId })
      });

      if (!response.ok) {
        throw new Error('Failed to clear list');
      }

      dispatch({ type: 'CLEAR_LIST' });
    } catch (error) {
      console.error('Sync clear list failed:', error);
    }
  };

  return (
    <ShoppingListContext.Provider
      value={{
        state,
        dispatch,
        syncLoadList,
        syncAddItem,
        syncRemoveItem,
        syncUpdateQuantity,
        syncTogglePurchased,
        syncClearList
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
}

/**
 * Custom hook to access the shopping list context.
 * @returns {Object} Context value containing state and actions.
 * @throws Will throw an error if not used within a ShoppingListProvider.
 */
export function useShoppingList() {
  const context = useContext(ShoppingListContext);
  if (!context) {
    throw new Error('useShoppingList must be used within a ShoppingListProvider');
  }
  return context;
}
