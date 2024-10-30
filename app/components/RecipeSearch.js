import React, { useState, useEffect, useCallback } from 'react';
import { SearchBar } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { debounce } from 'lodash';

const API_ENDPOINT = '/api/recipes/search';
const RECIPE_DETAIL_ENDPOINT = '/api/recipes';

const RecipeSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Fetch suggestions from the API
  const fetchSuggestions = async (query) => {
    if (query.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_ENDPOINT}?q=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch suggestions');
      }

      const data = await response.json();
      setSuggestions(data);
      setShowSuggestions(true);
    } catch (err) {
      setError(err.message);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch full recipe details
  const fetchRecipeDetails = async (recipeId) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${RECIPE_DETAIL_ENDPOINT}/${recipeId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch recipe details');
      }

      const data = await response.json();
      setSelectedRecipe(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Create a debounced version of fetchSuggestions
  const debouncedFetch = useCallback(
    debounce((query) => {
      fetchSuggestions(query);
    }, 300),
    []
  );

  // Clean up the debounced function on component unmount
  useEffect(() => {
    return () => {
      debouncedFetch.cancel();
    };
  }, [debouncedFetch]);

  // Handle input changes
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSelectedRecipe(null);
    debouncedFetch(value);
  };

  // Handle suggestion click
  const handleSuggestionClick = async (recipe) => {
    setSearchTerm(recipe.title);
    setShowSuggestions(false);
    await fetchRecipeDetails(recipe.id);
  };

  // Handle input focus
  const handleInputFocus = () => {
    if (searchTerm.length >= 3) {
      setShowSuggestions(true);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto relative">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder="Search recipes..."
          className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Search recipes"
          role="searchbox"
        /> 
        <SearchBar 
          className={`absolute left-3 top-3 text-gray-400 ${isLoading ? 'animate-spin' : ''}`} 
          size={20} 
        />
      </div>

      {error && (
        <Card className="absolute w-full mt-2 shadow-lg z-10">
          <Alert className="m-2" variant="destructive">
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
        </Card>
      )}

      {showSuggestions && !error && suggestions.length > 0 && (
        <Card className="absolute w-full mt-2 shadow-lg z-10">
          <ul className="py-2" role="listbox">
            {suggestions.map((recipe) => (
              <li
                key={recipe.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                role="option"
                onClick={() => handleSuggestionClick(recipe)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleSuggestionClick(recipe);
                  }
                }}
                tabIndex={0}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{recipe.title}</div>
                    <div className="text-sm text-gray-500">{recipe.cuisine}</div>
                  </div>
                  <div className="text-sm text-gray-500">{recipe.time}</div>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {showSuggestions && !error && suggestions.length === 0 && !isLoading && (
        <Card className="absolute w-full mt-2 shadow-lg z-10">
          <Alert className="m-2" variant="default">
            <AlertDescription>
              No recipes found matching "{searchTerm}". Try:
              <ul className="list-disc ml-6 mt-2">
                <li>Checking for typos</li>
                <li>Using more general terms</li>
                <li>Searching by cuisine type (e.g., "Italian", "Thai")</li>
              </ul>
            </AlertDescription>
          </Alert>
        </Card>
      )}

      {selectedRecipe && (
        <Card className="mt-4 p-4">
          <h2 className="text-xl font-semibold mb-2">{selectedRecipe.title}</h2>
          <div className="flex gap-4 text-sm text-gray-500 mb-4">
            <span>{selectedRecipe.cuisine}</span>
            <span>{selectedRecipe.time}</span>
          </div>
          {/* Add more recipe details here as needed */}
        </Card>
      )}
    </div>
  );
};

export default RecipeSearch;