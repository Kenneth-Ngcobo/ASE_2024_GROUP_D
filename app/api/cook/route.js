import connectToDatabase from "../../../../db";

export async function GET() {
  try {
    const db = await connectToDatabase();
    const cook = await db.collection('recipes').distinct('cook');
    console.log("Fetched cook:", cook); 
    return new Response(JSON.stringify(cook), { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' } 
    });
  } catch (error) {
    console.error("Error fetching cook:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch cook" }), {
      status: 500,
    });
}
}