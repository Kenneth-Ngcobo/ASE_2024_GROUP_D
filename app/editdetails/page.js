"use client";

import { useState } from "react";

const EditDetails = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("User details updated", userDetails);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit User Details</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={userDetails.name}
            onChange={handleChange}
            className="mt-1 block w-60 border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring focus:ring-green-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userDetails.email}
            onChange={handleChange}
            className="mt-1 block w-60 border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring focus:ring-green-500"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditDetails;
