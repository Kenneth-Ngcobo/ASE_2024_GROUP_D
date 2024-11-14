"use client"


import { useState, useEffect } from 'react';
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
            {parts.map((part, i) => (
                regex.test(part) ? (
                    <span key={i} className="bg-teal-100 text-teal-800 font-medium">{part}</span>
                ) : (
                    <span key={i}>{part}</span>
                )
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
    minCharacters = 2
}) => {
    const [search, setSearch] = useState(currentSearch);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [recentSearches, setRecentSearches] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const router = useRouter();
  

    useEffect(() => {
        setSearch(currentSearch);
    }, [currentSearch]);

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
                    limit: '10',
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
            const response = await fetch(`/api/recipes/${recipeId}`);
            if (!response.ok) throw new Error('Failed to fetch recipe details');
            
            const data = await response.json();
            setSelectedRecipe(data.recipe);
        } catch (error) {
            console.error('Error fetching recipe details:', error);
        }
    };

    /**
     * Handles the search form submission.
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
     * Handles the click event on a suggestion item.
     * @param {Object} suggestion - The suggestion item.
     */

    const handleSuggestionClick = (suggestion) => {
        setSearch(suggestion.title);
        saveRecentSearch(suggestion.title);
        setShowSuggestions(false);
        setSelectedRecipe(null);
        fetchRecipeDetails(suggestion._id); // Fetch and set the selected recipe details
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

    const searchTerms = getSearchTerms(search);

    return (
        <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative">
                <div className="relative flex items-center">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-500"> 
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
                        className="w-full pl-12 pr-12 py-4 bg-white border-2 border-gray-100 rounded-xl focus:outline-none focus:border-teal-500 focus:ring-0 text-gray-700 placeholder-gray-400 transition-all duration-200"
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
                       {/* <button 
                            type="submit" 
                            className=" text-gray-400 p-3 "
                            aria-label="Search"
                        >
                        </button>*/}
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
                                <span className="font-medium" >Finding recipes...</span>
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


