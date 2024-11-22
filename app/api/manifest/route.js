export async function GET(request) {
    const manifest = {
      name: 'Next.js App',
      short_name: 'Next.js App',
      description: 'Next.js App',
      start_url: '/',
      display: 'standalone',
      background_color: '#fff',
      theme_color: '#fff',
      icons: [
        {
          src: '/Kwa.png',
          sizes: '192x192',
          type: 'image/png',
        },
      ],
    };
    return new Response(JSON.stringify(manifest), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  