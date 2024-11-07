// app/api/favorites/remove/route.js
import connectToDatabase from "@/path/to/connectToDatabase";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    const { userId, recipeId } = await req.json();

    if (!userId || !recipeId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();
    const result = await db
      .collection("favorites")
      .deleteOne({ userId, recipeId });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Favorite not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Recipe removed from favorites" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to remove favorite" },
      { status: 500 }
    );
  }
}