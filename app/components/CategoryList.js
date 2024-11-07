'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const CategoryList = ({ onCategoryChange, totalRecipes }) => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // State to control the visibility of the search and category list
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [totalRecipesState, setTotalRecipes] = useState(0);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    console.log('Total recipes:', totalRecipes);
    setTotalRecipes(totalRecipes);
  }, [totalRecipes]);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/recipes/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
        setFilteredCategories(data);
        console.log('Fetched categories:', data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Handle search submit or input change
  const handleSearch = (event) => {
    event.preventDefault();

    if (!searchTerm) {
      setFilteredCategories(categories); // Reset to all categories if search is empty
      return;
    }

    // Filter categories based on search term
    const matches = categories.filter(category =>
      category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredCategories(matches);
  };

  // Handle category select
  const handleCategorySelect = async (category) => {
    setIsOpen(false); // Close the dropdown after selecting a category

    // Get current query parameters
    const currentQuery = Object.fromEntries(searchParams.entries());

    // Update the query with the selected category
    const newQuery = {
      ...currentQuery,
      page: 1,
      category: category,
    };

    // Construct the new query string
    const queryString = new URLSearchParams(newQuery).toString();

    // Push the new URL with updated query
    router.push(`?${queryString}`);
  };

  const clearCategory = () => {
    const currentQuery = Object.fromEntries(searchParams.entries());

    // Remove the 'category' key from the query object
    const { category, ...updatedQuery } = currentQuery;

    // Construct the new query string without 'category'
    const queryString = new URLSearchParams(updatedQuery).toString();

    // Push the updated URL without the 'category' parameter
    router.push(`?${queryString}`);
  };

  if (loading) {
    return <div>Loading categories...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="relative">
       
      {/* Toggle button to open/close the search and category dropdown */}
      <button
        onClick={() => setIsOpen((prev) => !prev)} // Toggle isOpen state
        className="text-gray-600 hover:text-teal-500 font-medium uppercase text-sm"
      >
        {isOpen ? 'Close' : 'Category'} {/* Display appropriate label based on isOpen */}
      </button>

      {/* Conditionally render content when isOpen is true */}
      {isOpen && (
        <div className="mt-4">
          {/* Search form to filter categories */}
          <form onSubmit={handleSearch} className="mb-4">
            <input
              type="text"
              placeholder="Search categories"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border px-4 py-2 mb-4 w-30 mx-2"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 mx-2 rounded hover:bg-blue-400 transition duration-200"
            >
              Search
            </button>
            <button onClick={() => clearCategory()}   type="button"
              className="bg-red-500 text-white px-4 py-2 mx-2 rounded hover:bg-red-400 transition duration-200">
              Clear category
            </button>
         
          </form>

          {/* Dropdown with filtered categories */}
          {filteredCategories.length > 0 ? (
            <ul
              style={{
                position: 'relative',
                top: '100%',
                left: 0,
                width: '100%',
                background: 'white',
                border: '1px solid #ccc',
                listStyleType: 'none',
                padding: 0,
                margin: 0,
                maxHeight: '200px',
                overflowY: 'auto',
              }}
            >
              {filteredCategories.map((category, index) => (
                <li
                  key={index}
                  onClick={() => handleCategorySelect(category)} // Trigger category selection
                  className="p-2 bg-gray-200 border-b hover:bg-gray-300 transition duration-200 cursor-pointer"
                >
                  {category}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No categories found</p> // Message when no categories match search
          )}
        </div>
      )}
           <p className="font-semibold text-lg mb-2 px-4">
      {totalRecipesState > 0 ? `Total Recipes Found: ${totalRecipesState}` : ''}
    </p>
    </div>
  );
};

export default CategoryList;

