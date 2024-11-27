// app/api/recipes/save.js

import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
    console.log('Request method:', req.method); // Log the request method for debugging

    if (req.method === 'POST') {
        try {
            const recipeData = req.body;

            // Path to save the recipes (for example, a JSON file)
            const filePath = path.join(process.cwd(), 'data', 'recipes.json');
            let recipes = [];

            // Check if the file exists and read the existing recipes
            try {
                const fileContents = await fs.readFile(filePath, 'utf-8');
                recipes = JSON.parse(fileContents);
            } catch (error) {
                console.log('File not found, will create a new one.');
            }

            // Add the new recipe to the array
            recipes.push(recipeData);

            // Write the updated array back to the file
            await fs.writeFile(filePath, JSON.stringify(recipes, null, 2));

            res.status(200).json({ message: 'Recipe saved successfully!' });
        } catch (error) {
            console.error('Error saving recipe:', error);
            res.status(500).json({ message: 'Failed to save the recipe.' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed.' });
    }
}
