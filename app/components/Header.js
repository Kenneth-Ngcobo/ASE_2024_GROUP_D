
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between p-4">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <Image
                        src="/restaurant.png" 
                        alt="Logo"
                        width={40}
                        height={40}
                        priority
                        className="mr-2"
                    />
                    <span className="text-xl font-semibold tracking-tight">
                        MyApp
                    </span>
                </Link>

                {/* Navigation Links */}
                <nav className="hidden md:flex space-x-6">
                    <Link
                        href="/"
                        className="text-gray-700 hover:text-black transition-colors"
                    >
                        Home
                    </Link>
                    <Link
                        href="/recipes"
                        className="text-gray-700 hover:text-black transition-colors"
                    >
                        Recipes
                    </Link>
                    <Link
                        href="/about"
                        className="text-gray-700 hover:text-black transition-colors"
                    >
                        About
                    </Link>
                    {/* <Link
                        href="/contact"
                        className="text-gray-700 hover:text-black transition-colors"
                    >
                        Contact
                    </Link> */}
                </nav>

                {/* Button */}
                <div className="hidden md:flex">
                    {/* <Link href="/login">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            Login
                        </button>
                    </Link> */}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button
                        className="text-gray-700 focus:outline-none"
                        aria-label="Open Menu"
                    >
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
                                d="M4 6h16M4 12h16m-7 6h7"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
}
