// import { useState } from 'react';
// import { useRouter } from 'next/router';
// import { useAuth } from '../../auth'; 

// export default function AddReview({ recipeId, onReviewAdded }) {
//   const { user } = useAuth();
//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState('');
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!user) {
//       alert('You need to log in to add a review');
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch(`/api/recipes/${recipeId}/reviews`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           recipeId,
//           userId: user.uid,
//           username: user.displayName || 'Anonymous',
//           rating,
//           comment,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Error adding review');
//       }

//       const newReview = await response.json();
//       onReviewAdded(newReview); // Update review list
//       setComment('');
//       setRating(5);
//     } catch (error) {
//       console.error(error);
//       alert('Could not add review');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
//       <label>
//         Rating (out of 5):
//         <select
//           value={rating}
//           onChange={(e) => setRating(Number(e.target.value))}
//           required
//         >
//           {[1, 2, 3, 4, 5].map((r) => (
//             <option key={r} value={r}>
//               {r}
//             </option>
//           ))}
//         </select>
//       </label>
//       <label>
//         Comment:
//         <textarea
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//           required
//           placeholder="Share your experience with this recipe"
//         />
//       </label>
//       <button
//         type="submit"
//         disabled={loading}
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         {loading ? 'Submitting...' : 'Submit Review'}
//       </button>
//     </form>
//   );
// }
