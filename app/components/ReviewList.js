// components/ReviewList.js
import { useEffect, useState } from 'react';

export default function ReviewList({ recipeId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchReviews() {
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

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="space-y-4">
      {reviews.length === 0 ? (
        <p>No reviews yet. Be the first to review this recipe!</p>
      ) : (
        reviews.map((review) => (
          <div key={review._id} className="border rounded-lg p-4 shadow-sm">
            <p className="font-semibold">{review.username}</p> {/* Display username */}
            <p className="text-sm text-gray-500">
              {new Date(review.date).toLocaleDateString()} {/* Display review date */}
            </p>
            <p className="mt-2">Rating: {review.rating} / 5</p> {/* Display rating */}
            <p>{review.comment}</p>
          </div>
        ))
      )}
    </div>
  );
}
