/**
 * @module API/tags
 *
 * This module provides an API endpoint to fetch unique tags from the recipes collection
 * in the MongoDB database. The tags are aggregated to ensure that each tag is returned only once.
 */

import connectToDatabase from "../../../../db";

/**
 * Fetches unique tags from the recipes collection in the MongoDB database.
 *
 * This function performs the following operations:
 * 1. Connects to the MongoDB database.
 * 2. Uses the aggregation framework to unwind the tags array, group by unique tags,
 *    and sort the results in ascending order.
 * 3. Maps the aggregated results to extract only the unique tag names.
 * 4. Returns the unique tags in a JSON format.
 *
 * @async
 * @function GET
 * @returns {Promise<Response>} A Promise that resolves to a Response object containing
 *          a JSON string of unique tags with a status code of 200 on success,
 *          or an error message with a status code of 500 on failure.
 */
export async function GET() {
  try {
    const db = await connectToDatabase();

    const tags = await db
      .collection("recipes")
      .aggregate([ {/**method that performs operations on data */},
        { $unwind: "$tags" }, {/**stage creates seperate documents for each element in array */},
        { $group: { _id: "$tags" } }, {/**stage creates list of tags found in collection recipe */},
        { $sort: { _id: 1 } }
      ])
      .toArray();

    const uniqueTags = tags.map((tag) => tag._id);

    return new Response(JSON.stringify(uniqueTags), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching tags:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch tags" }), {
      status: 500,
    });
  }
}
