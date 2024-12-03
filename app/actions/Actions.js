'use server';

import webpush from 'web-push';

/**
 * Configure WebPush with VAPID details for sending push notifications.
 * VAPID (Voluntary Application Server Identification) helps identify the server 
 * sending push notifications and prevents unauthorized push notifications.
 */
webpush.setVapidDetails(
  'mailto:your-email@example.com', // Remove angle brackets
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

/** 
 * Stores the current push notification subscription.
 * In a production environment, this should be stored in a database.
 * @type {Object|null}
 */
let subscription = null;

/**
 * Subscribes a user to push notifications.
 * 
 * @async
 * @param {Object} sub - The push notification subscription object
 * @returns {Promise<{success: boolean}>} An object indicating the success of subscription
 * @note In a production environment, the subscription should be stored in a database
 */
export async function subscribeUser(sub) {
  subscription = sub;
  // In a production environment, you would want to store the subscription in a database
  // Example: await db.subscriptions.create({ data: sub })
  return { success: true };
}

/**
 * Unsubscribes the current user from push notifications.
 * 
 * @async
 * @returns {Promise<{success: boolean}>} An object indicating the success of unsubscription
 * @note In a production environment, the subscription should be removed from the database
 */
export async function unsubscribeUser() {
  subscription = null;
  // In a production environment, you would want to remove the subscription from the database
  // Example: await db.subscriptions.delete({ where: { ... } })
  return { success: true };
}

/**
 * Sends a push notification to the subscribed user.
 * 
 * @async
 * @param {string} message - The message to be sent in the notification
 * @returns {Promise<{success: boolean, error?: string}>} An object indicating the success of sending the notification
 * @throws {Error} If no subscription is available
 */
export async function sendNotification(message) {
  if (!subscription) {
    throw new Error('No subscription available');
  }

  try {
    await webpush.sendNotification(
      subscription,
      JSON.stringify({
        title: 'Test Notification',
        body: message,
        icon: '/icon.png',
      })
    );
    return { success: true };
  } catch (error) {
    console.error('Error sending push notification:', error);
    return { success: false, error: 'Failed to send notification' };
  }
}
