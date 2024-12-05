import withPWAInit from "@ducanh2912/next-pwa";
import path from "path";

const withPWA = withPWAInit({
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    register: false,
    scope: "/app",
    sw: "Service-Worker.js",
    reloadOnOnline: true,
    cacheOnFrontendNav: true,
    aggressiveFrontEndNavCaching: true,
    fallbacks: {
      // Keep image fallback if required
      image: "/home page1.jpg",
    },
    customWorkerSrc: path.resolve("custom-worker.js"), // Ensure path is correct
    customWorkerDest: path.resolve("custom-worker.js"),
    customWorkerPrefix: "my-custom-",
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