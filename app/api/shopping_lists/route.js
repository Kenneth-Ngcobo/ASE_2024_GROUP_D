import { connectToDatabase } from '../../../db';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

// Function to handle GET requests
async function handleGet(req, res) {
  const db = await connectToDatabase();
  const collection = db.collection('shopping_lists');
  const items = await collection.find({}).toArray();
  return NextResponse.json({ success: true, data: items }, { status: 200 });
}

// Function to handle POST requests
async function handlePost(req, res) {
  const db = await connectToDatabase();
  const collection = db.collection('shopping_lists');
  const newItem = req.body;
  await collection.insertOne(newItem);
  return NextResponse.json({ success: true, data: newItem }, { status: 201 });
}

// Function to handle DELETE requests
async function handleDelete(req, res) {
  const db = await connectToDatabase();
  const collection = db.collection('shopping_lists');
  const { id } = req.body;
  await collection.deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ success: true }, { status: 200 });
}

export async function GET(req, res) {
  try {
    await handleGet(req, res);
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req, res) {
  try {
    await handlePost(req, res);
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, res) {
  try {
    await handleDelete(req, res);
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

