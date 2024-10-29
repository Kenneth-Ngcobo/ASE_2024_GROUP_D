"use client"

import { useState, useEffect, useMemo } from 'react'
import { FaSearch } from 'react-icons/fa'
import { XCircle } from 'lucide-react'

export default function SearchBar({
    currentSearch = '',
    onSearch,
    recipes = [], 
    minCharacters = 2 
}) {
    const [search, setSearch] = useState(currentSearch)
    const [showSuggestions, setShowSuggestions] = useState(false)

    useEffect(() => {
        setSearch(currentSearch)
    }, [currentSearch])

    const suggestions = useMemo(() => {
        if (search.length < minCharacters) return []
        
        return recipes
            .filter(recipe => {
                const searchLower = search.toLowerCase()
                const titleLower = recipe.title.toLowerCase()
                
                return titleLower.includes(searchLower) ||
                    
                    searchLower.split(' ').some(term => 
                        term.length > 1 && titleLower.includes(term)
                    )
            })
            .slice(0, 5) 
    }, [search, recipes, minCharacters])

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        setShowSuggestions(false)
        onSearch(search)
    }

    const handleSuggestionClick = (suggestion) => {
        setSearch(suggestion.title)
        setShowSuggestions(false)
        onSearch(suggestion.title)
    }

    const clearSearch = () => {
        setSearch('')
        setShowSuggestions(false)
        onSearch('')
    }

    return (
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <form onSubmit={handleSearchSubmit} className="relative">
                <div className="relative flex items-center">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value)
                            setShowSuggestions(true)
                        }}
                        onFocus={() => setShowSuggestions(true)}
                        placeholder="Search recipes..."
                        className="w-full p-2 pr-20 border rounded focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    />
                    <div className="absolute right-0 flex items-center space-x-1 mr-2">
                        {search && (
                            <button
                                type="button"
                                onClick={clearSearch}
                                className="p-2 text-gray-400 hover:text-gray-600"
                            >
                                <XCircle className="h-5 w-5" />
                            </button>
                        )}
                        <button 
                            type="submit" 
                            className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition-colors"
                        >
                            <FaSearch className="inline-block" />
                        </button>
                    </div>
                </div>

                {/* Suggestions dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                    <div 
                        className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border"
                        onMouseDown={(e) => e.preventDefault()} 
                    >
                        <ul>
                            {suggestions.map((suggestion, index) => (
                                <li 
                                    key={index}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                >
                                    <div className="font-medium">{suggestion.title}</div>
                                    {suggestion.description && (
                                        <div className="text-sm text-gray-600 truncate">
                                            {suggestion.description}
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </form>
        </div>
    )
}
