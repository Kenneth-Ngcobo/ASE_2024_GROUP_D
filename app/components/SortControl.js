import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const SortControl = ({ onSortChange, sortBy, sortOrder }) => {

    const router = useRouter();

    const handleSortChange = (event) => {
        const newSortBy = event.target.value;
        onSortChange(newSortBy, sortOrder);

        const newSortQuery = new URLSearchParams(window.location.search);
        newSortQuery.set('sortBy', newSortBy); 
        newSortQuery.set("page", "1");

        router.push(`?${newSortQuery.toString()}`);
    };

    const handleOrderChange = (event) => {
        const newOrder = event.target.value;
        onSortChange(sortBy, newOrder);

        const newOrderQuery = new URLSearchParams(window.location.search); 
        newOrderQuery.set('order', newOrder); 
        newOrderQuery.set("page", "1");

        router.push(`?${newOrderQuery.toString()}`);
    };

    return (
        <div className="flex gap-4 items-center mb-6 p-4 bg-white rounded-lg shadow dark:bg-gray-950">
            <div className="relative">
                <select
                    value={sortBy}
                    onChange={handleSortChange}
                    className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    <option value="default">Default</option>
                    <option value="createdAt">Newest</option>
                    <option value="prepTime">Preparation Time</option>
                    <option value="cookTime">Cooking Time</option>
                    <option value="instructions">Instructions</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>

            {sortBy !== 'default' && sortBy !== 'createdAt' && (
                <div className="relative">
                    <select
                        value={sortOrder}
                        onChange={handleOrderChange}
                        className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <option value="ascending">Ascending</option>
                        <option value="descending">Descending</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
            )}
        </div>
    );
};

