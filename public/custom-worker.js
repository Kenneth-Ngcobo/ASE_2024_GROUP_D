import { skipWaiting, clientsClaim } from 'workbox-core';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import Dexie from 'dexie';

// Immediately activate the service worker after installation to take control of the page
skipWaiting();
clientsClaim();

// Cache API responses with NetworkFirst
registerRoute(
  /\/api\/recipes\//,
  new NetworkFirst({
    cacheName: 'recipe-api-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24, // Cache for 1 day
      }),
    ],
  })
);

// Cache HTML pages using StaleWhileRevalidate strategy
registerRoute(
  ({ url }) => url.pathname.startsWith('/Recipe/') || url.pathname.startsWith('/Route/'),
  new StaleWhileRevalidate({
    cacheName: 'pages-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 60 * 60 * 24,
      }),
    ],
  })
);

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Handle HTML page requests for offline
  if (event.request.destination === 'document' && url.pathname.startsWith('/Recipe/')) {
    const pageId = url.pathname.split('/').pop(); // Extract page ID
    event.respondWith(fetchAndCachePage(event.request, pageId));
  }
});

/**
 * Fetch the page and cache it in IndexedDB.
 */
async function fetchAndCachePage(request, pageId) {
  try {
    const response = await fetch(request);
    const htmlContent = await response.text();
    await storePageInIndexedDB(pageId, htmlContent);
    return new Response(htmlContent, {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (error) {
    console.error('Failed to fetch page online:', error);
    // If fetch fails, retrieve from IndexedDB
    const pageContent = await getPageFromIndexedDB(pageId);
    if (pageContent) {
      return new Response(pageContent, {
        status: 200,
        headers: { 'Content-Type': 'text/html' },
      });
    } else {
      return new Response('Offline: Page not found', { status: 404 });
    }
  }
}

/**
 * Store page data in IndexedDB.
 */
async function storePageInIndexedDB(pageId, htmlContent) {
  const db = await openDB();
  await db.pages.put({ id: pageId, htmlContent });
}

/**
 * Retrieve an HTML page from IndexedDB.
 */
async function getPageFromIndexedDB(pageId) {
  const db = await openDB();
  try {
    return await db.pages.get(pageId);
  } catch (error) {
    console.error('Failed to fetch page from IndexedDB:', error);
    return null;
  }
}

/**
 * Open the IndexedDB instance.
 */
async function openDB() {
  if (!self.db) {
    const db = new Dexie('recipeStorage');
    db.version(1).stores({
      recipes: '_id, title, description, prep, cook, category, servings, published, tags, ingredients, images, instructions, nutrition, reviews, lastEditedAt',
      pages: 'id, htmlContent', // Store HTML pages
    });
    self.db = db;
  }
  return self.db;
}
