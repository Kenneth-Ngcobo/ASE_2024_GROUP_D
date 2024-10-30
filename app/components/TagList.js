'use client'; 
import React, { useEffect, useState } from 'react';

export default function TagDisplay() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false); 

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch('/api/recipes/tags'); 
        if (!response.ok) {
          throw new Error('Failed to fetch tags');
        }
        const data = await response.json();
        setTags(data);

        console.log('Fetched tags:', data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  if (loading) {
    return <div>Loading tags...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleTagSelect = (tag) => {
    console.log("Selected tag:", tag);

    setIsOpen(false);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Tags</h2>
      <button
        onClick={() => setIsOpen((prev) => !prev)} 
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 transition duration-200"
      >
        Select Tag
      </button>
      {isOpen && ( 
        <div className="mt-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {tags.map((tag, index) => (
              <button
                key={index}
                className="p-2 bg-gray-200 border border-gray-300 rounded hover:bg-gray-300 transition duration-200"
                onClick={() => handleTagSelect(tag)} 
              >
                {tag} 
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
