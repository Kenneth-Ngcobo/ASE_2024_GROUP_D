
"use client";
import { useState } from 'react';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';

export default function ReviewsSection({ recipeId, userId }) {
  const [reviewAdded, setReviewAdded] = useState(false);

  const handleReviewAdded = () => {
    setReviewAdded((prev) => !prev);
  };

  const handleReviewDeleted = () => {
    setReviewAdded((prev) => !prev);
  };

  return (
    <div className="space-y-8">
      <ReviewForm recipeId={recipeId} onReviewAdded={handleReviewAdded} />
      <ReviewList
        key={reviewAdded}
        recipeId={recipeId}
        userId={userId}  // Pass the userId to ReviewList
        onReviewDeleted={handleReviewDeleted}
      />
    </div>
  );
}
