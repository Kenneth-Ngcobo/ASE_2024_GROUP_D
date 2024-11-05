// components/ReviewList.js
import { useState, useEffect } from 'react';

const ReviewList = ({ recipeId }) => {
  const [reviews, setReviews] = useState([]);
  const [sortBy, setSortBy] = useState('date');
  const [order, setOrder] = useState('desc');

  useEffect(() => {
    fetchReviews();
  }, [sortBy, order]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`/api/recipes/${recipeId}/reviews?sortBy=${sortBy}&order=${order}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }

      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Reviews</h2>
      <div className="mb-4">
        <label>
          Sort by:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="ml-2">
            <option value="date">Date</option>
            <option value="rating">Rating</option>
          </select>
        </label>
        <label className="ml-4">
          Order:
          <select value={order} onChange={(e) => setOrder(e.target.value)} className="ml-2">
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </label>
      </div>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id} className="p-4 mb-4 border rounded">
            <div className="flex justify-between">
              <span className="font-semibold">{review.username}</span>
              <span className="text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
            </div>
            <div className="text-yellow-500">{'★'.repeat(review.rating)}</div>
            <p>{review.comment}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default ReviewList;
