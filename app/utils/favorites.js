// utils/favorites.js
export const favoritesAPI = {
    // Add to favorites
    async addToFavorites(recipeId) {
        const response = await fetch(`/api/favoritesAdd`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ recipeId }),
        });

        if (!response.ok) {
            throw new Error('Failed to add to favorites');
        }

        return response.json();
    },

    // Remove from favorites
    async removeFromFavorites(recipeId) {
        const response = await fetch(`/api/favorites/remove`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ recipeId }),
        });

        if (!response.ok) {
            throw new Error('Failed to remove from favorites');
        }

        return response.json();
    },

    // Get favorites count
    async getFavoritesCount() {
        const response = await fetch('/api/favorites/count');

        if (!response.ok) {
            throw new Error('Failed to fetch favorites count');
        }

        return response.json();
    }
};
