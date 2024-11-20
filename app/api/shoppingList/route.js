const express = require('express');
const { ObjectId } = require('mongodb');
const connectToDatabase = require('../../../db');

const router = express.Router();

// Create a new shopping list for a user
router.post('/', async (req, res) => {
  try {
    const { userId, name = 'My Shopping List', items = [] } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const db = await connectToDatabase();
    const shoppingListsCollection = db.collection('shopping_lists');

    const newShoppingList = {
      userId,
      name,
      items: items.map(item => ({
        ...item,
        id: new ObjectId(),
        purchased: false,
        createdAt: new Date(),
        updatedAt: new Date()
      })),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await shoppingListsCollection.insertOne(newShoppingList);
    
    res.status(201).json({
      message: 'Shopping list created successfully',
      shoppingListId: result.insertedId
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create shopping list', details: error.message });
  }
});

// Fetch a user's shopping list
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const db = await connectToDatabase();
    const shoppingListsCollection = db.collection('shopping_lists');

    const shoppingList = await shoppingListsCollection.findOne({ userId });

    if (!shoppingList) {
      return res.status(404).json({ error: 'Shopping list not found' });
    }

    res.json(shoppingList);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch shopping list', details: error.message });
  }
});

// Update a shopping list
router.put('/:shoppingListId', async (req, res) => {
  try {
    const { shoppingListId } = req.params;
    const { name, items } = req.body;

    const db = await connectToDatabase();
    const shoppingListsCollection = db.collection('shopping_lists');

    const updateData = {
      ...(name && { name }),
      ...(items && { 
        items: items.map(item => ({
          ...item,
          id: item.id ? new ObjectId(item.id) : new ObjectId(),
          updatedAt: new Date()
        })) 
      }),
      updatedAt: new Date()
    };

    const result = await shoppingListsCollection.updateOne(
      { _id: new ObjectId(shoppingListId) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Shopping list not found' });
    }

    res.json({ message: 'Shopping list updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update shopping list', details: error.message });
  }
});

// Delete a shopping list
router.delete('/:shoppingListId', async (req, res) => {
  try {
    const { shoppingListId } = req.params;
    const db = await connectToDatabase();
    const shoppingListsCollection = db.collection('shopping_lists');

    const result = await shoppingListsCollection.deleteOne({ _id: new ObjectId(shoppingListId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Shopping list not found' });
    }

    res.json({ message: 'Shopping list deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete shopping list', details: error.message });
  }
});

// Add new items to a shopping list
router.post('/:shoppingListId/items', async (req, res) => {
  try {
    const { shoppingListId } = req.params;
    const { items } = req.body;

    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ error: 'Invalid items data' });
    }

    const db = await connectToDatabase();
    const shoppingListsCollection = db.collection('shopping_lists');

    const newItems = items.map(item => ({
      id: new ObjectId(),
      ...item,
      purchased: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    const result = await shoppingListsCollection.updateOne(
      { _id: new ObjectId(shoppingListId) },
      { 
        $push: { items: { $each: newItems } },
        $set: { updatedAt: new Date() }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Shopping list not found' });
    }

    res.status(201).json({ 
      message: 'Items added successfully', 
      addedItems: newItems.map(item => item.id.toString()) 
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add items', details: error.message });
  }
});

// Remove specific items from a shopping list
router.delete('/:shoppingListId/items/:itemId', async (req, res) => {
  try {
    const { shoppingListId, itemId } = req.params;

    const db = await connectToDatabase();
    const shoppingListsCollection = db.collection('shopping_lists');

    const result = await shoppingListsCollection.updateOne(
      { _id: new ObjectId(shoppingListId) },
      { 
        $pull: { items: { id: new ObjectId(itemId) } },
        $set: { updatedAt: new Date() }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Shopping list not found' });
    }

    res.json({ message: 'Item removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove item', details: error.message });
  }
});

// Mark items as purchased
router.patch('/:shoppingListId/items/:itemId/purchase', async (req, res) => {
  try {
    const { shoppingListId, itemId } = req.params;
    const { purchased } = req.body;

    const db = await connectToDatabase();
    const shoppingListsCollection = db.collection('shopping_lists');

    const result = await shoppingListsCollection.updateOne(
      { 
        _id: new ObjectId(shoppingListId), 
        'items.id': new ObjectId(itemId) 
      },
      { 
        $set: { 
          'items.$.purchased': purchased,
          'items.$.updatedAt': new Date(),
          updatedAt: new Date()
        } 
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Shopping list or item not found' });
    }

    res.json({ message: 'Item purchase status updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update item purchase status', details: error.message });
  }
});

module.exports = router;