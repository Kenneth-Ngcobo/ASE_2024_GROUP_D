import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import connectToDatabase from '../../../db.js';

/**
 * Retrieves a user's shopping list from the database.
 * 
 * @async
 * @function GET
 * @param {Request} request - The incoming HTTP request object
 * @returns {NextResponse} JSON response containing the user's shopping list
 * - Success (200): { success: true, data: shoppingList }
 * - Error (400): { success: false, message: 'userId query parameter is required' }
 * - Error (404): { success: false, message: 'Shopping list not found' }
 * - Error (500): { success: false, error: 'Internal server error' }
 */
export async function GET(request) {
  console.log('did we get?')
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    if (!userId) {
      return NextResponse.json({ success: false, message: 'userId query parameter is required' }, { status: 400 });
    }
    const db = await connectToDatabase();
    const collection = db.collection('shopping_lists');
    console.log('did we shop')
    const shoppingList = await collection.findOne({ userId });
    if (!shoppingList) {
      return NextResponse.json({ success: false, message: 'Shopping list not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: shoppingList });
  } catch (error) {
    console.error("Error fetching shopping list:", error); // Log the error details
    return NextResponse.json({ success: false, error: error.message || 'Internal server error' }, { status: 500 });
  }
}

/**
 * Saves or updates a user's shopping list in the database.
 * 
 * @async
 * @function POST
 * @param {Request} request - The incoming HTTP request object
 * @returns {NextResponse} JSON response indicating the result of saving/updating the list
 * - Success (201): { success: true, data: newList }
 * - Success (200): { success: true, data: updatedList }
 * - Error (400): { success: false, message: 'userId and items are required' }
 * - Error (500): { success: false, error: 'Internal server error' }
 */
export async function POST(request) {
  console.log('did we post?')
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    const itemsParam = url.searchParams.get('items');

    console.log("URL Parameters:", { userId, itemsParam }); // Log URL parameters

    if (!userId || !itemsParam) {
      return NextResponse.json({ success: false, message: 'userId and items are required' }, { status: 400 });
    }

    let newItems;
    try {
      newItems = JSON.parse(itemsParam);
      console.log("Parsed new items:", newItems); // Log parsed new items
    } catch (error) {
      console.error("Error parsing items JSON:", error); // Log JSON parsing errors
      throw new Error("Invalid items JSON");
    }

    const db = await connectToDatabase();
    const collection = db.collection('shopping_lists');
    const existingList = await collection.findOne({ userId });

    if (existingList) {
      // Append new items to the existing list
      const updatedList = await collection.updateOne(
        { userId },
        { $push: { items: { $each: newItems } } }
      );
      if (!updatedList.matchedCount) {
        return NextResponse.json({ success: false, message: 'Failed to update the shopping list' }, { status: 500 });
      }
      return NextResponse.json({ success: true, data: updatedList });
    } else {
      // Create a new shopping list
      const result = await collection.insertOne({ userId, items: newItems });

      // Safely access the inserted document with improved error handling
      if (result && result.insertedId) {
        const newList = await collection.findOne({ _id: result.insertedId });
        return NextResponse.json({ success: true, data: newList }, { status: 201 });
      } else {
        throw new Error("Failed to retrieve the new shopping list");
      }
    }
  } catch (error) {
    console.error("Error saving shopping list:", error); // Log the error details
    return NextResponse.json({ success: false, error: error.message || 'Internal server error' }, { status: 500 });
  }
}

/**
 * Updates a specific item in a user's shopping list.
 * 
 * @async
 * @function PATCH
 * @param {Request} request - The incoming HTTP request object
 * @returns {NextResponse} JSON response indicating the result of updating the item
 * - Success (200): { success: true, data: updatedShoppingList }
 * - Error (400): { success: false, message: 'userId, itemId, and updatedItem are required' }
 * - Error (404): { success: false, message: 'Item not found in shopping list' }
 * - Error (500): { success: false, error: 'Internal server error' }
 */
export async function PATCH(request) {
  console.log('WE PATCH?')
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    const itemId = url.searchParams.get('itemId');
    const updatedItemParam = url.searchParams.get('updatedItem');

    console.log("URL Parameters:", { userId, itemId, updatedItemParam }); // Log URL parameters

    if (!userId || !itemId || !updatedItemParam) {
      return NextResponse.json({ success: false, message: 'userId, itemId, and updatedItem are required' }, { status: 400 });
    }

    let updatedItem;
    try {
      updatedItem = JSON.parse(updatedItemParam);
      updatedItem.id = itemId; // Ensure the id field is retained
      console.log("Parsed updatedItem:", updatedItem); // Log parsed updatedItem
    } catch (error) {
      console.error("Error parsing updatedItem JSON:", error); // Log JSON parsing errors
      throw new Error("Invalid updatedItem JSON");
    }

    const db = await connectToDatabase();
    const collection = db.collection('shopping_lists');
    const updatedShoppingList = await collection.updateOne(
      { userId, 'items.id': itemId },
      { $set: { 'items.$': updatedItem } }
    );
    if (!updatedShoppingList.matchedCount) {
      return NextResponse.json({ success: false, message: 'Item not found in shopping list' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updatedShoppingList });
  } catch (error) {
    console.error("Error updating item:", error); // Log the error details
    return NextResponse.json({ success: false, error: error.message || 'Internal server error' }, { status: 500 });
  }
}

/**
 * Deletes a shopping list or a specific item from a shopping list.
 * 
 * @async
 * @function DELETE
 * @param {Request} request - The incoming HTTP request object
 * @returns {NextResponse} JSON response indicating the result of deletion
 * - Success (200): { success: true }
 * - Error (400): { success: false, message: 'userId is required' }
 * - Error (404): { success: false, message: 'Shopping list or item not found' }
 * - Error (500): { success: false, error: 'Internal server error' }
 */
export async function DELETE(request) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    const itemId = url.searchParams.get('itemId');

    console.log("URL Parameters:", { userId, itemId }); // Log URL parameters

    if (!userId) {
      return NextResponse.json({ success: false, message: 'userId is required' }, { status: 400 });
    }

    const db = await connectToDatabase();
    const collection = db.collection('shopping_lists');

    if (itemId) {
      // Delete specific item
      const itemRemoved = await collection.updateOne(
        { userId },
        { $pull: { items: { id: itemId } } }
      );
      if (!itemRemoved.matchedCount) {
        return NextResponse.json({ success: false, message: 'Item not found in shopping list' }, { status: 404 });
      }
      return NextResponse.json({ success: true });
    } else {
      // Delete the entire shopping list
      const deletedList = await collection.deleteOne({ userId });
      if (!deletedList.deletedCount) {
        return NextResponse.json({ success: false, message: 'Shopping list not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true });
    }
  } catch (error) {
    console.error("Error deleting shopping list or item:", error); // Log the error details
    return NextResponse.json({ success: false, error: error.message || 'Internal server error' }, { status: 500 });
  }
}
