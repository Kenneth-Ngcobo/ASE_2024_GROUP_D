"use client"; // Ensure this component is rendered on the client side

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TagDisplay from "./TagList"; // Ensure this points to TagDisplay
import { fetchRecipes } from "../api"; // Import your fetchRecipes function

export const FilterModal = ({ onClose }) => {
    const [cookTime, setCookTime] = useState(0);
    const [selectedTags, setSelectedTags] = useState([]); // State to manage selected tags
    const [search, setSearch] = useState(""); // State to manage search query
    const searchParams = useSearchParams();
    const router = useRouter();

    const getRangeLabel = (value) => {
        if (value === 0) return "All";
        if (value <= 15) return "5-15 min";
        if (value <= 30) return "15-30 min";
        if (value <= 45) return "30-45 min";
        return "45-60 min";
    };

    const snapToNearest = (value) => {
        if (value < 5) return 0;
        if (value <= 15) return 15;
        if (value <= 30) return 30;
        if (value <= 45) return 45;
        return 60;
    };

    const handleSliderChange = (setValue) => (e) => {
        const value = Number(e.target.value);
        setValue(snapToNearest(value));
    };






    const handleSubmit = async () => {



        const queryTags = selectedTags.join(","); // Join tags for the query string

        
        console.log("Query Tags:", queryTags);



        const currentQuery = Object.fromEntries(searchParams.entries());


        // Fetch recipes with the selected tags
        const newQuery = {
            ...currentQuery,
            page: 1,
            tags: selectedTags
        }
        const currentQueryString = new URLSearchParams(newQuery).toString();
        // try {
        //     const recipes = await fetchRecipes(20, 1, queryTags); // Assuming you want to fetch with a limit of 20
        //     console.log("Fetched Recipes:", recipes); // Log or set the recipes in state
        // } catch (error) {
        //     console.error("Error fetching recipes:", error);
        // }
        router.push(`?${currentQueryString}`);
        onClose(); // Close the modal after fetching
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white w-[60%] p-6 rounded-lg shadow-lg">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-800">Filter</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                        &times;
                    </button>
                </div>

                {/* Filter Fields */}
                <div className="space-y-4 mb-4">
                    {/* Tag Selection */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">Ingredients</label>
                        <TagDisplay onTagsChange={handleTagsChange} /> {/* Pass the function */}
                    </div>

                    {/* Time Slider */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">Time for meal</label>
                        <input
                            type="range"
                            min="0"
                            max="60"
                            value={cookTime}
                            onChange={handleSliderChange(setCookTime)}
                            className="mt-2"
                            step="5"
                        />
                        <div className="flex justify-between text-xs text-gray-600">
                            <span>{getRangeLabel(cookTime)}</span>
                            <span>60</span>
                        </div>
                    </div>
                </div>

                {/* Clear All Filters */}
                <div
                    onClick={() => {
                        setCookTime(0);
                        setSelectedTags([]); // Clear selected tags
                    }}
                    className="text-red-600 text-sm cursor-pointer mb-4 hover:underline"
                >
                    Clear All Filters
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit} // Call handleSubmit on apply
                        className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
};

export const FilterButton = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="flex items-center px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-md shadow hover:bg-gray-100"
        >
            <span className="material-icons mr-2">filter_list</span>
            Filter
        </button>
    );
};

// Parent Component
const ParentComponent = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const toggleFilterModal = () => {
        setIsFilterOpen((prev) => !prev); // Toggle modal open/close state
    };

    return (
        <div>
            <FilterButton onClick={toggleFilterModal} />
            {isFilterOpen && <FilterModal onClose={toggleFilterModal} />}
        </div>
    );
};

export default ParentComponent;
