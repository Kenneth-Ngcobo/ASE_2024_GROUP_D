import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SORT_OPTIONS, SORT_ORDERS } from './sortUtils';
import { useCallback } from 'react';

export const SortControl = ({
    onSortChange,
    sortBy = SORT_OPTIONS.DEFAULT,
    sortOrder = SORT_ORDERS.ASC
}) => {
    const router = useRouter();

    const updateUrl = useCallback((params) => {
        const newQuery = new URLSearchParams(window.location.search);
        Object.entries(params).forEach(([key, value]) => {
            newQuery.set(key, value);
        });
        newQuery.set('page', '1'); // Reset to first page on sort change
        router.push(`?${newQuery.toString()}`);
    }, [router]);

    const handleSortChange = useCallback((event) => {
        const newSortBy = event.target.value;
        onSortChange(newSortBy, sortOrder);
        updateUrl({ sortBy: newSortBy });
    }, [onSortChange, sortOrder, updateUrl]);

    const handleOrderChange = useCallback((event) => {
        const newOrder = event.target.value;
        onSortChange(sortBy, newOrder);
        updateUrl({ order: newOrder });
    }, [onSortChange, sortBy, updateUrl]);

    return (
        <div className="flex gap-4 items-center mb-6 p-4 bg-white rounded-lg shadow">
            <div className="relative">
                <select
                    value={sortBy}
                    onChange={handleSortChange}
                    className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    <option value={SORT_OPTIONS.DEFAULT}>Default</option>
                    <option value={SORT_OPTIONS.CREATED_AT}>Newest</option>
                    <option value={SORT_OPTIONS.PREP_TIME}>Preparation Time</option>
                    <option value={SORT_OPTIONS.COOK_TIME}>Cooking Time</option>
                    <option value={SORT_OPTIONS.INSTRUCTIONS}>Instructions</option>
                </select>
                <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={16}
                />
            </div>

            {sortBy !== SORT_OPTIONS.DEFAULT && sortBy !== SORT_OPTIONS.CREATED_AT && (
                <div className="relative">
                    <select
                        value={sortOrder}
                        onChange={handleOrderChange}
                        className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <option value={SORT_ORDERS.ASC}>Ascending</option>
                        <option value={SORT_ORDERS.DESC}>Descending</option>
                    </select>
                    <ChevronDown
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                        size={16}
                    />
                </div>
            )}
        </div>
    );
};
