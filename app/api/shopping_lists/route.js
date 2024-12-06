
import connectToDatabase from '../../../db';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

// Function to handle GET requests
async function handleGet() {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('shopping_lists');
    const items = await collection.find({}).toArray();
    return items;
  } catch (error) {
    console.error('Error fetching shopping list:', error);
    throw error;
  }
}

// Function to handle POST requests
async function handlePost(req) {
  const newItem = await req.json();
  const db = await connectToDatabase();
  const collection = db.collection('shopping_lists'); // Ensure consistent collection name
  await collection.insertOne(newItem);
  return NextResponse.json({ success: true, data: newItem }, { status: 201 });
}

// Function to handle DELETE requests
async function handleDelete(req) {
  const body = await req.json();
  const db = await connectToDatabase();
  const collection = db.collection('shopping_lists');

  if (body.clearAll) {
    // Clear entire shopping list
    await collection.deleteMany({});
  } else {
    // Delete specific item by ID
    await collection.deleteOne({ _id: new ObjectId(body.id) });
  }

  return NextResponse.json({ success: true });
}

/**
 * Handles updating an item's properties via PUT method
 * 
 * @function handlePut
 * @param {Request} req - Incoming HTTP request
 * @returns {Promise<NextResponse>} Response confirming update
 */
async function handlePut(req) {
  const url = new URL(req.url);
  const pathname = url.pathname;
  const body = await req.json();
  const db = await connectToDatabase();
  const collection = db.collection('shopping_lists');

  if (pathname.includes('/purchased')) {
    // Toggle purchased status
    const { id } = body;
    const item = await collection.findOne({ _id: new ObjectId(id) });

    if (!item) {
      return NextResponse.json({ success: false, error: 'Item not found' }, { status: 404 });
    }

    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { purchased: !item.purchased } }
    );
  } else if (pathname.includes('/quantity')) {
    // Update item quantity
    const { id, quantity } = body;
    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { quantity: Number(quantity) } }
    );
  } else {
    return NextResponse.json(
      { success: false, error: 'Invalid PUT route' },
      { status: 400 }
    );
  }

  return NextResponse.json({ success: true });
}

/**
 * GET method handler - Retrieve shopping list items
 * 
 * @method GET
 * @returns {NextResponse} JSON response with shopping list items
 */
export async function GET() {
  try {
    const items = await handleGet();
    return NextResponse.json(
      { success: true, data: items },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * POST method handler - Create a new shopping list item
 * 
 * @method POST
 * @param {Request} req - Incoming HTTP request
 * @returns {NextResponse} JSON response with created item
 */
export async function POST(req) {
  try {
    return await handlePost(req);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * DELETE method handler - Remove items from shopping list
 * 
 * @method DELETE
 * @param {Request} req - Incoming HTTP request
 * @returns {NextResponse} JSON response confirming deletion
 */
export async function DELETE(req) {
  try {
    return await handleDelete(req);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * PUT method handler - Update shopping list item properties
 * 
 * @method PUT
 * @param {Request} req - Incoming HTTP request
 * @returns {NextResponse} JSON response confirming update
 */
export async function PUT(req) {
  try {
    return await handlePut(req);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
