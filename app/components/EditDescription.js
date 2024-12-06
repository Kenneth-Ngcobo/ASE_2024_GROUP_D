"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../components/loadingSpinner";

export default function EditDescription({ recipe }) {
  const [description, setDescription] = useState(recipe.description);
  const [lastEditedBy, setLastEditedBy] = useState(
    recipe.lastEditedBy || "Not set"
  );
  const [lastEditedAt, setLastEditedAt] = useState(
    recipe.lastEditedAt || "Not set"
  );
  const [isSaving, setIsSaving] = useState(false); // Initialize the isSaving state
  const [error, setError] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // For storing logged in user
  const router = useRouter();

  // Ensure that localStorage is accessed on the client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
      if (loggedInUserEmail) {
        setCurrentUser(loggedInUserEmail);
      }
    }
  }, []);

  // Handle description change
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // Handle save
  const handleSave = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      setError("User not logged in");
      return;
    }

    setIsSaving(true); // Set saving state to true before the API call
    try {
      const response = await fetch(`/api/recipe/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipeId: recipe._id, 
          description,
          editedBy: currentUser, 
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update recipe description");
      }

      const updatedData = await response.json();

      // Update UI with success message and new details
      setLastEditedBy(currentUser);
      setLastEditedAt(new Date().toLocaleString());
      setShowSuccessMessage(true);
    } catch (error) {
      setError(error.message || "Error saving the description");
    } finally {
      setIsSaving(false); // Set saving state to false once done
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Edit Recipe Description</h3>
      {showSuccessMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <p className="text-green-700 font-medium">
            Recipe description updated successfully!
          </p>
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-700 font-medium">{error}</p>
        </div>
      )}
      {isSaving ? (
        <div className="flex justify-center items-center w-full h-[200px]">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-8">
          <form onSubmit={handleSave}>
            <div className="space-y-2">
              <textarea
                value={description}
                onChange={handleDescriptionChange}
                className="w-full h-40 px-4 py-3 border rounded-lg shadow-sm"
                placeholder="Edit recipe description"
              />
            </div>

            <div className="mt-4 flex space-x-4">
              <button
                type="submit"
                className="bg-[#fc9d4f] text-white py-2 px-4 rounded-lg"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="mt-8">
        <p className="text-sm text-gray-600">
          Last edited by: <strong>{lastEditedBy}</strong>
        </p>
        <p className="text-sm text-gray-600">
          Last edited on: <strong>{lastEditedAt}</strong>
        </p>
      </div>
    </div>
  );
}
