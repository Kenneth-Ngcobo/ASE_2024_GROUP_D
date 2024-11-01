import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

/**
 * A component for controlling sorting of recipes by various options and orders.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onSortChange - Function to handle sorting changes.
 * @param {string} props.sortBy - Current sorting field.
 * @param {string} props.sortOrder - Current sorting order, 'ascending' or 'descending'.
 * @returns {JSX.Element} The rendered component.
 */
export const SortControl = ({ onSortChange, sortBy, sortOrder }) => {
    
    const router = useRouter();
    
    /**
     * Handles change in sorting field selection.
     * @param {Object} event - The change event.
     */
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

/**
 * Sorts an array of recipe objects based on the specified field and order.
 *
 * @param {Array} recipes - The array of recipe objects to be sorted.
 * @param {string} sortBy - The field by which to sort the recipes. Valid options are:
 *     'createdAt' (sorts by published date),
 *     'prepTime' (sorts by preparation time),
 *     'cookTime' (sorts by cooking time),
 *     'instructions' (sorts by the number of instructions).
 * @param {string} sortOrder - The order of sorting; either 'ascending' or 'descending'.
 * @returns {Array} The sorted array of recipe objects.
 */
export const sortRecipes = (recipes, sortBy, sortOrder) => {
    if (!recipes?.length) return recipes;

    const sorted = [...recipes];

    /**
     * Compares two values based on the specified order.
     *
     * @param {number} a - The first value to compare.
     * @param {number} b - The second value to compare.
     * @param {string} order - The order of comparison; either 'ascending' or 'descending'.
     * @returns {number} The comparison result, positive or negative, based on the sort order.
     */
    const compareValues = (a, b, order = 'ascending') => {
        const multiplier = order === 'ascending' ? 1 : -1;
        return (a - b) * multiplier;
    };

    // Define sorting strategies based on sortBy options
    const sortingStrategies = {
        /**
         * Sort by creation date in descending order by default (newest first).
         * @param {Object} a - The first recipe object.
         * @param {Object} b - The second recipe object.
         * @returns {number} The comparison result for dates.
         */
        createdAt: (a, b) => {
            const dateA = new Date(a.published || 0).getTime();
            const dateB = new Date(b.published || 0).getTime();
            return compareValues(dateB, dateA, 'descending');
        },

        /**
         * Sort by preparation time.
         * @param {Object} a - The first recipe object.
         * @param {Object} b - The second recipe object.
         * @returns {number} The comparison result for preparation times.
         */
        prepTime: (a, b) => {
            const timeA = parseInt(a.prep) || 0;
            const timeB = parseInt(b.prep) || 0;
            return compareValues(timeA, timeB, sortOrder);
        },

        /**
         * Sort by cooking time.
         * @param {Object} a - The first recipe object.
         * @param {Object} b - The second recipe object.
         * @returns {number} The comparison result for cooking times.
         */
        cookTime: (a, b) => {
            const timeA = parseInt(a.cook) || 0;
            const timeB = parseInt(b.cook) || 0;
            return compareValues(timeA, timeB, sortOrder);
        },

        /**
         * Sort by the number of instructions.
         * @param {Object} a - The first recipe object.
         * @param {Object} b - The second recipe object.
         * @returns {number} The comparison result for instruction counts.
         */
        instructions: (a, b) => {
            const lenA = Array.isArray(a.instructions) ? a.instructions.length : 0;
            const lenB = Array.isArray(b.instructions) ? b.instructions.length : 0;
            return compareValues(lenA, lenB, sortOrder);
        }
    };

    return sorted.sort(sortingStrategies[sortBy] || (() => 0));
};
