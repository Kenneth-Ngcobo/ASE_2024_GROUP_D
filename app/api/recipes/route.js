import connectToDatabase from "../../../db.js";

export async function GET(req) {
  try {
    const db = await connectToDatabase();
    const recipesCollection = db.collection("recipes");

    // Parse query parameters
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page")) || 1;
    const limit = Math.min(parseInt(url.searchParams.get("limit")) || 50, 50);
    const searchTerm = url.searchParams.get("search") || "";
    const category = url.searchParams.get("category");
    const tags = url.searchParams.get("tags");

    let query = {};

    // Log incoming tags
    console.log("Incoming tags:", tags);

    // Construct query for text search
    if (searchTerm) {
      query.$text = { $search: searchTerm };
    }

    if (category) {
      query.category = {
        $regex: new RegExp(`^${category}$`, "i"),
      };
    }

    if (tags) {
      query.tags = {
        $regex: new RegExp(`^${tags}$`, "i"),
      };
  }

    // Log constructed query
    console.log("Constructed query:", JSON.stringify(query, null, 2));

    const skip = (page - 1) * limit;
    const recipes = await recipesCollection.find(query).skip(skip).limit(limit).toArray();
    console.log("Fetched recipes:", recipes);

    const totalRecipes = await recipesCollection.countDocuments(query);

    return new Response(
      JSON.stringify({
        totalRecipes,
        totalPages: Math.ceil(totalRecipes / limit),
        currentPage: page,
        category: category || "all",
        appliedTags: tags ? tags.split(',').map(tag => tag.trim()) : [],
        recipes,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch recipes" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
