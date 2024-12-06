"use client"

import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { XCircle, Timer, Coffee, Utensils } from 'lucide-react';
import { useRouter } from 'next/navigation';

/**
 * Highlights search terms in a given text by wrapping the matching parts with a styled span.
 *
 * @param {Object} props - Component props.
 * @param {string} props.text - The text to be searched for highlights.
 * @param {Array<string>} props.searchTerms - The terms to highlight in the text.
 * @returns {JSX.Element} - The text with highlighted search terms.
 */
const HighlightedText = ({ text, searchTerms }) => {
    if (!searchTerms || searchTerms.length === 0) return text;

    const pattern = searchTerms
        .filter(term => term.length > 0)
        .map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
        .join('|');

    if (!pattern) return text;

    const regex = new RegExp(`(${pattern})`, 'gi');
    const parts = text.split(regex);

    return (
        <span>
            {parts.map((part, i) =>
                regex.test(part) ? (
                    <span key={i} className="bg-teal-100 text-teal-800 font-medium">{part}</span>
                ) : (
                    <span key={i}>{part}</span>
                )
            )}
        </span>
    );
};

/**
 * RecipeSearchBar component that provides a search input with real-time suggestions for recipes.
 * It fetches recipe suggestions based on the user's search input and allows users to search by title, ingredient, or category.
 * It also displays recent searches and allows users to clear them.
 *
 * @param {Object} props - Component props.
 * @param {string} [props.currentSearch] - The initial search query.
 * @param {Function} props.onSearch - A callback function that is called when a search is made.
 * @param {number} [props.minCharacters=2] - The minimum number of characters required to trigger search suggestions.
 * @returns {JSX.Element} - The RecipeSearchBar component with input field and suggestion list.
 */
