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
        src: '/0.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  };
  return new Response(JSON.stringify(manifest), {
    headers: {
      'Content-Type': 'application/json',
    },
    ],
  };
  return new Response(JSON.stringify(manifest), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
