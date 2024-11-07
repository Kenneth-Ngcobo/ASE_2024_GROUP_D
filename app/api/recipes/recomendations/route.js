// /api/recipe/recommendations/[email].js
import { connectToDatabase } from '@/utils/mongodb'; // Adjust import path as necessary
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    const { db } = await connectToDatabase();
    
    // Fetch user document by email
    const user = await db.collection('users').findOne({ email });
    if (!user || !user.reviews) return res.status(404).json({ error: "User or reviews not found" });
    
    // Filter reviews with a rating of 8 or higher
    const highRatedReviews = user.reviews
      .filter(review => review.rating >= 8)
      .sort((a, b) => b.rating - a.rating) // Sort by highest rating first
      .slice(0, 10); // Limit to top 10 reviews
    
    if (highRatedReviews.length === 0) {
      return res.json([]); // No recommendations if no reviews with rating >= 8
    }

    // Collect all tags from high-rated reviews
    const tagsFromTopReviews = [...new Set(highRatedReviews.flatMap(review => review.tags))];

    // Find other products with similar tags in the reviews collection
    const recommendations = await db.collection('reviews')
      .aggregate([
        {
          $match: {
            'tags': { $in: tagsFromTopReviews }, // Match recipes with any of the top review tags
            'userId': { $ne: user._id }          // Exclude reviews by the same user
          }
        },
        {
          $addFields: {
            matchCount: {
              $size: { $setIntersection: ["$tags", tagsFromTopReviews] } // Count of matching tags
            }
          }
        },
        {
          $sort: { matchCount: -1 }  // Sort by highest tag match count
        },
        {
          $limit: 10                  // Limit to top 10 matches
        },
        {
          $project: {
            _id: 0,
            product: 1                // Only return the product IDs
          }
        }
      ])
      .toArray();

    res.json(recommendations.map(r => r.product));
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
