// components/ReviewsSection.js
"use client";
import { useState } from 'react';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';

export default function ReviewsSection({ recipeId }) {
  const [reviewAdded, setReviewAdded] = useState(false);

  const handleReviewAdded = () => {
    setReviewAdded((prev) => !prev);
  };

  return (
    <div className="space-y-8">
      <ReviewForm recipeId={recipeId} onReviewAdded={handleReviewAdded} />
      <ReviewList key={reviewAdded} recipeId={recipeId} />
    </div>
  );
}
