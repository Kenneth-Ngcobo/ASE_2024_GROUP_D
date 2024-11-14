"use client"

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Pencil, X, Check } from 'lucide-react';

export default function EditableRecipeDetails({ id, initialDescription, lastEditedBy, lastEditedAt }) {
    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState(initialDescription);
    const [message, setMessage] = useState(null);
    const [editor, setEditor] = useState(lastEditedBy);
    const [editDate, setEditDate] = useState(lastEditedAt);

    useEffect(() => {
        const savedMessage = localStorage.getItem("editMessage");
        if (savedMessage) {
            setMessage(JSON.parse(savedMessage));
            // Clear the message after displaying it
            localStorage.removeItem("editMessage");
        }
    }, []);

    const handleEdit = async () => {

        try {
            const response = await fetch(`/api/recipes/${id}/update`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ description }),
            });

            const data = await response.json();

            if (!response.ok) {
                const data = await response.json();
                setMessage({ type: 'error', text: data.error || 'Something went wrong.' });
                localStorage.setItem("editMessage", JSON.stringify(message));
                return;
            }

            setMessage({ type: 'success', text: 'Recipe description updated successfully!' });
            setEditor(data.lastEditedBy);
            setEditDate(new Date(data.lastEditedAt).toLocaleString());
            setDescription(data.description);
            setIsEditing(false);

            localStorage.setItem("editMessage", JSON.stringify(message))
            console.log(response)
        }
        catch (error) {
            console.error('Error updating recipe:', error);
            setMessage({
                type: 'error',
                text: 'Something went wrong. Please try again later.'
            });
            localStorage.setItem("editMessage", JSON.stringify(message))
        }

    };


    const handleCancel = () => {
        setDescription(initialDescription);
        setIsEditing(false);
        setMessage(null);
        // Clear the message in localStorage
        localStorage.removeItem("editMessage");
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
                    className={`p-4 mb-4 rounded-lg ${message.type === 'error'
                        ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                        : 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
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
                        <Button
                            onClick={handleEdit}
                            className="flex items-center gap-2"
                        >
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
                <strong>Last edited by:</strong> {editor || 'Unknown'} on{' '}
                {editDate ? new Date(editDate).toLocaleString() : 'N/A'}
            </p>
        </div>
    );
}
