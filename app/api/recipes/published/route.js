import connectToDatabase from "../../../../db";

export async function GET() {
  try {
    const db = await connectToDatabase();
    const published = await db.collection('recipes').distinct('published');
    console.log("Fetched published:", published); 
    return new Response(JSON.stringify(published), { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' } 
    });
  } catch (error) {
    console.error("Error fetching published:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch published" }), {
      status: 500,
    });
}
}