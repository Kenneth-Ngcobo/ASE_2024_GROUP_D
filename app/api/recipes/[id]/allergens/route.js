import { NextResponse } from "next/server";
import connectToDatabase from "../../../../../db";

export async function GET(params) {
    try {
        const db = await connectToDatabase();
        const { id } = params;

        // Validate the id
        if (!id) {
            return NextResponse.json(
                { error: 'Recipe ID is required' },
                { status: 400 }
            );
        }

        const recipe = await db.collection('recipes').findOne(
            { _id: idd },
            { projection: { allergens: 1 } }
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
            { error: 'Failed to fetch allergens', details: error.message },
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

        // Validate inputs
        if (!id) {
            return NextResponse.json(
                { error: 'Recipe ID is required' },
                { status: 400 }
            );
        }

        const result = await db.collection('recipes').updateOne(
            { _id: id },
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
            { error: 'Failed to update allergens', details: error.message },
            { status: 500 }
        );
    }
}
