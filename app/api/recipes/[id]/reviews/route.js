
import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../../db';
import {
  createReview,
  updateReview,
  deleteReview,
  getRecipeReviews
} from '../../../../review';


async function validateRecipe(recipeId) {
  const db = await connectToDatabase();
  
  if (!recipeId) {
    throw new Error('Recipe ID is required');
  }

  const recipe = await db.collection('recipes').findOne({ _id: recipeId });
  if (!recipe) {
    throw new Error('Recipe not found');
  }

  return recipe;
}

// Create review
export async function POST(request, { params }) {
  try {
    console.log("error 1 idk")
    const { id } = params;
    console.log("error 2 idk", id)
    const recipeId = id;
    console.log("error 3 idk")
    const newReview = await request.json();
    console.log("error 4 idk",newReview)
    await validateRecipe(recipeId);
    console.log("error 5 idk")
    const db = await connectToDatabase();
    console.log("error 6 idk")
    const review = await createReview(db, newReview, recipeId);
    console.log("error 7 idk")
    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: error.message.includes('not found') ? 404 : 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const reviewId = id
    const body = await request.json();
    
    const db = await connectToDatabase();
    await updateReview(db, reviewId, body);
    
    return NextResponse.json({ message: 'Review updated successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { reviewId } = params;
    
    const db = await connectToDatabase();
    await deleteReview(db, reviewId);
    
    return NextResponse.json({ message: 'Review deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}


export async function GET(request, { params }) {

  try {
    const { id } = params;
    const recipeId = id;
    validateRecipe(recipeId);
    
    console.log('Did we get ValidateRecipe?')

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const sortOptions = {
      sortBy: searchParams.get('sortBy') || 'date',
      order: searchParams.get('order') || 'desc'
    };
    
   
    const db = await connectToDatabase();
   
    const reviews = await getRecipeReviews(db, recipeId, sortOptions);
    
    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { 
        status: error.message.includes('not found') ? 404 : 
                error.message.includes('required') ? 400 : 500 
      }
    );
  }
}


