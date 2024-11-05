// components/FavoritesList.js
import { useState, useEffect } from 'react';
import Link from 'next/link';

export function FavoritesList() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
        hasNextPage: false,
        hasPrevPage: false
    });

    const fetchFavorites = async (page = 1) => {
        try {
            setLoading(true);
            const response = await fetch(`/api/favorites/list?page=${page}&limit=10`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch favorites');
            }
            
            const data = await response.json();
            setFavorites(data.favorites);
            setPagination(data.pagination);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    if (loading) {
        return <div>Loading your favorite recipes...</div>;
    }

    if (error) {
        return <div>Error loading favorites: {error}</div>;
    }

    if (favorites.length === 0) {
        return <div>You haven&#39;t saved any recipes to your favorites yet!</div>;
    }

    return (
        <div className="favorites-container">
            <h2>Your Favorite Recipes</h2>
            <p>Total favorites: {pagination.totalCount}</p>
            
            <div className="recipes-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {favorites.map(recipe => (
                    <div key={recipe._id} className="recipe-card p-4 border rounded-lg shadow">
                        {recipe.images && recipe.images[0] && (
                            <img 
                                src={recipe.images[0]} 
                                alt={recipe.title}
                                className="w-full h-48 object-cover rounded-t-lg"
                            />
                        )}
                        <div className="p-4">
                            <h3 className="text-xl font-semibold">{recipe.title}</h3>
                            <p className="text-gray-600">{recipe.description}</p>
                            <div className="mt-2 text-sm text-gray-500">
                                <p>Prep time: {recipe.prep} mins</p>
                                <p>Cook time: {recipe.cook} mins</p>
                                <p>Servings: {recipe.servings}</p>
                            </div>
                            <Link 
                                href={`/recipes/${recipe._id}`}
                                className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                View Recipe
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="pagination-controls mt-6 flex justify-center gap-4">
                <button
                    onClick={() => fetchFavorites(pagination.currentPage - 1)}
                    disabled={!pagination.hasPrevPage}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span>
                    Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                <button
                    onClick={() => fetchFavorites(pagination.currentPage + 1)}
                    disabled={!pagination.hasNextPage}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default FavoritesList;