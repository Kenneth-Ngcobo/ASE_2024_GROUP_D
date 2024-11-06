// app/api/favorites/remove/route.js
import connectToDatabase from "@/path/to/connectToDatabase";

export async function DELETE(req) {
  const db = await connectToDatabase();
  const { userId, recipeId } = await req.json();

  await db.collection("favorites").deleteOne({ userId, recipeId });
  return new Response(JSON.stringify({ message: "Recipe removed from favorites" }), { status: 200 });
}
