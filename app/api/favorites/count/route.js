import { auth } from '../../../../auth';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import connectToDatabase from '../../../../db';

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const db = await connectToDatabase();
    
    // Get user from database using session email
    const user = await db.collection('users').findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const count = await db.collection('favorites').countDocuments({
      userId: new ObjectId(user._id)
    });

    return NextResponse.json({ count });
  } catch (error) {
    console.error('Error getting favorites count:', error);
    return NextResponse.json({ message: 'Error getting favorites count' }, { status: 500 });
  }
}