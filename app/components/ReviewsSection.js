"use client";
import { useState, useEffect } from 'react';

const ReviewsSection = ({ recipeId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '', recipeId });
  const [editMode, setEditMode] = useState(false);
  const [editReviewId, setEditReviewId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/recipes/${recipeId}/reviews`);
        if (!response.ok) throw new Error('Failed to fetch reviews.');
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        setError('Failed to fetch reviews.');
      }
    };
    fetchReviews();
  }, [recipeId]);

  const handleReviewSubmit = async () => {
    try {
      setIsLoading(true);
      const method = editMode ? 'PUT' : 'POST';
      const endpoint = editMode
        ? `/api/recipes/${recipeId}/reviews/${editReviewId}`
        : `/api/recipes/${recipeId}/reviews`;

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview),
      });

      if (!response.ok) throw new Error('Failed to submit review.');

      const updatedReview = await response.json();

      // Update reviews with the edited or new review
      if (editMode) {
        setReviews(reviews.map((rev) => (rev._id === editReviewId ? updatedReview : rev)));
      } else {
        setReviews([...reviews, updatedReview]);
      }

      setNewReview({ rating: 0, comment: '', recipeId });
      setEditMode(false);
      setEditReviewId(null);
    } catch (error) {
      setError('Failed to submit review.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (review) => {
    setEditMode(true);
    setEditReviewId(review._id);
    setNewReview({ rating: review.rating, comment: review.comment, recipeId });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center mb-2">
              <div className="font-bold mr-2">{review.userId}</div>
              <div className="text-yellow-500">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
            </div>
            <p>{review.comment}</p>
            <div className="text-gray-500 text-sm mt-2">
              {new Date(review.createdAt).toLocaleString()}
            </div>
            <button
              onClick={() => handleEdit(review)}
              className="text-blue-500 hover:underline mt-2"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-2">{editMode ? 'Edit Review' : 'Add a Review'}</h3>
        <div className="flex items-center mb-2">
          <label htmlFor="rating" className="mr-2">
            Rating:
          </label>
          <select
            id="rating"
            value={newReview.rating}
            onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
            className="px-3 py-2 border rounded-md"
          >
            <option value={0}>Select a rating</option>
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="comment" className="block mb-2">
            Comment:
          </label>
          <textarea
            id="comment"
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border rounded-md"
          ></textarea>
        </div>
        <button
          onClick={handleReviewSubmit}
          disabled={isLoading}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
        >
          {isLoading ? 'Submitting...' : editMode ? 'Update Review' : 'Submit Review'}
        </button>
      </div>
    </div>
  );
};

export default ReviewsSection;
