import { auth } from '../../../auth';
import { NextResponse } from 'next/server';
import connectToDatabase from '../../../db';

// GET - List all favorites
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

    // Aggregate to get favorite recipes with recipe details
    const favorites = await db.collection('favorites')
      .aggregate([
        {
          $match: { userId: user._id }
        },
        {
          $lookup: {
            from: 'recipes',
            localField: 'recipeId',
            foreignField: '_id',
            as: 'recipe'
          }
        },
        {
          $unwind: '$recipe'
        },
        {
          $project: {
            _id: '$recipe._id',
            title: '$recipe.title',
            description: '$recipe.description',
            category: '$recipe.category',
            images: '$recipe.images',
            prep: '$recipe.prep',
            cook: '$recipe.cook',
            servings: '$recipe.servings',
            createdAt: 1
          }
        },
        {
          $sort: { createdAt: -1 }
        }
      ]).toArray();

    return NextResponse.json(favorites);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return NextResponse.json({ message: 'Error fetching favorites' }, { status: 500 });
  }
}

// POST - Add to favorites
export async function POST(req) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const db = await connectToDatabase();
    const body = await req.json();
    const { recipeId } = body;
    
    if (!recipeId) {
      return NextResponse.json({ message: 'Recipe ID is required' }, { status: 400 });
    }

    // Get user from database using session email
    const user = await db.collection('users').findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Check if recipe exists
    const recipe = await db.collection('recipes').findOne({ _id: recipeId });
    if (!recipe) {
      return NextResponse.json({ message: 'Recipe not found' }, { status: 404 });
    }

    // Check if recipe is already in favorites
    const existingFavorite = await db.collection('favorites').findOne({
      userId: user._id,
      recipeId: recipeId
    });

    if (existingFavorite) {
      return NextResponse.json({ message: 'Recipe already in favorites' }, { status: 400 });
    }

    // Add to favorites
    await db.collection('favorites').insertOne({
      userId: user._id,
      recipeId: recipeId,
      createdAt: new Date()
    });

    return NextResponse.json({ message: 'Recipe added to favorites' }, { status: 201 });
  } catch (error) {
    console.error('Error adding favorite:', error);
    return NextResponse.json({ message: 'Error adding recipe to favorites' }, { status: 500 });
  }
}