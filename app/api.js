const API_BASE_URL = 'http://localhost:3000/api/recipes';

export async function fetchRecipes(limit =20, page) {
    const query = new URLSearchParams({
        limit,
        ...(page && { page })
    }).toString();
    try{
        const response = await fetch(`${API_BASE_URL}?${query}`);
        if (!response.ok) {
            throw new Error('Failed to fetch recipes');
        }

        const data = await response.json();  
        return data;
    } catch(error){
        return error
    }
    
}
