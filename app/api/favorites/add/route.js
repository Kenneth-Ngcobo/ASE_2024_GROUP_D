// app/api/favorites/add/route.js
import connectToDatabase from "@/path/to/connectToDatabase";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const db = await connectToDatabase();
    const { userId, recipeId } = await req.json();

    if (!userId || !recipeId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingFavorite = await db
      .collection("favorites")
      .findOne({ userId, recipeId });

    if (!existingFavorite) {
      await db.collection("favorites").insertOne({ 
        userId, 
        recipeId,
        createdAt: new Date()
      });
    }

    return NextResponse.json({ message: "Recipe added to favorites" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add favorite" },
      { status: 500 }
    );
  }
}