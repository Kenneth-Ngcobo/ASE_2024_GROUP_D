import { NextResponse } from "next/server";
import connectToDatabase from "../../../../../db";

export async function GET(params) {
    try {
        const db = await connectToDatabase();
        const { id } = params;

        // Convert string ID to ObjectId if needed
        const ObjectId = require('mongodb').ObjectId;
        const recipeId = new ObjectId(id);

        const recipe = await db.collection('recipes').findOne(
            { _id: recipeId },
            { projection: { allergens: 0 } }
        );

        if (!recipe) {
            return NextResponse.json(
                { error: 'Recipe not found' },
                { status: 404 }
            );
        }

        // If allergens don't exist, return an empty array
        const allergens = recipe.allergens || [];

        return NextResponse.json({ allergens });
    } catch (error) {
        console.error('Error fetching allergens:', error);
        return NextResponse.json(
            { error: 'Failed to fetch allergens' },
            { status: 500 }
        );
    }
}

// Add allergens to a recipe
export async function PUT(request, { params }) {
    try {
        const db = await connectToDatabase();
        const { id } = params;
        const { allergens } = await request.json();

        const ObjectId = require('mongodb').ObjectId;
        const recipeId = new ObjectId(id);

        const result = await db.collection('recipes').updateOne(
            { _id: recipeId },
            { $set: { allergens } }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json(
                { error: 'Recipe not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, allergens });
    } catch (error) {
        console.error('Error updating allergens:', error);
        return NextResponse.json(
            { error: 'Failed to update allergens' },
            { status: 500 }
        );
    }
}
