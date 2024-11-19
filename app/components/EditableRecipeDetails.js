"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Pencil, X, Check } from "lucide-react";

export default function EditableRecipeDetails({
  id,
  initialDescription,
  lastEditedBy,
  lastEditedAt,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(initialDescription);
  const [message, setMessage] = useState(null);
  const [editor, setEditor] = useState(lastEditedBy);
  const [editDate, setEditDate] = useState(lastEditedAt);
  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const response = await fetch(`/api/recipes/${id}`);
        const data = await response.json();
        setDescription(data.description);
        setEditor(data.lastEditedBy);
        setEditDate(data.lastEditedAt);
      } catch (error) {
        console.error("Error fetching recipe data:", error);
        setMessage({
          type: "error",
          text: "Something went wrong. Please try again later.",
        });
      }
    };

    fetchRecipeData();
  }, [id]);

  const handleEdit = async () => {
    //validate the email is logged in correctly
    const emailData = localStorage.getItem("loggedInUserEmail");

    if (!emailData) {
      setMessage({
        type: "error",
        text: "Please sign in to edit recipes.",
      });
      return;
    }
    try {
      const userDetails = await fetch(`/api/auth/user/${[emailData]}/profile`);
      if (userDetails.ok) {
        const data = await userDetails.json();
        if (data._id) {
          try {
            const response = await fetch(
              `/api/recipes/${id}/update?email=${emailData}`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ description }),
              }
            );

            const data = await response.json();

            if (!response.ok) {
              if (response.status === 401) {
                setMessage({
                  type: "error",
                  text: "Please log in to edit recipes.",
                });
                return;
              }
              setMessage({
                type: "error",
                text: data.error || "Something went wrong.",
              });
              return;
            }

            setMessage({
              type: "success",
              text: "Recipe description updated successfully!",
            });
            setEditor(data.lastEditedBy);
            setEditDate(new Date(data.lastEditedAt).toLocaleString());
            setDescription(data.description);
            setIsEditing(false);

            console.log(response);
          } catch (error) {
            console.error("Error updating recipe:", error);
            setMessage({
              type: "error",
              text: "Something went wrong. Please try again later.",
            });
          }
        } else {
          setMessage({
            type: "error",
            text: "Please sign in to edit recipes.",
          });
          return;
        }
      } else {
        setMessage({ type: "error", text: "Please sign in to edit recipes." });
        return;
      }
    } catch (error) {
      console.error("Error updating recipe:", error);
      setMessage({
        type: "error",
        text: "Something went wrong. Please try again later.",
      });
    }
  };

  const handleCancel = () => {
    setDescription(initialDescription);
    setIsEditing(false);
    setMessage(null);
  };

  return (
    <div className="bg-white dark:bg-gray-950 rounded-2xl shadow-xl p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-400">
          Description
        </h2>
        {!isEditing && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </Button>
        )}
      </div>

      {message && (
        <div
          className={`p-4 mb-4 rounded-lg ${
            message.type === "error"
              ? "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
              : "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
          }`}
        >
          {message.text}
        </div>
      )}

      {isEditing ? (
        <div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="w-full p-2 border rounded mb-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <div className="flex gap-2">
            <Button onClick={handleEdit} className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              Save Changes
            </Button>
            <Button
              variant="outline"
              onClick={handleCancel}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
            {description}
          </p>
        </div>
      )}

      <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        <strong>Last edited by:</strong> {editor || "Unknown"} on{" "}
        {new Date(editDate.updatedAt || editDate.createdAt).toLocaleString()}
      </p>
    </div>
  );
}
