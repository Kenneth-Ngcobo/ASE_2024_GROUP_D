import { skipWaiting, clientsClaim } from "workbox-core";
import { registerRoute } from "workbox-routing";
import { NetworkFirst } from "workbox-strategies";
import { openDB } from "idb";

// Skip waiting and claim clients immediately
skipWaiting();
clientsClaim();

// Function to fetch data from IndexedDB
async function fetchFromIndexedDB(url) {
  const db = await openDB("my-pwa-db", 1);
  return db.get("pages", url.pathname);
}

// Fallback strategy for pages
registerRoute(
  ({ request }) => request.destination === "document",
  async ({ event }) => {
    try {
      // Try fetching the page from the network
      const networkResponse = await fetch(event.request);
      return networkResponse;
    } catch (error) {
      // If offline, fetch the page data from IndexedDB
      const fallbackData = await fetchFromIndexedDB(new URL(event.request.url));
      if (fallbackData) {
        return new Response(fallbackData, {
          headers: { "Content-Type": "text/html" },
        });
      }
      return new Response("<h1>Offline and no cached data available</h1>", {
        headers: { "Content-Type": "text/html" },
      });
    }
  }
);

// Example: Cache API responses
registerRoute(
  /\/api\/recipes\//,
  new NetworkFirst({
    cacheName: "recipe-api-cache",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24,
      }),
    ],
  })
);
