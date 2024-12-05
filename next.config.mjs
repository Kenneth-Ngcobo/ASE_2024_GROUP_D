import withPWAInit from "@ducanh2912/next-pwa";

// Initialize PWA configuration
const withPWA = withPWAInit({
  dest: "public", // Directory where service worker files are stored
  // Uncomment and customize options as needed
   disable: process.env.NODE_ENV === "development",
   register: true,
   scope: "/app",
   sw: "Service-Worker.js",
});

// Define your Next.js configuration
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
  }
};

// Export the configuration wrapped with PWA
export default withPWA(nextConfig);
