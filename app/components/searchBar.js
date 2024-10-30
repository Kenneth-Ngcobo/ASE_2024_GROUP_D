/* eslint-disable react/no-unescaped-entities */
"use client"


import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { XCircle, Timer, Coffee, Utensils } from 'lucide-react';

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
                    <span key={i} className="bg-yellow-200 font-medium">{part}</span>
                ) : (
                    <span key={i}>{part}</span>
                )
            ))}
        </span>
    );
};

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
    const [selectedRecipe, setSelectedRecipe] = useState(null); // New state for selected recipe

    useEffect(() => {
        const savedSearches = localStorage.getItem('recentRecipeSearches');
        if (savedSearches) {
            setRecentSearches(JSON.parse(savedSearches));
        }
    }, []);

    useEffect(() => {
        setSearch(currentSearch);
    }, [currentSearch]);

    const getSearchTerms = (searchText) => {
        return searchText
            .toLowerCase()
            .split(' ')
            .filter(term => term.length >= minCharacters);
    };

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

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (search.trim()) {
            saveRecentSearch(search.trim());
            setShowSuggestions(false);
            setSelectedRecipe(null);
            if (onSearch) {
                onSearch(search);
            }
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearch(suggestion.title);
        saveRecentSearch(suggestion.title);
        setShowSuggestions(false);
        setSelectedRecipe(null);
        fetchRecipeDetails(suggestion._id); // Fetch and set the selected recipe details
    };

    const clearSearch = () => {
        setSearch('');
        setShowSuggestions(false);
        setSuggestions([]);
        setSelectedRecipe(null); // Clear selected recipe details
        if (onSearch) {
            onSearch('');
        }
    };

    const searchTerms = getSearchTerms(search);

    return (
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <form onSubmit={handleSearchSubmit} className="relative">
                <div className="relative flex items-center">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setShowSuggestions(true);
                        }}
                        onFocus={() => setShowSuggestions(true)}
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
                                        key={suggestion._id || index}
                                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                                        onClick={() => handleSuggestionClick(suggestion)}
                                    >
                                        <div className="p-4">
                                            <div className="flex items-center mb-1">
                                                <Utensils className="h-4 w-4 text-green-600 mr-2" />
                                                <span className="font-medium">
                                                    <HighlightedText 
                                                        text={suggestion.title}
                                                        searchTerms={searchTerms}
                                                    />
                                                </span>
                                            </div>
                                            {suggestion.description && (
                                                <div className="text-sm text-gray-600 ml-6">
                                                    <HighlightedText 
                                                        text={suggestion.description}
                                                        searchTerms={searchTerms}
                                                    />
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
                        ) : search.length >= minCharacters ? (
                            <div className="p-4 text-gray-600 text-center">
                                No recipes found matching &qout{search}&qout
                            </div>
                        ) : recentSearches.length > 0 ? (
                            <div className="p-4">
                                <h3 className="text-sm font-medium text-gray-500 mb-2">Recent Searches</h3>
                                <ul className="space-y-2">
                                    {recentSearches.map((term, index) => (
                                        <li 
                                            key={index}
                                            className="cursor-pointer text-gray-600 hover:text-green-600 flex items-center"
                                            onClick={() => {
                                                setSearch(term);
                                                setShowSuggestions(false);
                                                if (onSearch) onSearch(term);
                                            }}
                                        >
                                            <FaSearch className="h-3 w-3 mr-2" />
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
                <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-2">{selectedRecipe.title}</h2>
                    <p className="text-gray-600 mb-4">{selectedRecipe.description}</p>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                        <Timer className="h-4 w-4 mr-1" />
                        <span>{selectedRecipe.cookTime} mins</span>
                    </div>
                    {/* Add more recipe details as needed */}
                </div>
            )}
        </div>
    );
};

export default RecipeSearchBar;


