import { connectToDatabase } from '../../../db';
import { ObjectId } from 'mongodb';

/**
 * Handles various operations for user shopping lists.
 * 
 * Supported methods:
 * - GET: Retrieve a user's shopping list
 * - POST: Create a new shopping list
 * - PUT: Add new items to an existing list
 * - PATCH: Update an existing item in the list
 * - DELETE: Remove the entire shopping list
 * - DELETE_ITEM: Remove a specific item from the list
 * - MARK_PURCHASED: Mark an item as purchased
 * - UPDATE_QUANTITY: Update the quantity of a specific item
 * 
 * @async
 * @function handler
 * @param {Object} req - The incoming HTTP request
 * @param {string} req.method - The HTTP method of the request.
 * @param {Object} req.query - Query parameters for GET requests.
 * @param {Object} req.body - The body of the request for POST, PUT, PATCH, DELETE, DELETE_ITEM, MARK_PURCHASED, and UPDATE_QUANTITY requests.
 * @param {Object} res - The server response object
 * @returns {Promise<void>} A promise that resolves when the request is processed
 */
export default async function handler(req, res) {
  const { method } = req;

  try {
    const db = await connectToDatabase();
    const collection = db.collection('shoppingLists'); // Ensure each user has a unique shopping list

    switch (method) {
      /**
       * Retrieves a user's shopping list.
       * 
       * @param {string} userId - The unique identifier of the user
       * @returns {Object} The user's shopping list or an error response
       */
      case 'GET':
        const { userId } = req.query;  // Assuming userId is passed in the query params
        const shoppingList = await collection.findOne({ userId });
        if (!shoppingList) {
          return res.status(404).json({ success: false, message: 'Shopping list not found' });
        }
        res.status(200).json({ success: true, data: shoppingList });
        break;

      /**
       * Creates a new shopping list for a user.
       * 
       * @param {string} userId - The unique identifier of the user
       * @param {Array} items - Initial items in the shopping list
       * @returns {Object} The newly created shopping list or an error response
       */
      case 'POST':
        const { items } = req.body;  // Assuming userId and items are passed in the body
        const existingList = await collection.findOne({ userId });
        if (existingList) {
          return res.status(400).json({ success: false, message: 'Shopping list already exists' });
        }
        const newList = await collection.insertOne({ userId, items });
        res.status(201).json({ success: true, data: newList.ops[0] });
        break;

      /**
       * Adds a new item to an existing shopping list.
       * 
       * @param {string} userId - The unique identifier of the user
       * @param {Object} newItem - The item to be added to the list
       * @returns {Object} The updated shopping list or an error response
       */
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

      /**
       * Updates an item in the shopping list.
       *
       * @param {string} req.body.userId - The unique identifier of the user.
       * @param {string} req.body.itemId - The ID of the item to be updated.
       * @param {Object} req.body.updatedItem - The updated item data.
       * @returns {Object} 200 - The updated shopping list.
       * @returns {Object} 404 - Error response if the item is not found.
       */
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

      /**
       * Deletes a user's shopping list.
       *
       * @param {string} req.body.userId - The unique identifier of the user.
       * @returns {Object} 200 - Success response.
       * @returns {Object} 404 - Error response if the shopping list is not found.
       */
      case 'DELETE':
        const { userId: userIdToDelete } = req.body;  // userId to identify the list to delete
        const deletedList = await collection.deleteOne({ userId: userIdToDelete });
        if (!deletedList.deletedCount) {
          return res.status(404).json({ success: false, message: 'Shopping list not found' });
        }
        res.status(200).json({ success: true });
        break;

      /**
       * Removes a specific item from the shopping list.
       *
       * @param {string} req.body.userId - The unique identifier of the user.
       * @param {string} req.body.itemId - The ID of the item to be removed.
       * @returns {Object} 200 - Success response.
       * @returns {Object} 404 - Error response if the item is not found.
       */
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

      /**
       * Marks an item as purchased.
       *
       * @param {string} req.body.userId - The unique identifier of the user.
       * @param {string} req.body.itemId - The ID of the item to be marked as purchased.
       * @returns {Object} 200 - Success response.
       * @returns {Object} 404 - Error response if the item is not found.
       */
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

      /**
       * Updates the quantity of an item in the shopping list.
       *
       * @param {string} req.body.userId - The unique identifier of the user.
       * @param {string} req.body.itemId - The ID of the item to update.
       * @param {number} req.body.newQuantity - The new quantity for the item.
       * @returns {Object} 200 - Success response.
       * @returns {Object} 404 - Error response if the item is not found.
       */
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
