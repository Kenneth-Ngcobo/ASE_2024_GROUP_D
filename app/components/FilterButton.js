"use client"; // Ensure this component is rendered on the client side

import { useState } from "react";
import CategoryList from "./CategoryList";
import TagList from "./TagList";

export const FilterModal = ({ onClose }) => {
  const [customerName, setCustomerName] = useState("");
  const [brandValue, setBrandValue] = useState(0);
  const [colorValue, setColorValue] = useState(0);
  const [status, setStatus] = useState("Onhold");

  // Function to determine range labels based on value
  const getRangeLabel = (value) => {
    if (value === 0) return "All"; // Return "All" if value is 0
    if (value === 5) return "5-15 min";
    if (value <= 15) return "5-15 min";
    if (value <= 30) return "15-30 min";
    if (value <= 45) return "30-45 min";
    return "45-60 min";
  };

  // Function to snap the value to the nearest range
  const snapToNearest = (value) => {
    if (value < 5) return 0; // Return 0 if value is less than 5
    if (value <= 15) return 15;
    if (value <= 30) return 30;
    if (value <= 45) return 45;
    return 60;
  };

  // Function to handle slider changes
  const handleSliderChange = (setValue) => (e) => {
    const value = Number(e.target.value);
    setValue(snapToNearest(value)); // Snap to nearest and update state
  };

  return (



    /* 
    mains/page
    categories

    advansed search function
    user clicks on search to seach for tags/ ingredients, using search will show categories, when clicked send to search box, 

    timing bar


    
    build string apply quary to url with filters
    
    
    
    */




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
          {/* Customer Name Text Input */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Ingredients</label>
            <TagList />
          </div>

          {/* Brand Slider */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Time for meal</label>
            <input
              type="range"
              min="0"
              max="60"
              value={brandValue} // Display actual brandValue
              onChange={handleSliderChange(setBrandValue)}
              className="mt-2"
              step="5" // Set step to snap to the nearest 5
            />
            <div className="flex justify-between text-xs text-gray-600">
              <span>{getRangeLabel(brandValue)} </span>
              <span>60</span>
            </div>
          </div>

          {/* Color Slider */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Color Preference</label>
            <input
              type="range"
              min="0"
              max="60"
              value={colorValue} // Display actual colorValue
              onChange={handleSliderChange(setColorValue)}
              className="mt-2"
              step="5" // Set step to snap to the nearest 5
            />
            <div className="flex justify-between text-xs text-gray-600">
              <span>{getRangeLabel(colorValue)}</span>
              <span>60</span>
            </div>
          </div>

          {/* Status Dropdown */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-gray-300 rounded-md p-2 text-gray-800"
            >
              <option value="Onhold">Onhold</option>
              <option value="Issued">Issued</option>
              <option value="Expired">Expired</option>
            </select>
          </div>
        </div>

        {/* Clear All Filters */}
        <div
          onClick={() => {
            setCustomerName("");
            setBrandValue(0);
            setColorValue(0);
            setStatus("Onhold");
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
            onClick={() => {
              console.log("Brand Value:", brandValue); // Log brandValue when Apply is clicked
              onClose();
              // Add apply filter logic here if needed
            }}
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