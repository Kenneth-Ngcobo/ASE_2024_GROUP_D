// app/api/reviews/route.js
import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../db'; // Adjust this path as necessary

// Helper function to create a review
async function createReview(db, reviewData) {
  const collection = db.collection('recipes');
  const recipeId = reviewData.recipeId;

  const review = {
    _id: new Date().getTime().toString(), // Unique ID
    userId: reviewData.username, // Use `username` for display
    rating: Number(reviewData.rating), // Convert `rating` to a number
    comment: reviewData.comment,
    createdAt: new Date(reviewData.date),
    updatedAt: new Date(reviewData.date),
  };

  // Add the review to the recipe document
  const result = await collection.updateOne(
    { _id: recipeId },
    { 
      $push: { reviews: review },
      $set: { updatedAt: new Date() }
    }
  );

  return result;
}

// API route handler for POST
export async function POST(req) {
  try {
    const db = await connectToDatabase();
    const reviewData = await req.json(); // Parse JSON data from request

    // Call the createReview function
    const result = await createReview(db, reviewData);

    // Check if the review was added successfully
    if (result.modifiedCount > 0) {
      return NextResponse.json({ message: 'Review submitted successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error adding review:', error);
    return NextResponse.json({ error: 'An error occurred while adding the review' }, { status: 500 });
  }
}
