"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export const SortControl = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const sortValue = searchParams.get("sort") || "";
    const orderValue = searchParams.get("order") || "desc";

    const handleSortChange = (event) => {
        const newSortBy = event.target.value;
        const params = new URLSearchParams(searchParams);

        if (newSortBy === "") {
            params.delete("sort");
            params.delete("order"); // Remove order if no sort is applied
        } else {
            params.set("sort", newSortBy);
            if (!params.has("order")) {
                params.set("order", "desc"); // Set default order when sort is applied
            }
        }

        params.set("page", "1"); // Reset to the first page on change
        router.push(`?${params.toString()}`);
    };

    const handleOrderChange = (event) => {
        const newOrder = event.target.value;
        const params = new URLSearchParams(searchParams);

        // Apply order only if sort is not default
        if (sortValue) {
            params.set("order", newOrder);
        } else {
            params.delete("order");
        }

        params.set("page", "1");
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="flex gap-4 items-center mb-6 p-4 bg-white rounded-lg shadow dark:bg-gray-950">
            <div className="relative">
                <select
                    value={sortValue}
                    onChange={handleSortChange}
                    className="appearance-none bg-white border dark:border-gray-800 dark:bg-black border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    <option value="">Default</option>
                    <option value="published">Newest</option>
                    <option value="prep">Preparation Time</option>
                    <option value="cook">Cooking Time</option>
                    <option value="instructions">Instructions</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>

            <div className="relative">
                <select
                    value={orderValue}
                    onChange={handleOrderChange}
                    className="appearance-none bg-white dark:bg-black dark:border-gray-800 border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none focus:ring-2 focus:ring-green-500"
                    disabled={!sortValue} // Disable order when no sort is applied
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
        </div>
    );
};