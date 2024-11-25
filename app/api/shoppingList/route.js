import { connectToDatabase } from '../../../db';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { method } = req;

  try {
    const db = await connectToDatabase();
    const collection = db.collection('shoppingLists'); // Ensure each user has a unique shopping list

    switch (method) {
      // Get a user's shopping list
      case 'GET':
        const { userId } = req.query;  // Assuming userId is passed in the query params
        const shoppingList = await collection.findOne({ userId });
        if (!shoppingList) {
          return res.status(404).json({ success: false, message: 'Shopping list not found' });
        }
        res.status(200).json({ success: true, data: shoppingList });
        break;

      // Save a user's shopping list
      case 'POST':
        const { items } = req.body;  // Assuming userId and items are passed in the body
        const existingList = await collection.findOne({ userId });
        if (existingList) {
          return res.status(400).json({ success: false, message: 'Shopping list already exists' });
        }
        const newList = await collection.insertOne({ userId, items });
        res.status(201).json({ success: true, data: newList.ops[0] });
        break;

      // Add new items to an existing shopping list
      case 'PUT': 
        const { userId: userIdForAdd, newItem } = req.body;  // userId and newItem are passed in the body
        const updatedList = await collection.updateOne(
          { userId: userIdForAdd },
          { $push: { items: newItem } }
        );
        if (!updatedList.matchedCount) {
          return res.status(404).json({ success: false, message: 'Shopping list not found' });
        }
        res.status(200).json({ success: true, data: updatedList });
        break;

      // Update an item in the shopping list
      case 'PATCH':
        const { userId: userIdForUpdate, itemId, updatedItem } = req.body;  // userId, itemId, and updatedItem are passed
        const updatedShoppingList = await collection.updateOne(
          { userId: userIdForUpdate, 'items._id': ObjectId(itemId) },
          { $set: { 'items.$': updatedItem } }
        );
        if (!updatedShoppingList.matchedCount) {
          return res.status(404).json({ success: false, message: 'Item not found in shopping list' });
        }
        res.status(200).json({ success: true, data: updatedShoppingList });
        break;

      // Delete a shopping list
      case 'DELETE':
        const { userId: userIdToDelete } = req.body;  // userId to identify the list to delete
        const deletedList = await collection.deleteOne({ userId: userIdToDelete });
        if (!deletedList.deletedCount) {
          return res.status(404).json({ success: false, message: 'Shopping list not found' });
        }
        res.status(200).json({ success: true });
        break;

      // Remove a specific item from the shopping list
      case 'DELETE_ITEM':
        const { userId: userIdForItemRemoval, itemId: itemToRemove } = req.body;  // userId and itemId passed
        const itemRemoved = await collection.updateOne(
          { userId: userIdForItemRemoval },
          { $pull: { items: { _id: ObjectId(itemToRemove) } } }
        );
        if (!itemRemoved.matchedCount) {
          return res.status(404).json({ success: false, message: 'Item not found in shopping list' });
        }
        res.status(200).json({ success: true });
        break;

      // Mark an item as purchased
      case 'MARK_PURCHASED':
        const { userId: userIdForMark, itemId: itemToMark } = req.body;  // userId and itemId passed
        const markPurchased = await collection.updateOne(
          { userId: userIdForMark, 'items._id': ObjectId(itemToMark) },
          { $set: { 'items.$.purchased': true } }
        );
        if (!markPurchased.matchedCount) {
          return res.status(404).json({ success: false, message: 'Item not found in shopping list' });
        }
        res.status(200).json({ success: true });
        break;
      
        // Update item quantity
        case 'UPDATE_QUANTITY':
         const { userId: userIdForQuantityUpdate, itemId: itemIdToUpdate, newQuantity } = req.body;
         const quantityUpdated = await collection.updateOne(
          { userId: userIdForQuantityUpdate, 'items._id': ObjectId(itemIdToUpdate) },
         { $set: { 'items.$.quantity': newQuantity } }
          );
          if (!quantityUpdated.matchedCount) {
         return res.status(404).json({ success: false, message: 'Item not found in shopping list' });
         }
         res.status(200).json({ success: true });
          break;
      

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'DELETE_ITEM', 'MARK_PURCHASED']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
