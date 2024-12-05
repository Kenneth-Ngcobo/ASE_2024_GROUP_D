import { connectToDatabase } from '../../../db';
import { ObjectId } from 'mongodb';

// Function to handle GET requests
async function handleGet(req, res) {
  const db = await connectToDatabase();
  const collection = db.collection('shoppingList');
  const items = await collection.find({}).toArray();
  res.status(200).json({ success: true, data: items });
}

// Function to handle POST requests
async function handlePost(req, res) {
  const db = await connectToDatabase();
  const collection = db.collection('shoppingList');
  const newItem = req.body;
  await collection.insertOne(newItem);
  res.status(201).json({ success: true, data: newItem });
}

// Function to handle DELETE requests
async function handleDelete(req, res) {
  const db = await connectToDatabase();
  const collection = db.collection('shoppingList');
  const { id } = req.body;
  await collection.deleteOne({ _id: new ObjectId(id) });
  res.status(200).json({ success: true });
}

export async function GET(req, res) {
  try {
    await handleGet(req, res);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function POST(req, res) {
  try {
    await handlePost(req, res);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function DELETE(req, res) {
  try {
    await handleDelete(req, res);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

