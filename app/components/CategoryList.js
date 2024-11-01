'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const CategoryList = ({ onCategoryChange }) => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);

  const router = useRouter();
  const searchParams = useSearchParams();

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
    setIsOpen(true); 
  };

  // Handle category select
  const handleCategorySelect = async (category) => {
    setIsOpen(false);

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

  if (loading) {
    return <div>Loading categories...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="relative" >
      <h2 className="text-xl font-semibold mb-4">Categories</h2>

      {/* Search form */}
     
      <form onSubmit={handleSearch} className="">
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

            {/* Toggle button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-green-600 text-white px-4 py-2 mx-2 rounded hover:bg-green-500 transition duration-200"
      >
        {isOpen ? 'Close' : 'Select Category'}
      </button>
      </form>
    
      

  

      {/* Dropdown with filtered categories */}
      {isOpen && filteredCategories.length > 0 && (
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
              onClick={() => handleCategorySelect(category)}
              className="p-2 bg-gray-200 border-b hover:bg-gray-300 transition duration-200 cursor-pointer"
            >
              {category}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryList;
