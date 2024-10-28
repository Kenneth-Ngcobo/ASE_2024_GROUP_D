import { useState } from "react";

export const FilterModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
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
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Al</label>
            <select className="border border-gray-300 rounded-md p-2 text-gray-800">
              <option>Customer Name</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Cat</label>
            <select className="border border-gray-300 rounded-md p-2 text-gray-800">
              <option>Choose the desired brand</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Color</label>
            <select className="border border-gray-300 rounded-md p-2 text-gray-800">
              <option>Choose the desired color</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Status</label>
            <select className="border border-gray-300 rounded-md p-2 text-gray-800">
              <option>Onhold/Issued/Expired</option>
            </select>
          </div>
          <div className="flex flex-col col-span-2">
            <label className="text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              className="border border-gray-300 rounded-md p-2 text-gray-800"
            />
          </div>
        </div>

        {/* Clear All Filters */}
        <div className="text-red-600 text-sm cursor-pointer mb-4 hover:underline">
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
          <button className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
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
