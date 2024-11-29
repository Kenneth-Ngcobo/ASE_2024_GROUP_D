import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const FavoriteButton = ({ 
  recipeId, 
  initialIsFavorite = false, 
  onFavoriteToggle 
}) => {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFavoriteToggle = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const endpoint = isFavorite 
        ? `/api/favorites/${recipeId}` 
        : '/api/favorites';

      const method = isFavorite ? 'DELETE' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: method === 'POST' ? JSON.stringify({ recipeId }) : undefined,
      });

      if (!response.ok) {
        throw new Error('Failed to update favorites');
      }

      const newFavoriteState = !isFavorite;
      setIsFavorite(newFavoriteState);

      // Optional callback for parent component
      if (onFavoriteToggle) {
        onFavoriteToggle(newFavoriteState);
      }
    } catch (err) {
      console.error('Favorite toggle error:', err);
      setError('Unable to update favorites');
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className="text-red-500 text-sm">
        {error}
      </div>
    );
  }

  return (
    <button 
      onClick={handleFavoriteToggle}
      disabled={isLoading}
      className={`
        flex items-center justify-center 
        ${isFavorite ? 'text-red-500' : 'text-gray-500'}
        hover:text-red-600 
        transition-colors
        ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isLoading ? (
        <span className="animate-pulse">Loading...</span>
      ) : (
        isFavorite ? <FaHeart /> : <FaRegHeart />
      )}
    </button>
  );
};

export default FavoriteButton;