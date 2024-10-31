'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

/**
 * CategoryList component fetches and displays a list of categories.
 * 
 * @component
 * @param {Object} props - The properties object.
 * @param {string} props.searchTerm - The term used to filter categories.
 * @returns {JSX.Element} The rendered CategoryList component.
 */
const CategoryList = ({ searchTerm }) => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const router = useRouter();
  const searchParams = useSearchParams();

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
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const matches = categories.filter(category =>
        category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCategories(matches);
      setIsOpen(true);
    } else {
      setFilteredCategories(categories);
    }
  }, [searchTerm, categories]);

  /**
   * Handles category selection and updates the query parameters.
   * 
   * @param {string} category - The selected category.
   */
  const handleCategorySelect = (category) => {
    setIsOpen(false);

    const currentQuery = Object.fromEntries(searchParams.entries());

    const newQuery = {
      ...currentQuery,
      category: category,
    };

    const queryString = new URLSearchParams(newQuery).toString();

    router.push(`?${queryString}`);
  };

  /**
   * Handles search input change and filters categories dynamically.
   * 
   * @param {Event} e - The input change event.
   */
  const handleSearchChange = (e) => {
    const input = e.target.value;
    setSearchInput(input);

    if (input) {
      const matches = categories.filter(category =>
        category.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredCategories(matches);
      setIsOpen(true);
    } else {
      setFilteredCategories(categories);
      setIsOpen(false);
    }
  };

  if (loading) {
    return <div>Loading categories...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="relative">
      <h2 className="text-xl font-semibold mb-4">Categories</h2>

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-green-600 text-white px-4 py-2 mx-2 rounded hover:bg-green-500 transition duration-200"
      >
        {isOpen ? 'Close' : 'Select Category'}
      </button>

      {isOpen && (
        <div className="mt-2 mb-4">
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchChange}
            className="border px-4 py-2 mr-2 rounded"
            placeholder="Search categories"
          />
        </div>
      )}

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

