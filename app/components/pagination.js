"use client"

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
                    className={`items-center justify-center w-8 h-8 text-sm border rounded shadow-md ${
                        page === 1
                            ? "bg-slate-800 text-white font-semibold"
                            : "bg-slate-100 hover:bg-slate-200"
                    }`}
                >
                    1
                </button>
            );
        }

        // Show "..." if there are pages between the first and the current page window
        if (page > maxPagesToShow) {
            pageNumbers.push(<span key="dots-start">...</span>);
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
                    className={`items-center justify-center w-8 h-8 text-sm border rounded shadow-md ${
                        page === i
                            ? "bg-slate-800 text-white font-semibold"
                            : "bg-slate-100 hover:bg-slate-200"
                    }`}
                >
                    {i}
                </button>
            );
        }

        // Show "..." if there are pages between the current page window and the last page
        if (page < totalPages - maxPagesToShow) {
            pageNumbers.push(<span key="dots-end">...</span>);
        }

        // Always show the last page
        if (page < totalPages) {
            pageNumbers.push(
                <button
                    key={totalPages}
                    onClick={() => onPageChange(totalPages)}
                    className={`items-center justify-center w-8 h-8 text-sm border rounded shadow-md ${
                        page === totalPages
                            ? "bg-slate-800 text-white font-semibold"
                            : "bg-slate-100 hover:bg-slate-200"
                    }`}
                >
                    {totalPages}
                </button>
            );
        }

        return pageNumbers;
    };


    return (
        <div className="flex justify-center space-x-1 text-gray-800">
            {/* Previous page Button */}
            <button
                title="previous"
                type="button"
                disabled={page === 1}
                onClick={() => onPageChange(page - 1)}
                className={`inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:border-gray-100 hover:bg-slate-900 ${
                    page === 1 ? "cursor-not-allowed opacity-50" : ""
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
                className={`inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:border-gray-100 hover:bg-slate-900 ${
                    page === totalPages ? "cursor-not-allowed opacity-50" : ""
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
    )
}