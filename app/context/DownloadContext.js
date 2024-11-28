'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import Dexie from 'dexie';

const DownloadContext = createContext();

const db = new Dexie('recipeStorage');
db.version(1).stores({
    recipes: '_id, title, description, prep, cook, category, servings, published, tags, ingredients, images, instructions, nutrition, reviews, lastEditedAt, lastEditedBy, updatedAt, averageRating'
});

export const DownloadProvider = ({ children }) => {
    const [downloadedRecipes, setDownloadedRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const recipes = await db.recipes.toArray();
                setDownloadedRecipes(recipes);
            } catch (error) {
                console.error('Failed to fetch recipes:', error);
            }
        };
        fetchRecipes();
    }, []);

    const downloadRecipe = async (recipe) => {
        try {
            // Ensure the recipe has a valid `_id`
            if (!recipe._id) {
                recipe._id = `recipe-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            }
            
            // Save the recipe
            await db.recipes.put(recipe);
            
            // Fetch updated recipes
            const updatedRecipes = await db.recipes.toArray();
            setDownloadedRecipes(updatedRecipes);

            console.log('Recipe saved successfully:', recipe);
        } catch (error) {
            console.error('Error saving recipe:', error);
        }
    };

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
            }}
        >
            {children}
        </DownloadContext.Provider>
    );
};

export const useDownload = () => useContext(DownloadContext);
