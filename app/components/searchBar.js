"use client"

import { useState, useEffect, useCallback } from 'react';
import { FaSearch } from 'react-icons/fa';
import { XCircle, Timer, Coffee, Utensils } from 'lucide-react';
import { useRouter } from 'next/navigation';


/**
 * Component to highlight search terms within a text.
 * @param {Object} props - The properties object.
 * @param {string} props.text - The text to highlight.
 * @param {string[]} props.searchTerms - The search terms to highlight.
 * @returns {JSX.Element} Highlighted text.
 */

const HighlightedText = ({ text, highlights }) => {
    return (
        <span>
            {highlights.map((part, index) => (
                <span 
                    key={index} 
                    className={part.isMatch ? 'bg-yellow-200 font-medium' : ''}
                >
                    {part.text}
                </span>
            ))}
        </span>
    );
};


/**
 * Component for a recipe search bar with suggestions and recent searches.
 * @param {Object} props - The properties object.
 * @param {string} [props.currentSearch=''] - The current search term.
 * @param {Function} props.onSearch - Callback function to handle search submission.
 * @param {number} [props.minCharacters=2] - Minimum characters required to trigger suggestions.
 * @returns {JSX.Element} Recipe search bar.
 */

const RecipeSearchBar = ({
    currentSearch = '',
    onSearch,
    minCharacters = 3
}) => {
    const [search, setSearch] = useState(currentSearch);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [recentSearches, setRecentSearches] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null); // New state for selected recipe
    const router = useRouter();

    const fetchSuggestions = async (query) => {
        if (query.length < minCharacters) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        setLoading(true);
        setError(null);

        /**
     * Extracts search terms from the search text.
     * @param {string} searchText - The text to extract search terms from.
     * @returns {string[]} Array of search terms.
     */

    const getSearchTerms = (searchText) => {
        return searchText
            .toLowerCase()
            .split(' ')
            .filter(term => term.length >= minCharacters);
    };

        /**
     * Saves a search term to the recent searches in localStorage.
     * @param {string} searchTerm - The search term to save.
     */

    const saveRecentSearch = (searchTerm) => {
        const updatedSearches = [
            searchTerm,
            ...recentSearches.filter(term => term !== searchTerm)
        ].slice(0, 5);

        setRecentSearches(updatedSearches);
        localStorage.setItem('recentRecipeSearches', JSON.stringify(updatedSearches));
    };

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (search.length < minCharacters) {
                setSuggestions([]);
                return;
            }

            try {
                setLoading(true);
                const params = new URLSearchParams({
                    search,
                    limit: '5',
                    page: '1'
                });

                const response = await fetch(`/api/recipes?${params}`);
                if (!response.ok) throw new Error('Failed to fetch suggestions');

                const data = await response.json();
                setSuggestions(data.recipes);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
                setSuggestions([]);
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(fetchSuggestions, 500);
        return () => clearTimeout(timeoutId);
    }, [search, minCharacters]);

        /**
     * Fetches recipe details by ID.
     * @param {string} recipeId - The ID of the recipe to fetch.
     */

    const fetchRecipeDetails = async (recipeId) => {
        try {
            const response = await fetch(`/api/AutoSuggest?search=${encodeURIComponent(query)}&limit=10`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch suggestions');
            }

            const data = await response.json();
            setSuggestions(data.suggestions);
            setShowSuggestions(true);
            if (data.message && data.suggestions.length === 0) {
                setError(data.message);
            } else {
                setError(null);
            }
        } catch (err) {
            setError(err.message);
            setSuggestions([]);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Handles the search form submission.
     * @param {Event} e - The form submit event.
     */


    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (search.trim()) {
            setShowSuggestions(false);
            setSelectedRecipe(null);

            router.push(`/?search=${encodeURIComponent(search.trim())}`);
            if (onSearch) {
                onSearch(search);
            }
        }
    };

        /**
     * Handles the click event on a suggestion item.
     * @param {Object} suggestion - The suggestion item.
     */

    const handleSuggestionClick = (suggestion) => {
        setSearch(suggestion.title);
        setShowSuggestions(false);
        if (onSearch) {
            onSearch(suggestion.title);
        }
    };

    /**
     * Clears the current search input.
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

    return (
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <form onSubmit={handleSearchSubmit} className="relative">
                <div className="relative flex items-center">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                        onFocus={() => {
                            if (search.length >= minCharacters) {
                                setShowSuggestions(true);
                            }
                        }}
                        placeholder="Search for recipes by name, ingredient, or cuisine..."
                        className="w-full p-4 pr-20 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-lg"
                        aria-label="Search recipes"
                    />
                    <div className="absolute right-0 flex items-center space-x-1 mr-2">
                        {search && (
                            <button
                                type="button"
                                onClick={clearSearch}
                                className="p-2 text-gray-400 hover:text-gray-600"
                                aria-label="Clear search"
                            >
                                <XCircle className="h-5 w-5" />
                            </button>
                        )}
                        <button 
                            type="submit" 
                            className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-colors"
                            aria-label="Search"
                        >
                            <FaSearch className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {showSuggestions && (
                    <div 
                        className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg border"
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        {loading ? (
                            <div className="p-4 text-gray-600 flex items-center justify-center">
                                <Coffee className="animate-spin mr-2" />
                                <span>Finding recipes...</span>
                            </div>
                        ) : suggestions.length > 0 ? (
                            <ul className="divide-y divide-gray-100">
                                {suggestions.map((suggestion, index) => (
                                    <li 
                                        key={suggestion.id || index}
                                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                                        onClick={() => handleSuggestionClick(suggestion)}
                                    >
                                        <div className="p-4">
                                            <div className="flex items-center mb-1">
                                                <Utensils className="h-4 w-4 text-green-600 mr-2" />
                                                <span className="font-medium">
                                                    <HighlightedText 
                                                        text={suggestion.title}
                                                        highlights={suggestion.highlights}
                                                    />
                                                </span>
                                            </div>
                                            {suggestion.description && (
                                                <div className="text-sm text-gray-600 ml-6">
                                                    {suggestion.description}
                                                </div>
                                            )}
                                            {suggestion.cookTime && (
                                                <div className="flex items-center text-sm text-gray-500 mt-1 ml-6">
                                                    <Timer className="h-4 w-4 mr-1" />
                                                    <span>{suggestion.cookTime} mins</span>
                                                </div>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : search.length >= minCharacters && error ? (
                            <div className="p-4 text-gray-600 text-center">
                                {error}
                            </div>
                        ) : null}
                    </div>
                )}
            </form>
        </div>
    );
};
};

export default RecipeSearchBar;
