// "use client";
// import { useState, useEffect } from 'react';
// import ReviewForm from './ReviewForm';
// import ReviewList from './ReviewList';

// export default function ReviewsSection({ recipeId, userId }) {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   // Function to fetch reviews from the API
//   const fetchReviews = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await fetch(`/api/recipes/${recipeId}/reviews`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch reviews');
//       }
//       const data = await response.json();
//       setReviews(data);
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchReviews();
//   }, [recipeId]);

//   const handleReviewAdded = (newReview) => {
//     setReviews((prevReviews) => [...prevReviews, newReview]);
//   };

//   const handleReviewUpdated = () => {
//     fetchReviews(); // Refresh the review list after update or delete
//   };

//   return (
//     <div className="space-y-8">
//       <ReviewForm recipeId={recipeId} onReviewAdded={handleReviewAdded} />
//       {loading ? (
//         <p>Loading reviews...</p>
//       ) : error ? (
//         <p>Error: {error}</p>
//       ) : (
//         <ReviewList
//           reviews={reviews}
//           userId={userId}
//           onReviewUpdated={handleReviewUpdated}
//         />
//       )}
//     </div>
//   );
// }
