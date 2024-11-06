// app/api/favorites/count/route.js
import connectToDatabase from "@/path/to/connectToDatabase";

export async function GET(req) {
  const db = await connectToDatabase();
  const userId = req.headers.userid; // Assuming user ID is sent in the headers

  const count = await db.collection("favorites").countDocuments({ userId });
  return new Response(JSON.stringify({ count }), { status: 200 });
}
