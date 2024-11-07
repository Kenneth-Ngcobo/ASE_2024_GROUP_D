// app/api/favorites/list/route.js
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
    const favorites = await db
      .collection("favorites")
      .find({ userId })
      .sort({ createdAt: -1 })
      .toArray();
    
    return NextResponse.json({ favorites });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get favorites list" },
      { status: 500 }
    );
  }
}