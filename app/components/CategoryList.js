'use client'; 

import React, { useEffect, useState } from 'react';

const CategoryList = ({ onCategoryChange }) => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/recipes/categories'); 
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                setCategories(data); 
                console.log('Fetched categories:', data)
            } catch (err) {
                setError(err.message);
            } finally {
        setLoading(false);
      }
    };
        fetchCategories();
    }, []);

    if (loading) {
        return <div>Loading categories...</div>;
      }
    
      if (error) {
        return <div>Error: {error}</div>;
      }

    const handleCategorySelect = (category) => {
        setIsOpen(false); 
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Categories</h2>
            <button
                onClick={() => setIsOpen((prev) => !prev)} 
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 transition duration-200"
            >
                Select Category
            </button>
            {isOpen && ( 
                <div className="mt-2">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {categories.map((category, index) => (
                            <button
                                key={index}
                                className="p-2 bg-gray-200 border border-gray-300 rounded hover:bg-gray-300 transition duration-200"
                                onClick={() => handleCategorySelect(category)} 
                            >
                                {category} 
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryList;
