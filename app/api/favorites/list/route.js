// app/api/favorites/list/route.js
import connectToDatabase from "@/path/to/connectToDatabase";

export async function GET(req) {
  const db = await connectToDatabase();
  const userId = req.headers.userid;

  const favorites = await db.collection("favorites").find({ userId }).toArray();
  return new Response(JSON.stringify({ favorites }), { status: 200 });
}
