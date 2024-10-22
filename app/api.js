const API_BASE_URL = 'http://localhost:3000/api/recipes';

export async function fetchRecipes() {
    const response = await fetch(`${API_BASE_URL}`);
    if (!response.ok) {
        throw new Error('Failed to fetch recipes');
    }

    const data = await response.json();  
    return data.recipes;
}
