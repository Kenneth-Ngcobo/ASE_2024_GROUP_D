// app/api/favorites/check/[recipeId]/route.js
import { auth } from '../../../../../auth';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import connectToDatabase from '../../../../../db';

export async function GET(req, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ isFavorited: false }, { status: 401 });
    }

    const db = await connectToDatabase();
    const { recipeId } = params;

    // Get user from database using session email
    const user = await db.collection('users').findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ isFavorited: false }, { status: 404 });
    }

    // Check if recipe is in favorites
    const favorite = await db.collection('favorites').findOne({
      userId: new ObjectId(user._id),
      recipeId: new ObjectId(recipeId)
    });

    return NextResponse.json({ isFavorited: !!favorite });
  } catch (error) {
    console.error('Error checking favorite status:', error);
    return NextResponse.json({ message: 'Error checking favorite status' }, { status: 500 });
  }
}