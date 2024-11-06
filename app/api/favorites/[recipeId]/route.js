import { auth } from '../../../../auth';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import connectToDatabase from '../../../../db';

export async function DELETE(req, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const db = await connectToDatabase();
    const { recipeId } = params;

    // Get user from database using session email
    const user = await db.collection('users').findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const result = await db.collection('favorites').deleteOne({
      userId: new ObjectId(user._id),
      recipeId: new ObjectId(recipeId)
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'Favorite not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Recipe removed from favorites' });
  } catch (error) {
    console.error('Error removing favorite:', error);
    return NextResponse.json({ message: 'Error removing recipe from favorites' }, { status: 500 });
  }
}