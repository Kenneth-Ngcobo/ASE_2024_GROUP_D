import withPWAInit from "@ducanh2912/next-pwa";
import path from "path";

const withPWA = withPWAInit({
  dest: "public", // The folder where service worker and assets will be placed
  disable: process.env.NODE_ENV === "development", // Disable in development mode
  register: false, // Optionally disable auto-registration of the service worker
  scope: "/app", // The scope of your PWA (ensure this aligns with your routing)
  sw: "Service-Worker.js", // Ensure this service worker file exists in the public folder
  reloadOnOnline: true, // Reload when back online
  cacheOnFrontendNav: true, // Cache frontend navigation
  aggressiveFrontEndNavCaching: true, // Aggressive caching on frontend navigation
  fallbacks: {
    page: "/offline.html", // Ensure this HTML file exists in the public folder
    image: "/restaurant.png", // Ensure this image exists in the public folder
  },
//   customWorkerSrc: path.join(__dirname, "public", "custom-worker.js"), // Absolute path for custom worker in the public folder
//   customWorkerDest: "custom-worker.js", // Destination of the custom worker in the public folder
//   customWorkerPrefix: "my-custom-", // Custom prefix for your service worker
});

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
