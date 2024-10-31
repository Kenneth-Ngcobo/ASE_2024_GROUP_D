import connectToDatabase from "../../../../db";

export async function GET() {
  try {
    const db = await connectToDatabase();

    const instructionsSample = await db
      .collection("recipes")
      .aggregate([
        { $match: { instructions: { $exists: true, $type: "array" } } },
        { $unwind: "$instructions" },
    
      ])
      .toArray();

    console.log("Fetched instructions sample:", instructionsSample);
    return new Response(JSON.stringify(instructionsSample), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching instructions sample:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch instructions sample" }),
      {
        status: 500,
      }
    );
  }
}
