
import { NextResponse } from 'next/server';
import connectToDatabase from '../../../db';

export async function POST(req) {
  try {
    const { email, recipeId } = await req.json(); // Parse the JSON body from the request

    if (!email || !recipeId) {
      return NextResponse.json({ error: 'Email and recipeId are required' }, { status: 400 });
    }

    // Connect to the database using your custom connector
    const db = await connectToDatabase();
    const usersCollection = db.collection('users'); // Replace with your actual collection name

    // Update the user's favorites array
    const updateResult = await usersCollection.updateOne(
      { email: email },
      { $addToSet: { favorites: recipeId } }, // Adds recipeId to favorites, avoiding duplicates
      { upsert: false } // Does not create a new user document if the user doesn't exist
    );

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json({ error: 'User not found or no update was made' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Favorite added successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error adding favorite:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { email, recipeId } = await req.json(); // Parse the JSON body from the request

    if (!email || !recipeId) {
      return NextResponse.json({ error: 'Email and recipeId are required' }, { status: 400 });
    }

    // Connect to the database using your custom connector
    const db = await connectToDatabase();
    const usersCollection = db.collection('users'); // Replace with your actual collection name

    // Update the user's favorites array by removing the recipeId
    const updateResult = await usersCollection.updateOne(
      { email: email },
      { $pull: { favorites: recipeId } }
    );

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json({ error: 'User not found or recipe not in favorites' }, { status: 404 });
    }

    if (!updatedUser.favorites.includes(recipeId)) {
      return NextResponse.json({ message: 'Favorite removed successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Recipe not in favorites' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error removing favorite:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { email } = req.query; // Retrieve email from the query parameters

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Connect to the database using your custom connector
    const db = await connectToDatabase();
    const usersCollection = db.collection('users'); // Replace with your actual collection name

    // Fetch the user document and retrieve the favorites array
    const user = await usersCollection.findOne({ email: email }, { projection: { favorites: 1 } });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Calculate the favorites count
    const favoritesCount = user.favorites.length;

    return NextResponse.json({ favorites: user.favorites, favoritesCount }, { status: 200 });
  } catch (error) {
    console.error('Error retrieving favorites:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}