import { openDB } from 'idb';

// Open the IndexedDB database or create it if it doesn't exist
export const openRecipeDB = async () => {
  return openDB('recipeDB', 1, {
    upgrade(db) {
      // Create an object store for recipes, with id as the primary key
      const store = db.createObjectStore('recipes', {
        keyPath: 'id',
      });
      store.createIndex('by-id', 'id');
    },
  });
};

// Function to save a recipe to IndexedDB
// Function to retrieve a recipe from IndexedDB
export async function getRecipeFromIndexedDB(id) {
    const db = await openDatabase(); // Open your IndexedDB
    const transaction = db.transaction('recipes', 'readonly');
    const store = transaction.objectStore('recipes');
    const recipe = await store.get(id);
    return recipe || null; // Return null if not found
  }
  
  // Function to save a recipe to IndexedDB
  export async function saveRecipeToIndexedDB(recipe) {
    const db = await openDatabase(); // Open IndexedDB
    const transaction = db.transaction('recipes', 'readwrite');
    const store = transaction.objectStore('recipes');
    store.put(recipe); // Save the recipe with its ID as the key
  }
  
// Function to check if the app is online
export const isOnline = () => {
  return navigator.onLine;
};
