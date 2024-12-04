import { connectToDatabase } from '../../../db';

export default async function handler(req, res) {
  const { method } = req;

  try {
    const db = await connectToDatabase();
    const collection = db.collection('shoppingList');

    switch (method) {
      case 'GET':
        const items = await collection.find({}).toArray();
        res.status(200).json({ success: true, data: items });
        break;

      case 'POST':
        const newItem = req.body;
        await collection.insertOne(newItem);
        res.status(201).json({ success: true, data: newItem });
        break;

      case 'DELETE':
        const { id } = req.body;
        await collection.deleteOne({ _id: new ObjectId(id) });
        res.status(200).json({ success: true });
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
