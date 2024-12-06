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
  try {
    const newItem = await req.json();
    console.log('Received new item:', newItem); // Log the received item

    if (!newItem.name || typeof newItem.quantity !== 'number') {
      console.error('Invalid item data:', newItem); // Log invalid data
      return NextResponse.json({ success: false, error: 'Invalid item data' }, { status: 400 });
    }

    const db = await connectToDatabase();
    const collection = db.collection('shopping_lists');
    newItem.purchased = false; // Ensure "purchased" is initialized
    await collection.insertOne(newItem);

    return NextResponse.json({ success: true, data: newItem }, { status: 201 });
  } catch (error) {
    console.error('Error adding item:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// Function to handle DELETE requests
async function handleDelete(req) {
  try {
    const body = await req.json();
    const db = await connectToDatabase();
    const collection = db.collection('shopping_lists');

    if (body.clearAll) {
      // Clear entire shopping list
      await collection.deleteMany({});
    } else if (body.id) {
      // Delete specific item by ID
      await collection.deleteOne({ _id: new ObjectId(body.id) });
    } else {
      return NextResponse.json({ success: false, error: 'Invalid delete request' }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting item:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// Function to handle PUT requests
async function handlePut(req) {
  try {
    const url = new URL(req.url);
    const pathname = url.pathname;
    const body = await req.json();

    const db = await connectToDatabase();
    const collection = db.collection('shopping_lists');

    if (pathname.includes('/purchased')) {
      const { id } = body;

      if (!id) {
        return NextResponse.json({ success: false, error: 'Invalid or missing ID' }, { status: 400 });
      }

      const item = await collection.findOne({ _id: new ObjectId(id) });

      if (!item) {
        return NextResponse.json({ success: false, error: 'Item not found' }, { status: 404 });
      }

      await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { purchased: !item.purchased } }
      );

      return NextResponse.json({ success: true });
    } else if (pathname.includes('/quantity')) {
      const { id, quantity } = body;

      if (!id || typeof quantity !== 'number' || quantity < 0) {
        return NextResponse.json({ success: false, error: 'Invalid quantity update' }, { status: 400 });
      }

      await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { quantity: quantity } }
      );

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid PUT route' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error updating item:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// GET method handler
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

// POST method handler
export async function POST(req) {
  return await handlePost(req);
}

// DELETE method handler
export async function DELETE(req) {
  return await handleDelete(req);
}

// PUT method handler
export async function PUT(req) {
  return await handlePut(req);
}
