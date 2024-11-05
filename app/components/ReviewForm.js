// components/ReviewForm.js
import { useState } from 'react';

const ReviewForm = ({ recipeId, onReviewAdded }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipeId,
          rating,
          comment,
          // Assuming the user's authentication details are handled on the server
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      const review = await response.json();
      setComment('');
      setRating(5);
      onReviewAdded(review); // Trigger an update in the parent component
    } catch (error) {
      setError('Failed to submit review. Please try again.');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <h2 className="text-lg font-semibold mb-2">Add a Review</h2>
      {error && <p className="text-red-500">{error}</p>}
      <label className="block mb-2">
        Rating:
        <select value={rating} onChange={(e) => setRating(e.target.value)} className="ml-2">
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </label>
      <label className="block mb-2">
        Comment:
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="3"
          className="w-full p-2 border rounded"
          required
        ></textarea>
      </label>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        Submit
      </button>
    </form>
  );
};

export default ReviewForm;
