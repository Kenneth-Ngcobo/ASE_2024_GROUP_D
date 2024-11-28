import { NextResponse } from 'next/server';
import connectToDatabase from '../../../db';
import { ObjectId } from 'mongodb';

export async function POST(req) {
  try {
    const { email, recipeId } = await req.json();

    if (!email || !recipeId) {
      return NextResponse.json({ error: 'Email and recipeId are required' }, { status: 400 });
    }

    const db = await connectToDatabase();
    const usersCollection = db.collection('users');

    // First check if user exists, if not create them with empty favorites
    const user = await usersCollection.findOne({ email: email });
    if (!user) {
      await usersCollection.insertOne({
        email: email,
        favorites: []
      });
    }

    // Update the user's favorites array with timestamp
    const updateResult = await usersCollection.updateOne(
      { email: email },
      { 
        $addToSet: { 
          favorites: {
            recipeId: recipeId, 
            addedAt: new Date() 
          } 
        } 
      },
      { upsert: true }
    );

    if (updateResult.modifiedCount === 0 && updateResult.upsertedCount === 0) {
      // If recipe is already in favorites
      return NextResponse.json({ message: 'Recipe already in favorites' }, { status: 200 });
    }

    return NextResponse.json({ message: 'Favorite added successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error adding favorite:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { email, recipeId } = await req.json();

    if (!email || !recipeId) {
      return NextResponse.json({ error: 'Email and recipeId are required' }, { status: 400 });
    }

    const db = await connectToDatabase();
    const usersCollection = db.collection('users');

    const updateResult = await usersCollection.updateOne(
      { email: email },
      { $pull: { favorites: { recipeId: recipeId } } }
    );

    if (updateResult.modifiedCount === 0) {
      // Check if user exists
      const user = await usersCollection.findOne({ email: email });
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      // If user exists but recipe wasn't in favorites
      return NextResponse.json({ message: 'Recipe was not in favorites' }, { status: 200 });
    }

    return NextResponse.json({ message: 'Favorite removed successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error removing favorite:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const db = await connectToDatabase();
    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne({ email }, { projection: { favorites: 1, _id: 0 } });
    if (!user || !user.favorites || user.favorites.length === 0) {
      return NextResponse.json({ favorites: [], favoritesCount: 0 }, { status: 200 });
    }

    const favoriteRecipeIds = user.favorites.map((fav) => fav.recipeId);

    const recipesCollection = db.collection('recipes');
    const favoritedRecipes = await recipesCollection
      .find({ _id: { $in: favoriteRecipeIds.map((id) => new ObjectId(id)) } })
      .toArray();

    const enrichedFavorites = favoritedRecipes.map((recipe) => {
      const favMetadata = user.favorites.find((fav) => fav.recipeId === recipe._id.toString());
      return {
        ...recipe,
        favoritedAt: favMetadata ? favMetadata.addedAt : null,
      };
    });

    return NextResponse.json({
      favorites: enrichedFavorites,
      favoritesCount: enrichedFavorites.length,
    });
  } catch (error) {
    console.error('Error retrieving favorites:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
