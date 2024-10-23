import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    return (
        <header className="bg-gradient-to-r from-green-600 via-green-300 to-green-100 shadow-lg sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between p-4">

                {/* Logo section with link to the home page */}
                <Link href="/" className="flex items-center">
                    {/* Display the logo using Next.js Image component */}
                    <Image
                        src="/Kwa.jpg"
                        alt="Logo"
                        width={100}
                        height={80}
                        className="mr-2"
                    />
                    {/* Placeholder for logo text with a custom font (Lobster) */}
                    <span className="text-3xl font-bold tracking-tight text-white font-lobster">
                        {/* Add your brand name or logo text here */}
                    </span>
                </Link>

                {/* Navigation Links visible on medium and larger screens (hidden on small screens) */}
                <nav className="hidden md:flex space-x-6">
                    {/* Home link with Roboto font, rounded button, and hover effects */}
                    <Link
                        href="/"
                        className="px-4 py-2 rounded-full text-white font-medium hover:bg-green-700 hover:bg-opacity-80 transition-colors duration-300"
                        style={{ fontFamily: 'Roboto, sans-serif' }}
                    >
                        Home
                    </Link>

                    {/* Recipes link with Montserrat font, similar styling to Home */}
                    <Link
                        href="/recipes"
                        className="px-4 py-2 rounded-full text-white font-medium hover:bg-green-700 hover:bg-opacity-80 transition-colors duration-300"
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                        Recipes
                    </Link>

                    {/* About link with Open Sans font, same styling */}
                    <Link
                        href="/about"
                        className="px-4 py-2 rounded-full text-white font-medium hover:bg-green-700 hover:bg-opacity-80 transition-colors duration-300"
                        style={{ fontFamily: 'Open Sans, sans-serif' }}
                    >
                        About
                    </Link>
                </nav>

                {/* Mobile Menu Button visible on small screens (md:hidden) */}
                <div className="md:hidden">
                    <button
                        className="text-white focus:outline-none"
                        aria-label="Open Menu" // Accessibility label for the button
                    >
                        {/* Menu icon (hamburger icon) displayed using an SVG */}
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7" // Path data for the lines in the icon
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
}
