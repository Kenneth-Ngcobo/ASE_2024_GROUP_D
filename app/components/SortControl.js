import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const SortControl = ({ onSortChange, sortBy, sortOrder }) => {
    const handleSortChange = (event) => {
        const newSortBy = event.target.value;
        onSortChange(newSortBy, sortOrder);
    };

    const handleOrderChange = (event) => {
        const newOrder = event.target.value;
        onSortChange(sortBy, newOrder);
    };

    return (
        <div className="flex gap-4 items-center mb-6 p-4 bg-white rounded-lg shadow">
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

export const sortRecipes = (recipes, sortBy, sortOrder) => {
    if (!recipes?.length) return recipes;

    const sorted = [...recipes];
    const compareValues = (a, b, order = 'ascending') => {
        const multiplier = order === 'ascending' ? 1 : -1;
        return (a - b) * multiplier;
    };

    const sortingStrategies = {
        createdAt: (a, b) => {
            const dateA = new Date(a.published || 0).getTime();
            const dateB = new Date(b.published || 0).getTime();
            return compareValues(dateB, dateA, 'descending'); // Newest first by default
        },
        prepTime: (a, b) => {
            const timeA = parseInt(a.prep) || 0;
            const timeB = parseInt(b.prep) || 0;
            return compareValues(timeA, timeB, sortOrder);
        },
        cookTime: (a, b) => {
            const timeA = parseInt(a.cook) || 0;
            const timeB = parseInt(b.cook) || 0;
            return compareValues(timeA, timeB, sortOrder);
        },
        instructions: (a, b) => {
            const lenA = Array.isArray(a.instructions) ? a.instructions.length : 0;
            const lenB = Array.isArray(b.instructions) ? b.instructions.length : 0;
            return compareValues(lenA, lenB, sortOrder);
        }
    };

    return sorted.sort(sortingStrategies[sortBy] || (() => 0));
};