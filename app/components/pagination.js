'use client'

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function Pagination({ currentPage, totalPages}) {
    const [page, setPage] = useState(currentPage);
    const router = useRouter();
    const searchParams = useSearchParams();

    const onPageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages){
            setPage(newPage);

            const currentQuery = Object.fromEntries(searchParams.entries());

            const newQuery = {
                ...currentQuery,
                page: newPage,
            }

            const currentQueryString = new URLSearchParams(newQuery).toString();
            router.push(`?${currentQueryString}`)
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5; // Max number of pages to display before showing "..."

        // Always show first page
        if (page > 1) {
            pageNumbers.push(
                <button
                    key={1}
                    onClick={() => onPageChange(1)}
                    className={`items-center justify-center w-8 h-8 text-sm border rounded-full shadow-md ${
                        page === 1
                            ? "bg-green-600 text-white font-semibold"
                            : "bg-white text-green-600 border-green-600 hover:bg-green-100"
                    }`}
                >
                    1
                </button>
            );
        }

        // Show "..." if there are pages between the first and the current page window
        if (page > maxPagesToShow) {
            pageNumbers.push(<span key="dots-start" className="px-2">...</span>);
        }

        // Show a few pages around the current page
        for (
            let i = Math.max(2, page - 2);
            i <= Math.min(totalPages - 1, page + 2);
            i++
        ) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={`items-center justify-center w-8 h-8 text-sm border rounded-full shadow-md ${
                        page === i
                            ? "bg-green-600 text-white font-semibold"
                            : "bg-white text-green-600 border-green-600 hover:bg-green-100"
                    }`}
                >
                    {i}
                </button>
            );
        }

        // Show "..." if there are pages between the current page window and the last page
        if (page < totalPages - maxPagesToShow) {
            pageNumbers.push(<span key="dots-end" className="px-2">...</span>);
        }

        // Always show the last page
        if (page < totalPages) {
            pageNumbers.push(
                <button
                    key={totalPages}
                    onClick={() => onPageChange(totalPages)}
                    className={`items-center justify-center w-8 h-8 text-sm border rounded-full shadow-md ${
                        page === totalPages
                            ? "bg-green-600 text-white font-semibold"
                            : "bg-white text-green-600 border-green-600 hover:bg-green-100"
                    }`}
                >
                    {totalPages}
                </button>
            );
        }

        return pageNumbers;
    };

    return (
        <div className="flex justify-center items-center space-x-2 py-4">
            {/* Previous page Button */}
            <button
                title="previous"
                type="button"
                disabled={page === 1}
                onClick={() => onPageChange(page - 1)}
                className={`inline-flex items-center justify-center w-8 h-8 border rounded-full shadow-md ${
                    page === 1 
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white text-green-600 border-green-600 hover:bg-green-100"
                }`}
            >
                <svg
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4"
                >
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </button>

            {/* Render the page numbers */}
            {renderPageNumbers()}

            {/* Next page Button */}
            <button
                title="next"
                type="button"
                disabled={page === totalPages}
                onClick={() => onPageChange(page + 1)}
                className={`inline-flex items-center justify-center w-8 h-8 border rounded-full shadow-md ${
                    page === totalPages
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white text-green-600 border-green-600 hover:bg-green-100"
                }`}
            >
                <svg
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4"
                >
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </button>
        </div>
    );
}