const RecipeSearchBar = ({
    currentSearch = '',
    onSearch,
    minCharacters = 2
}) => {
    const [search, setSearch] = useState(currentSearch);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [recentSearches, setRecentSearches] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        setSearch(currentSearch);
    }, [currentSearch]);

    /**
     * Formats the search input into individual terms to be used in the search query.
     *
     * @param {string} searchText - The search input text.
     * @returns {Array<string>} - An array of search terms.
     */
    const getSearchTerms = (searchText) => {
        return searchText
            .toLowerCase()
            .split(' ')
            .filter(term => term.length >= minCharacters);
    };

    /**
     * Saves the search term to local storage as a recent search.
     *
     * @param {string} searchTerm - The search term to be saved.
     */
    const saveRecentSearch = (searchTerm) => {
        const updatedSearches = [
            searchTerm,
            ...recentSearches.filter(term => term !== searchTerm)
        ].slice(0, 5);

        setRecentSearches(updatedSearches);
        localStorage.setItem('recentRecipeSearches', JSON.stringify(updatedSearches));
    };

    /**
     * Fetches recipe suggestions based on the current search input.
     */
    useEffect(() => {
        const fetchSuggestions = async () => {
            if (search.length < minCharacters) {
                setSuggestions([]);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                // Check for an exact match
                const exactMatchResponse = await fetch(`/api/recipes?exactTitle=${encodeURIComponent(search)}`);
                if (!exactMatchResponse.ok) throw new Error('Failed to check for exact match');
                const exactMatchData = await exactMatchResponse.json();

                if (exactMatchData.recipes && exactMatchData.recipes.length > 0) {
                    setSelectedRecipe(exactMatchData.recipes[0]);
                    setShowSuggestions(false);
                    return;
                }

                // Fallback to general suggestions
                const params = new URLSearchParams({
                    search,
                    limit: '10',
                    page: '1',
                });

                const response = await fetch(`/api/recipes?${params}`);
                if (!response.ok) throw new Error('Failed to fetch suggestions');

                const data = await response.json();
                setSuggestions(data.recipes);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
                setError('Failed to fetch suggestions. Please try again.');
                setSuggestions([]);
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(fetchSuggestions, 500);
        return () => clearTimeout(timeoutId);
    }, [search, minCharacters]);

    /**
     * Fetches details of a specific recipe by ID.
     *
     * @param {string} recipeId - The ID of the recipe to fetch.
     */
    const fetchRecipeDetails = async (recipeId) => {
        try {
            const response = await fetch(`/api/recipes/${recipeId}`);
            if (!response.ok) throw new Error('Failed to fetch recipe details');

            const data = await response.json();
            setSelectedRecipe(data.recipe);
        } catch (error) {
            console.error('Error fetching recipe details:', error);
        }
    };

    /**
     * Handles the form submission for the search input.
     *
     * @param {Event} e - The form submit event.
     */
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (search.trim()) {
            saveRecentSearch(search.trim());
            setShowSuggestions(false);
            setSelectedRecipe(null);

            router.push(`/?search=${encodeURIComponent(search.trim())}`);
            if (onSearch) {
                onSearch(search);
            }
        }
    };

    /**
     * Handles the click on a suggestion.
     *
     * @param {Object} suggestion - The selected suggestion object.
     */
    const handleSuggestionClick = (suggestion) => {
        setSearch(suggestion.title);
        saveRecentSearch(suggestion.title);
        setShowSuggestions(false);
        setSelectedRecipe(null);
        fetchRecipeDetails(suggestion._id);
    };

    /**
     * Clears the current search input and suggestions.
     */
    const clearSearch = () => {
        setSearch('');
        setShowSuggestions(false);
        setSuggestions([]);
        setSelectedRecipe(null);
        if (onSearch) {
            onSearch('');
        }
    };

    /**
     * Clears the recent search history stored in local storage.
     */
    const clearRecentSearches = () => {
        setRecentSearches([]);
        localStorage.removeItem('recentRecipeSearches');
    };

    const searchTerms = getSearchTerms(search);

    return (
        <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative">
                <div className="relative flex items-center">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#ff4f1a]">
                        <FaSearch className="h-4 w-4" />
                    </div>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setShowSuggestions(true);
                        }}
                        onFocus={() => setShowSuggestions(true)}
                        placeholder="Search for recipes by title, ingredient, or category..."
                        className="w-full pl-12 pr-12 py-4 bg-white border-2 dark:bg-black dark:border-gray-950 border-gray-100 rounded-xl focus:outline-none focus:border-teal-500 focus:ring-0 text-gray-700 placeholder-gray-400 transition-all duration-200"
                        aria-label="Search recipes"
                    />
                    <div className="absolute right-0 flex items-center space-x-1 mr-2">
                        {search && (
                            <button
                                type="button"
                                onClick={clearSearch}
                                className="absolute right-4 p-2 text-gray-400 hover:text-teal-500 transition-colors duration-200"
                                aria-label="Clear search"
                            >
                                <XCircle className="h-5 w-5" />
                            </button>
                        )}
                    </div>
                </div>

                {showSuggestions && (
                    <div
                        className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        {loading ? (
                            <div className="p-6 text-gray-600 flex items-center justify-center">
                                <Coffee className="animate-spin mr-2 text-teal-500" />
                                <span className="font-medium">Finding recipes...</span>
                            </div>
                        ) : error ? (
                            <div className="p-6 text-red-600 text-center font-medium">
                                {error}
                                <button
                                    onClick={() => setSearch('')}
                                    className="mt-2 text-green-600 hover:underline"
                                >
                                    Retry
                                </button>
                            </div>
                        ) : suggestions.length > 0 ? (
                            <ul className="divide-y divide-gray-100">
                                {suggestions.map((suggestion, index) => (
                                    <li
                                        key={suggestion._id || index}
                                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                                        onClick={() => handleSuggestionClick(suggestion)}
                                    >
                                        <div className="p-4">
                                            <div className="flex items-center mb-2">
                                                <Utensils className="h-4 w-4 text-teal-500 mr-3" />
                                                <span className="font-medium text-gray-800">
                                                    <HighlightedText
                                                        text={suggestion.title}
                                                        searchTerms={searchTerms}
                                                    />
                                                </span>
                                            </div>
                                            {suggestion.cookTime && (
                                                <div className="flex items-center text-sm text-gray-500 mt-2 ml-7">
                                                    <Timer className="h-4 w-4 mr-1 text-teal-500" />
                                                    <span>{suggestion.cookTime} mins</span>
                                                </div>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : search.length >= minCharacters ? (
                            <div className="p-6 text-gray-600 text-center font-medium">
                                No recipes found matching &quot;{search}&quot;
                                <button
                                    onClick={clearRecentSearches}
                                    className="mt-2 text-green-600 hover:underline"
                                >
                                    Clear recent searches
                                </button>
                            </div>
                        ) : recentSearches.length > 0 ? (
                            <div className="p-4">
                                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3 px-2">Recent Searches</h3>
                                <ul className="space-y-2">
                                    {recentSearches.map((term, index) => (
                                        <li
                                            key={index}
                                            className="cursor-pointer text-gray-700 hover:text-teal-500 flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                            onClick={() => {
                                                setSearch(term);
                                                setShowSuggestions(false);
                                                if (onSearch) onSearch(term);
                                            }}
                                        >
                                            <FaSearch className="h-3 w-3 mr-3 text-gray-400" />
                                            {term}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : null}
                    </div>
                )}
            </form>

            {selectedRecipe && (
                <div className="mt-8 p-6 bg-white rounded-xl shadow-md border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">{selectedRecipe.title}</h2>
                    <p className="text-gray-600 mb-4 leading-relaxed">{selectedRecipe.description}</p>
                    <div className="flex items-center text-sm text-gray-500">
                        <Timer className="h-4 w-4 mr-2 text-teal-500" />
                        <span>{selectedRecipe.cookTime} mins</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecipeSearchBar;
