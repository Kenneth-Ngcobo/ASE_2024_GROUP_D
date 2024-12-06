'use client';

import { useState, useEffect } from 'react';


/**
 * Component to display potential allergens for a recipe.
 * Fetches allergen information from an API and displays loading, error, or allergen data.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.recipeId - The ID of the recipe to fetch allergens for.
 * @returns {JSX.Element} A React component displaying allergens or a status message.
 */
export default function AllergensSection({ recipeId }) {
    const [allergens, setAllergens] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        /**
         * Fetch allergens from the API.
         */
        async function fetchAllergens() {
            try {
                setIsLoading(true);
                const response = await fetch(`/api/recipes/${recipeId}/allergens`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Failed to fetch allergens');
                }

                setAllergens(data.allergens);
                setError(null);
            } catch (err) {
                console.error('Allergens fetch error:', err);
                setError(err.message);
                setAllergens([]);
            } finally {
                setIsLoading(false);
            }
        }

        if (recipeId) {
            fetchAllergens();
        }
    }, [recipeId]);

    if (isLoading) {
        return (
            <div className="bg-white dark:bg-gray-950 rounded-2xl shadow-xl p-4">
                <div className="animate-pulse space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-8 bg-gray-100 rounded"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white dark:bg-gray-950 rounded-2xl shadow-xl p-4">
                <div className="text-red-500 text-sm">
                    Unable to load allergens: {error}
                </div>
            </div>
        );
    }

    if (!allergens || allergens.length === 0) {
        return (
            <div className="bg-white dark:bg-gray-950 rounded-2xl shadow-xl p-4">
                <div className="text-gray-500 text-sm">
                    No allergen information available
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-950 rounded-2xl shadow-xl p-4">
            <h3 className="text-lg font-semibold text-[#fc9d4f] mb-2">
                ⚠️ Potential Allergens
            </h3>
            <div className="flex flex-wrap gap-2">
                {allergens.map((allergen, index) => (
                    <span
                        key={index}
                        className="px-3 py-1 bg-[#ff4f1a] text-[#020123]-800 rounded-full text-sm font-medium"
                    >
                        {allergen}
                    </span>
                ))}
            </div>
            <p className="text-sm text-[#020123]-600 mt-2">
                This recipe may contain ingredients that are common allergens.
                Please check the full ingredient list carefully.
            </p>
        </div>
    );
}
