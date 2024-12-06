/**
 * Generates the Web App Manifest for the application.
 * 
 * The manifest provides metadata for Progressive Web Apps (PWA),
 * defining how the app should behave when installed on a user's device.
 * 
 * @async
 * @function GET
 * @returns {Promise<Response>} A promise that resolves to a Response object
 *                              containing the web app manifest in JSON format
 */
import { FaHeart, FaRegHeart } from 'react-icons/fa';

export async function GET(request) {
  const manifest = {
    name: 'Kwamai Eatery',
    short_name: 'Next.js App',
    description: 'Next.js App',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicon/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/favicon/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/favicon/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    screenshots: [
      {
        src: '/screenshot-wide.png',
        sizes: '1024x576',
        type: 'image/png',
        form_factor: 'wide',
      },
      {
        src: '/screenshot-mobile.png',
        sizes: '447x800',
        type: 'image/png',
      },
    ],
    shortcuts: [
      {
        name: 'My Account',
        short_name: 'Acc',
        description: 'Quickly sign in to the app',
        url: '/editdetails', // Adjust to your sign-in page route
        icons: [
          {
            src: '/0.png', // Ensure you have an appropriate icon
            sizes: '2000x2000',
            type: 'image/png',
          },
        ],
      },
      {
        name: 'My Favourites',
        short_name: 'Favourites',
        description: 'View your favourite items',
        url: '/favourites', // Adjust to your favourites page route
        icons: [
          {
            src: '/0.png', // Ensure you have an appropriate icon
            sizes: '2000x2000',
            type: 'image/png',
          },
        ],
      },
      {
        name: 'My Shopping List',
        short_name: 'ShoppingList',
        description: 'View your ShoppingList items',
        url: '/shopping-list', // Adjust to your favourites page route
        icons: [
          {
            src: '/0.png', // Ensure you have an appropriate icon
            sizes: '2000x2000',
            type: 'image/png',
          },
        ],
      },
    ],
  };

  return new Response(JSON.stringify(manifest), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}