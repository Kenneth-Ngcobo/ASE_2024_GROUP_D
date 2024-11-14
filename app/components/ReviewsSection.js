"use client";
import { useState, useEffect } from 'react';

const ReviewsSection = ({ recipeId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '', recipeId });
  const [editMode, setEditMode] = useState(false);
  const [editReviewId, setEditReviewId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' }); // For success/error messages
  const [sortOption, setSortOption] = useState({ sortBy: 'rating', order: 'desc' });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/recipes/${recipeId}/reviews?sortBy=${sortOption.sortBy}&order=${sortOption.order}`);
        if (!response.ok) throw new Error('Failed to fetch reviews.');
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        setMessage({ text: 'Failed to fetch reviews.', type: 'error' });
      }
    };
    fetchReviews();
  }, [recipeId, sortOption]);

  const handleReviewSubmit = async () => {
    try {
      setIsLoading(true);
      const method = editMode ? 'PUT' : 'POST';
      const endpoint = editMode
  ? `/api/recipes/${recipeId}/reviews?editId=${editReviewId}`
  : `/api/recipes/${recipeId}/reviews`;
      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview),
      });

      if (!response.ok) throw new Error('Failed to submit review.');

      const updatedReview = await response.json();

      if (editMode) {
        setReviews(reviews.map((rev) => (rev._id === editReviewId ? updatedReview : rev)));
      } else {
        setReviews([updatedReview, ...reviews]);
      }

      setMessage({ text: editMode ? 'Review updated successfully!' : 'Review added successfully!', type: 'success' });
      setNewReview({ rating: 0, comment: '', recipeId });
      setEditMode(false);
      setEditReviewId(null);
    } catch (error) {
      setMessage({ text: 'Failed to submit review.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (review) => {
    setEditMode(true);
    const objectId = review._id;
    const stringId = objectId.toString();
    setEditReviewId(stringId); // Only pass the stringId
    setNewReview({ rating: review.rating, comment: review.comment, recipeId });
  };
  const handleDelete = async (reviewId) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/recipes/${recipeId}/reviews?deleteId=${reviewId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) throw new Error('Failed to delete review.');
  
      setReviews(reviews.filter((review) => review._id !== reviewId));
      setMessage({ text: 'Review deleted successfully!', type: 'success' });
    } catch (error) {
      setMessage({ text: 'Failed to delete review.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleSortChange = (e) => {
    const [sortBy, order] = e.target.value.split('-');
    setSortOption({ sortBy, order });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>
      {message.text && (
        <div className={`mb-4 ${message.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
          {message.text}
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="sort" className="mr-2">Sort by:</label>
        <select id="sort" onChange={handleSortChange} className="px-3 py-2 border rounded-md">
          <option value="rating-desc">Rating (Highest)</option>
          <option value="rating-asc">Rating (Lowest)</option>
          <option value="date-desc">Newest</option>
          <option value="date-asc">Oldest</option>
        </select>
      </div>

      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center mb-2">
              <div className="font-bold mr-2">{review.username}</div>
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
            <button
        onClick={() => handleDelete(review._id)} // Ensure review._id is passed
  className="text-red-500 hover:underline mt-2 ml-4"
>
  Delete
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
