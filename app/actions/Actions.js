// actions/Actions.js
'use server'
import connectToDatabase from '../../db';
const webpush = require('web-push');

webpush.setVapidDetails(
  'mailto:herbetnosenga5@gmail.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

export async function subscribeUser(subscriptionObject, userId) {
  const db = await connectToDatabase();
  const result = await db.collection('subscriptions').updateOne(
    { userId },
    { $set: { subscription: subscriptionObject } },
    { upsert: true }
  );
  return { success: true, result };
}

export async function unsubscribeUser(userId) {
  const db = await connectToDatabase();
  const result = await db.collection('subscriptions').deleteOne({ userId });
  return { success: true, result };
}

export async function sendNotification(userId, message) {
  const db = await connectToDatabase();
  const subscription = await db.collection('subscriptions').findOne({ userId });

  if (!subscription) {
    throw new Error('No subscription available');
  }

  try {
    await webpush.sendNotification(
      subscription.subscription,
      JSON.stringify({
        title: 'Recipe Popularity Alert!',
        body: message.text,
        icon: '/0.png',
        url: `/recipes/${message.recipeId}`
      })
    );
    return { success: true };
  } catch (error) {
    console.error('Error sending push notification:', error);
    return { success: false, error: 'Failed to send notification' };
  }
}
