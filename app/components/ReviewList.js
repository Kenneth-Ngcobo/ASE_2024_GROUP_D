import { useEffect, useState } from 'react';

export default function ReviewList({ recipeId, userId, onReviewUpdated }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    async function fetchReviews() {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`/api/recipes/${recipeId}/reviews`);
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, [recipeId]);

  const handleDelete = async (reviewId) => {
    if (!confirm('Are you sure you want to delete this review?')) return;

    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete review');
      }

      setReviews(reviews.filter((review) => review._id !== reviewId));
      setSuccessMessage('Review deleted successfully!');
      onReviewUpdated();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = async (reviewId, updatedRating, updatedComment) => {
    setError('');
    setSuccessMessage('');
    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating: updatedRating, comment: updatedComment }),
      });

      if (!response.ok) {
        throw new Error('Failed to update review');
      }

      const updatedReview = await response.json();
      setReviews(
        reviews.map((review) =>
          review._id === reviewId ? updatedReview : review
        )
      );
      setSuccessMessage('Review updated successfully!');
      onReviewUpdated();
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="space-y-4">
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {reviews.length === 0 ? (
        <p>No reviews yet. Be the first to review this recipe!</p>
      ) : (
        reviews.map((review) => (
          <div key={review._id} className="border rounded-lg p-4 shadow-sm">
            <p className="font-semibold">{review.username}</p>
            <p className="text-sm text-gray-500">
              {new Date(review.date).toLocaleDateString()}
            </p>
            <p className="mt-2">Rating: {review.rating} / 5</p>
            <p>{review.comment}</p>
            {userId === review.userId && (
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleEdit(review._id, 4, 'Updated comment')}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(review._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}