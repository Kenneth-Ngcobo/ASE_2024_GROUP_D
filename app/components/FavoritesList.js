import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Modal } from './Modal';

export function FavoritesList() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false); // State to manage modal visibility

    const fetchFavorites = async (page = 1) => {
        try {
            setLoading(true);
            const response = await fetch(`/api/favorites/list?page=${page}&limit=10`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch favorites');
            }

            const data = await response.json();
            setFavorites(data.favorites);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    if (loading) return <div className="text-center">Loading your favorite recipes...</div>;
    if (error) return <div className="text-center text-red-500">Error loading favorites: {error}</div>;
    if (favorites.length === 0) return <div className="text-center">No favorites yet!</div>;

    return (
        <div className="favorites-container p-4">
            <h2 className="text-2xl font-bold mb-4">Your Favorite Recipes</h2>
            <button onClick={() => setModalOpen(true)} className="mb-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
                Show My Favorites
            </button>
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <h2 className="text-xl font-bold mb-4">Your Favorite Recipes</h2>
                <div className="recipes-grid grid grid-cols-1 gap-4">
                    {favorites.map((recipe) => (
                        <div key={recipe._id} className="recipe-card p-4 border border-gray-300 rounded-lg shadow-sm">
                            <h3 className="text-lg font-semibold">{recipe.title}</h3>
                            <p className="text-gray-700">{recipe.description}</p>
                            <Link href={`/recipes/${recipe._id}`}>
                                <a className="text-blue-500 hover:underline">View Recipe</a>
                            </Link>
                        </div>
                    ))}
                </div>
            </Modal>
        </div>
    );
}

export default FavoritesList;
