// app/api/favorites/count/route.js
import connectToDatabase from "@/path/to/connectToDatabase";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const userId = req.headers.get('userid');

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();
    const count = await db.collection("favorites").countDocuments({ userId });
    
    return NextResponse.json({ count });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get favorites count" },
      { status: 500 }
    );
  }
}
