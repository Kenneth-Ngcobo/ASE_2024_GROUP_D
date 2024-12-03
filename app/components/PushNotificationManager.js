// components/PushNotificationManager.js
'use client';
import { useState, useEffect } from 'react';
import { subscribeUser, unsubscribeUser, sendNotification } from '../actions/Actions';

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const applicationServerKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ? urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY) : null;

export default function PushNotificationManager({ userId }) {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true);
      registerServiceWorker();
    }
  }, []);

  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register('/Service-Worker.js');
    const sub = await registration.pushManager.getSubscription();
    setSubscription(sub);
  }

  async function subscribeToPush() {
    const registration = await navigator.serviceWorker.ready;
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey,
    });
    console.log('Subscription object:', sub);
    setSubscription(sub);

    const subscriptionObject = {
      endpoint: sub.endpoint,
      keys: sub.keys ? {
        p256dh: sub.keys.p256dh || 'defaultKey',
      auth: sub.keys.auth || 'defaultAuth'
      } : { p256dh: 'defaultKey', auth: 'defaultAuth' }
    };
   console.log('Subscription object (processed):', subscriptionObject);
    await subscribeUser(subscriptionObject, userId);
  }

  async function unsubscribeFromPush() {
    if (subscription) {
      await subscription.unsubscribe();
      setSubscription(null);
      await unsubscribeUser(userId);
    }
  }

  async function sendTestNotification() {
    if (subscription) {
      await sendNotification(userId, message);
      setMessage('');
    }
  }

  if (!isSupported) {
    return <p>Push notifications are not supported in this browser.</p>;
  }

  return (
    <div>
      <h3>Push Notifications</h3>
      {subscription ? (
        <>
          <p>You are subscribed to push notifications.</p>
          <button onClick={unsubscribeFromPush}>Unsubscribe</button>
          <input
            type="text"
            placeholder="Enter notification message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendTestNotification}>Send Test</button>
        </>
      ) : (
        <>
          <p>You are not subscribed to push notifications.</p>
          <button onClick={subscribeToPush}>Subscribe</button>
        </>
      )}
    </div>
  );
}
