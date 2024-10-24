import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Recipe website</title> {/* Page title shown in the browser tab */}
        <link rel="icon" href="restaurant.png" /> {/* Favicon for the website */}

        {/* Main Meta Tags */}
        <meta name="description" content="This is a recipe website" /> {/* Description for SEO */}
        <meta
          name="keywords"
          content="Food, recipe, dinner, lunch, snack, breakfast, vegan, ingredients " // Keywords for SEO
        />
        <meta name="author" content="Codespace" /> {/* Author of the website */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" /> {/* Responsive design meta tag */}

        {/* Open Graph Meta Tags for social media sharing */}
        <meta property="og:title" content="Recipe Website" /> {/* Title for social media previews */}
        <meta property="og:description" content="This is a recipe website" /> {/* Description for social media */}
        <meta property="og:image" content="/knifefork.png" /> {/* Image for social media previews */}
        <meta property="og:url" content="To be added" /> {/* URL of the webpage for social media */}

        {/* Twitter Meta Tags for better sharing experience on Twitter */}
        <meta name="twitter:card" content="summary_large_image" /> {/* Type of Twitter card */}
        <meta name="twitter:title" content="Recipe Website" /> {/* Title for Twitter previews */}
        <meta name="twitter:description" content="This is a recipe website" /> {/* Description for Twitter */}
        <meta name="twitter:image" content="/knifefork.png" /> {/* Image for Twitter previews */}
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`} // Applying custom fonts and antialiasing for better text rendering
      >
        <Header /> {/* Rendering the Header component */}
        {children} {/* Rendering the child components or pages */}
       
      </body>
    </html>
  );
}
