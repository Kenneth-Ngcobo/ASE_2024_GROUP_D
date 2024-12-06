// lib/db.js
import Dexie from 'dexie';

// Define the database
class RecipeDatabase extends Dexie {
    constructor() {
        super("recipeDB");
        this.version(1).stores({
            recipes: "id, title, description, images, tags, prep, cook, servings, category, nutrition, ingredients, instructions", // define your schema here
        });
    }
}

const db = new RecipeDatabase();

// Function to get recipe from IndexedDB by ID
export const getRecipeFromIndexedDB = async (id) => {
    try {
        const recipe = await db.recipes.get(id);
        return recipe;
    } catch (error) {
        console.error("Error getting recipe from IndexedDB:", error);
        return null;
    }
};

// Function to save recipe to IndexedDB (if you need this)
export const saveRecipeToIndexedDB = async (recipe) => {
    try {
        await db.recipes.put(recipe); // Save or update recipe in IndexedDB
    } catch (error) {
        console.error("Error saving recipe to IndexedDB:", error);
    }
};
