import connectToDatabase from "../../../../db";

export async function GET() {
  try {
    const db = await connectToDatabase();
    const prep = await db.collection('recipes').distinct('prep');
    console.log("Fetched prep:", prep); 
    return new Response(JSON.stringify(prep), { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' } 
    });
  } catch (error) {
    console.error("Error fetching prep:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch prep" }), {
      status: 500,
    });
}
}