import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <h2 className="text-4xl font-bold mb-4">Page Not Found</h2>
      <p className="text-lg mb-6 text-center">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <Link
        href="/"
        className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 rounded-md shadow-md transition duration-300 dark:bg-blue-500 dark:hover:bg-blue-400 dark:focus:ring-blue-700"
      >
        Return Home
      </Link>
    </div>
  );
}
