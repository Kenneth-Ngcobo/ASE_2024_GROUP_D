import connectToDatabase from "../../../../db";

export async function GET() {
  try {
    const db = await connectToDatabase();
    const instructions = await db.collection('recipes').distinct('instructions');
    console.log("Fetched instructions:", instructions); 
    return new Response(JSON.stringify(instructions), { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' } 
    });
  } catch (error) {
    console.error("Error fetching instructions:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch instructions" }), {
      status: 500,
    });
}
}
