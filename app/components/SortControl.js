import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export const SortControl = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSortChange = (event) => {
        const newSortBy = event.target.value;
        const params = new URLSearchParams(searchParams);
        params.set('sort', newSortBy);
        params.set('page', '1');
        router.push(`?${params.toString()}`);
    };

    const handleOrderChange = (event) => {
        const newOrder = event.target.value;
        const params = new URLSearchParams(searchParams);
        params.set('order', newOrder);
        params.set('page', '1');
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="flex gap-4 items-center mb-6 p-4 bg-white rounded-lg shadow dark:bg-gray-950">
            <div className="relative">
                <select
                    value={searchParams.get('sort') || 'createdAt'}
                    onChange={handleSortChange}
                    className="appearance-none bg-white border dark:bg-black border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    <option value="default">Default</option>
                    <option value="published">Newest</option>
                    <option value="prep">Preparation Time</option>
                    <option value="cook">Cooking Time</option>
                    <option value="instructionsCount">Instructions</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>

            <div className="relative">
                <select
                    value={searchParams.get('order') || 'desc'}
                    onChange={handleOrderChange}
                    className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
        </div>
    );
};
