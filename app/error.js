'use client';

import { useEffect } from 'react';

/**
 * Error component to display a fallback UI when an error occurs.
 *
 * @param {Object} props - Component props.
 * @param {Error} props.error - The error object to display.
 * @param {Function} props.reset - A function to reset the error boundary.
 * @returns {JSX.Element} The rendered error UI.
 */
export default function Error({ error, reset }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <section className="flex items-center h-full p-16 dark:bg-gray-50 text-gray-800">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                <div className="max-w-md text-center">
                    <h2 className="mb-8 font-extrabold text-9xl text-gray-400">
                        <span className="sr-only">Error</span>Oops!
                    </h2>
                    <p className="text-2xl font-semibold md:text-3xl">Something went wrong on the Home Page!</p>
                    <p className="mt-4 mb-8 text-gray-600">Do not worry, try refreshing or return to the homepage.</p>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => reset()}
                            className="px-8 py-3 font-semibold rounded bg-[#ff4f1a] dark:bg-green-600 dark:text-gray-50"
                        >
                            Try again
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}