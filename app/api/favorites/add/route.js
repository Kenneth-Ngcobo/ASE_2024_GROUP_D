// app/api/favorites/add/route.js
import connectToDatabase from "../../../../db";

export async function POST(req) {
  const db = await connectToDatabase();
  const { userId, recipeId } = await req.json();

  const existingFavorite = await db.collection("favorites").findOne({ userId, recipeId });
  if (!existingFavorite) {
    await db.collection("favorites").insertOne({ userId, recipeId });
  }
  return new Response(JSON.stringify({ message: "Recipe added to favorites" }), { status: 200 });
}
