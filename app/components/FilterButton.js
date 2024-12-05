"use client"; // Ensure this component is rendered on the client side
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TagDisplay from "./TagList"; // Correctly imported TagDisplay
import { fetchRecipes } from "../api"; // Import your fetchRecipes function
import IngDisplay from "./IngredientList";
import StepsDropdown from "./StepsDropdown"; // Import StepsDropdown

export const FilterModal = ({ onClose }) => {
    const [cookTime, setCookTime] = useState(0);
    const [selectedTags, setSelectedTags] = useState([]); // State to store selected tags
    const [selectedIngs, setSelectedIngs] = useState([]); // State to store selected ingredients
    const [steps, setSteps] = useState(0); // State for steps
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

    const handleSliderChange = (e) => {
        const value = snapToNearest(Number(e.target.value));
        setCookTime(value);
    };
    

    const handleStepsChange = (steps) => {
        setSteps(steps);
    };

    const handleTagsChange = (tags) => {
        console.log("Handling tags change:", tags); // Log the selected tags
        if (JSON.stringify(tags) !== JSON.stringify(selectedTags)) {
            setSelectedTags(tags);
         }
    };

    const handleIngsChange = (ing) => {
        console.log("Handling ingredients change:", ing); // Log the selected ingredients
        if (JSON.stringify(ing) !== JSON.stringify(selectedIngs)) {
            setSelectedIngs(ing);
        }
    };

    const handleSubmit = async () => {
        const currentQuery = Object.fromEntries(searchParams.entries());
        const stepsValue = steps === 0 ? "" : steps;
    
        const newQuery = {
            ...currentQuery,
            page: 1,
            tags: selectedTags.join(","),
            ingredients: selectedIngs.join(","),
            instructions: stepsValue,
        };
    
        const queryString = new URLSearchParams(newQuery).toString();
        if (window.location.search !== `?${queryString}`) {
            router.replace(`?${queryString}`, undefined, { shallow: true });
            onClose();
        }
    };
    

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 lg:w-[50%].">
            <div className="bg-white dark:bg-black w-[60%] p-6 rounded-lg shadow-lg">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-white">Filter</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 dark:text-white hover:text-gray-700 dark:hover:text-green-500 text-xl"
                    >
                        &times;
                    </button>
                </div>

                {/* Filter Fields */}
                <div className="space-y-4 mb-4">
                    {/* Tag Selection */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">Ingredients</label>
                        <TagDisplay selectedTags={selectedTags} onTagsChange={handleTagsChange} /> {/* Pass selected tags and function */}
                        <IngDisplay selectedIngs={selectedIngs} onIngsChange={handleIngsChange} />
                        <StepsDropdown selectedSteps={steps} onStepsChange={handleStepsChange} />
                    </div>
                </div>

                {/* Clear All Filters */}
                <div
                    onClick={() => {
                        setCookTime(0);
                        setSelectedTags([]);// Clear selected tags
                        setSelectedIngs([]); // Clear selected ingredients  
                        setSteps(0); // Clear selected steps
                    }}
                         
                    className="text-red-600 text-sm cursor-pointer mb-4 hover:underline"
                >
                    Clear All Filters
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-white bg-red-600 border rounded-md hover:bg-gray-100"
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
            className="block text-[#020123] hover:text-[#fc9d4f] font-medium uppercase py-2"
        >
            <span className="material-icons mr-2"></span>
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
        <div className="fixed inset-0 bg-black bg-opacity-50"
         onClick={onClose}
         >  

         <div className="modal-content"
         onClick={(e) => e.stopPropagation()} 
         
         >

             <FilterButton onClick={toggleFilterModal} />
            {isFilterOpen && <FilterModal onClose={toggleFilterModal} />}
         </div>
            
        </div>


    );
};

export default ParentComponent;
