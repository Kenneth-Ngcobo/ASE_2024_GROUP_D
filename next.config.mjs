import withPWAInit from "@ducanh2912/next-pwa";
import path from "path";

// Initialize PWA configuration with custom Workbox
const withPWA = withPWAInit({
  dest: "public", // Directory where service worker files are stored
  disable: process.env.NODE_ENV === "development",
  register: false,
  scope: "/app",
  sw: "Service-Worker.js",
  reloadOnOnline: true,
  cacheOnFrontendNav: true, // Enable additional route caching when users navigate through pages
  aggressiveFrontEndNavCaching: true, // Cache <link rel="stylesheet" /> and <script /> on frontend navigation
  fallbacks: {
    // Fallback for page requests when user is offline
    document: "/offline.html", // Fallback to the offline page for failed page requests
    // Fallback for images
    image: "/home page1.jpg", // Specify your image fallback
  },
  // Use a custom service worker with Workbox
  customWorkerSrc: path.resolve("/custom-worker.js"), // Path to custom worker file
  customWorkerDest: path.resolve( "/custom-worker.js"), // Output path for worker
  customWorkerPrefix: "my-custom-", // Add a custom prefix to your worker file name
});

// Create a custom service worker in the public directory to manage caching
// This file is going to be created inside your 'public' directory (custom-worker.js)

// Example of the service worker logic (custom-worker.js) to include the caching strategy
const customWorker = `
  import { skipWaiting, clientsClaim } from 'workbox-core';
  import { registerRoute } from 'workbox-routing';
  import { NetworkFirst, CacheOnly } from 'workbox-strategies';
  import { ExpirationPlugin } from 'workbox-expiration';

  // Skip waiting and claim clients immediately
  skipWaiting();
  clientsClaim();

  // Cache recipe API responses using a NetworkFirst strategy
  registerRoute(
    /\/api\/recipes\//, // Match the API endpoint for recipe fetching
    new NetworkFirst({
      cacheName: 'recipe-api-cache',
      plugins: [
        new ExpirationPlugin({
          maxEntries: 50, // Limit the number of items in cache
          maxAgeSeconds: 60 * 60 * 24, // Cache data for 1 day
        }),
      ],
    })
  );

  // Fallback to cached recipes if offline
  registerRoute(
    ({ request }) => request.destination === 'document',
    new CacheOnly({
      cacheName: 'recipe-api-cache',
    })
  );
`;

// Save this string as 'custom-worker.js' inside the 'public' directory (or whichever folder you're using)

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.sndimg.com",
        port: "",
        pathname: "/**", // Allows any path from the hostname
      },
    ],
  },
};

// Export the configuration wrapped with PWA
export default withPWA(nextConfig);
