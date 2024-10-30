'use client';

import React, { useEffect, useState } from 'react';

export default function TagDisplay() {
    const [tags, setTags] = useState([]);
    const [filteredTags, setFilteredTags] = useState([]); // For search functionality
    const [selectedTags, setSelectedTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState(''); // Search term for filtering

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await fetch('/api/recipes/tags');
                if (!response.ok) {
                    throw new Error('Failed to fetch tags');
                }
                const data = await response.json();
                setTags(data);
                setFilteredTags(data); // Initialize filtered tags
                console.log('Fetched tags:', data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTags();
    }, []);

    const handleTagSelect = (tag) => {
        if (!selectedTags.includes(tag)) {
            setSelectedTags([...selectedTags, tag]);
        }
        setIsOpen(false);
        setSearch(''); // Reset search field
        setFilteredTags(tags); // Show all tags again
    };

    const handleTagRemove = (tag) => {
        setSelectedTags(selectedTags.filter((item) => item !== tag));
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        const filtered = tags.filter((tag) =>
            tag.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredTags(filtered);
    };

    if (loading) {
        return <div>Loading tags...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Tags</h2>

            <div className="flex flex-col space-y-2 mb-4">
                {/* Selected Tags Display */}
                <div className="flex flex-wrap gap-2">
                    {selectedTags.map((tag, index) => (
                        <div key={index} className="flex items-center px-3 py-1 bg-blue-200 text-blue-800 rounded-md">
                            {tag}
                            <button
                                onClick={() => handleTagRemove(tag)}
                                className="ml-2 text-blue-800 hover:text-blue-500"
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                </div>

                {/* Dropdown Button and Search Input */}
                <button
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 transition duration-200"
                >
                    Select Tag
                </button>
                {isOpen && (
                    <div className="mt-2">
                        <input
                            type="text"
                            value={search}
                            onChange={handleSearch}
                            placeholder="Search tags..."
                            className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                        />
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-h-60 overflow-y-auto">
                            {filteredTags.map((tag, index) => (
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
        </div>
    );
}
