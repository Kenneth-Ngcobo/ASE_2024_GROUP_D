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
  };

  return new Response(JSON.stringify(manifest), {
    headers: {
      'Content-Type': 'application/json',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
