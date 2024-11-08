// components/ReviewList.js
import { useEffect, useState } from 'react';

export default function ReviewList({ recipeId, userId, onReviewUpdated }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortOption, setSortOption] = useState('date_desc');
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editForm, setEditForm] = useState({ rating: 0, comment: '' });

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch(`/api/recipes/${recipeId}/reviews`);
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        let data = await response.json();
        data = sortReviews(data, sortOption);
        setReviews(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, [recipeId, sortOption]);

  const sortReviews = (reviews, option) => {
    return [...reviews].sort((a, b) => {
      if (option === 'rating_desc') {
        return b.rating - a.rating;
      } else if (option === 'rating_asc') {
        return a.rating - b.rating;
      } else if (option === 'date_desc') {
        return new Date(b.date) - new Date(a.date);
      } else if (option === 'date_asc') {
        return new Date(a.date) - new Date(b.date);
      }
      return 0;
    });
  };

  const handleEdit = (review) => {
    setEditingReviewId(review._id);
    setEditForm({ rating: review.rating, comment: review.comment });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (reviewId) => {
    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editForm, date: new Date().toISOString() })
      });

      if (!response.ok) {
        throw new Error('Failed to update review');
      }

      // Update the local reviews state after editing
      const updatedReviews = reviews.map((review) =>
        review._id === reviewId ? { ...review, ...editForm, date: new Date().toISOString() } : review
      );
      setReviews(updatedReviews);
      setEditingReviewId(null);
      if (onReviewUpdated) onReviewUpdated();
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-4">
        <label htmlFor="sort" className="mr-2 text-sm font-medium text-gray-700">Sort by:</label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="date_desc">Date (Newest First)</option>
          <option value="date_asc">Date (Oldest First)</option>
          <option value="rating_desc">Rating (Highest First)</option>
          <option value="rating_asc">Rating (Lowest First)</option>
        </select>
      </div>

      {reviews.length === 0 ? (
        <p>No reviews yet. Be the first to review this recipe!</p>
      ) : (
        reviews.map((review) => (
          <div key={review._id} className="border rounded-lg p-4 shadow-sm">
            <p className="font-semibold">{review.username}</p>
            <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
            
            {editingReviewId === review._id ? (
              <div>
                <label>
                  Rating:
                  <input
                    type="number"
                    name="rating"
                    min="1"
                    max="5"
                    value={editForm.rating}
                    onChange={handleEditChange}
                    className="w-full mt-1"
                  />
                </label>
                <label>
                  Comment:
                  <textarea
                    name="comment"
                    value={editForm.comment}
                    onChange={handleEditChange}
                    className="w-full mt-1"
                  />
                </label>
                <button onClick={() => handleEditSubmit(review._id)} className="mt-2 text-blue-500 text-sm hover:underline">
                  Save
                </button>
                <button onClick={() => setEditingReviewId(null)} className="mt-2 ml-2 text-gray-500 text-sm hover:underline">
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <p className="mt-2">Rating: {review.rating} / 5</p>
                <p>{review.comment}</p>
                {review.userId === userId && (
                  <button onClick={() => handleEdit(review)} className="mt-2 text-blue-500 text-sm hover:underline">
                    Edit Review
                  </button>
                )}
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}
