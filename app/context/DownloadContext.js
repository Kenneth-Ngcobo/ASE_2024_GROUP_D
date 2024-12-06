'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import Dexie from 'dexie';

// Create the context
const DownloadContext = createContext();

// Initialize Dexie database
const db = new Dexie('recipeStorage');
db.version(1).stores({
    recipes: '_id, title, description, prep, cook, category, servings, published, tags, ingredients, images, instructions, nutrition, reviews, lastEditedAt, lastEditedBy, updatedAt, averageRating',
});

// Provider component
export const DownloadProvider = ({ children }) => {
    const [downloadedRecipes, setDownloadedRecipes] = useState([]);
    const [isOffline, setIsOffline] = useState(false);

    // Detect online/offline status
    useEffect(() => {
        const updateOnlineStatus = () => setIsOffline(!navigator.onLine);

        // Initial check for online/offline status
        updateOnlineStatus();

        // Event listeners for online/offline changes
        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);

        return () => {
            window.removeEventListener('online', updateOnlineStatus);
            window.removeEventListener('offline', updateOnlineStatus);
        };
    }, []);

    // Fetch recipes when the component mounts (and when going online)
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const recipes = await db.recipes.toArray();
                setDownloadedRecipes(recipes);
            } catch (error) {
                console.error('Failed to fetch recipes:', error);
            }
        };

        if (isOffline) {
            fetchRecipes(); // Fetch from IndexedDB if offline
        }
    }, [isOffline]);

    // Function to download/save a recipe
    const downloadRecipe = async (recipe) => {
        try {
            // Ensure the recipe has a valid `_id`
            if (!recipe._id) {
                recipe._id = `recipe-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            }

            // Save the recipe to IndexedDB
            await db.recipes.put(recipe);

            // Fetch updated recipes
            const updatedRecipes = await db.recipes.toArray();
            setDownloadedRecipes(updatedRecipes);
            console.log('Recipe saved successfully:', recipe);
        } catch (error) {
            console.error('Error saving recipe:', error);
        }
    };

    // Function to delete a recipe
    const deleteRecipe = async (id) => {
        try {
            await db.recipes.delete(id);
            const updatedRecipes = await db.recipes.toArray();
            setDownloadedRecipes(updatedRecipes);
            console.log('Recipe deleted successfully.');
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };

    return (
        <DownloadContext.Provider
            value={{
                downloadedRecipes,
                downloadRecipe,
                deleteRecipe,
                isOffline,
            }}
        >
            {children}
        </DownloadContext.Provider>
    );
};

// Custom hook for accessing the context
export const useDownload = () => {
    const context = useContext(DownloadContext);
    if (!context) {
        throw new Error('useDownload must be used within a DownloadProvider');
    }
    return context;
};
