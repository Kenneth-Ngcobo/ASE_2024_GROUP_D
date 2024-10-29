"use client";
import React, { useState, useEffect, useCallback } from 'react';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    // Custom debounce function
    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func(...args), delay);
        };
    };

    // Function to fetch suggestions from the API
    const fetchSuggestions = async (searchTerm) => {
        if (!searchTerm) {
            setSuggestions([]);
            return;
        }

        try {
            const response = await fetch(`/api/AutoSuggest?query=${searchTerm}`);
            if (response.ok) {
                const data = await response.json();
                setSuggestions(data);
            }
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };

    // Debounced version of fetchSuggestions
    const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 300), []);

    // Update query and trigger debounced API call
    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        debouncedFetchSuggestions(value);
    };

    return (
        <div className="relative w-full max-w-md mx-auto">
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search for recipes..."
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {suggestions.length > 0 && (
                <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    {suggestions.map((item, index) => (
                        <li
                            key={index}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => setQuery(item.title)} // To set the clicked suggestion in the input
                        >
                            {item.title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
