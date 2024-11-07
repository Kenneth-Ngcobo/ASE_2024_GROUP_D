import { authOptions } from '../../../auth';
import { auth } from '../../../auth';
import { getServerSession } from "next-auth";
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import connectToDatabase from '../../../db';


async function getSession(req) {
  return await auth(req, res);;
}
// GET - List all favorites with recipe details
export async function GET(req) {
  try {
    const session = await getSession(req);
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const db = await connectToDatabase();
    
    // Get user from database using session email
    const user = await db.collection('users').findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Check if count parameter is present in URL
    const { searchParams } = new URL(req.url);
    const countOnly = searchParams.get('count');

   if (countOnly) {
      const count = await db.collection('favorites').countDocuments({
        userId: user._id
      });
      return NextResponse.json({ count });
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
            favoriteId: '$_id', // Include the favorite document ID for deletion
            createdAt: 1
          }
        },
        {
          $sort: { createdAt: -1 }
        }
      ]).toArray();
    return NextResponse.json(favorites);
  } catch (error) {
   console.error('Error with favorites:', error);
    return NextResponse.json({ message: 'Error processing favorites request' }, { status: 500 });
  }
}

// POST - Add to favorites
export async function POST(req) {
  try {
    const session = await getSession(req);
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
    const recipe = await db.collection('recipes').findOne({ 
      _id:  recipeId 
    });
    if (!recipe) {
      return NextResponse.json({ message: 'Recipe not found' }, { status: 404 });
    }

    // Check if recipe is already in favorites
    const existingFavorite = await db.collection('favorites').findOne({
      userId: user._id,
      recipeId
    });

    if (existingFavorite) {
      return NextResponse.json({ message: 'Recipe already in favorites' }, { status: 400 });
    }

    // Add to favorites
    const result = await db.collection('favorites').insertOne({
      userId: user._id,
      recipeId,
      createdAt: new Date()
    });

    return NextResponse.json({ 
      message: 'Recipe added to favorites',
      favoriteId: result.insertedId 
    }, { status: 201 });
  } catch (error) {
    console.error('Error adding favorite:', error);
    return NextResponse.json({ message: 'Error adding recipe to favorites' }, { status: 500 });
  }
}

// DELETE - Remove from favorites
export async function DELETE(req) {
  try {
    const session = await getSession(req);
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const recipeId = searchParams.get('recipeId');
    
    if (!recipeId) {
      return NextResponse.json({ message: 'Recipe ID is required' }, { status: 400 });
    }

    const db = await connectToDatabase();
    
    // Get user from database using session email
    const user = await db.collection('users').findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Remove from favorites
    const result = await db.collection('favorites').deleteOne({
      userId:user._id,
      recipeId
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