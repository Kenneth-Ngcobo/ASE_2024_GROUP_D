"use client";

import { useState, useEffect } from 'react';

export default function EditableRecipeDetails({ id, initialDescription, lastEditedBy, lastEditedAt }) {
    const [description, setDescription] = useState(initialDescription);
    const [message, setMessage] = useState(null);
    const [editor, setEditor] = useState(lastEditedBy);
    const [editDate, setEditDate] = useState(lastEditedAt);

    useEffect(() => {
        const savedMessage = localStorage.getItem("editMessage");
        if (savedMessage) {
            setMessage(JSON.parse(savedMessage));
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
            if (response.ok) {
                setMessage({ type: 'success', text: data.message });
                setEditor(data.lastEditedBy);
                setEditDate(new Date(data.lastEditedAt).toLocaleString());
                localStorage.setItem("editMessage", JSON.stringify({ type: 'success', text: data.message }));
            } else {
                setMessage({ type: 'error', text: data.error });
                localStorage.setItem("editMessage", JSON.stringify({ type: 'error', text: data.error }));
            }
        } catch (error) {
            console.error('Error updating recipe:', error);
            setMessage({ type: 'error', text: 'Something went wrong. Please try again later.' });
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-green-800 mb-4">Description</h2>
            {message && <p className={message.type === 'error' ? 'error' : 'success'}>{message.text}</p>}
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                className="w-full p-2 border rounded"
            />
            <button onClick={handleEdit} className="mt-4 px-4 py-2 bg-green-600 text-white rounded">
                Save Changes
            </button>
            <p className="mt-4 text-sm text-gray-600">
                <strong>Last edited by:</strong> {editor || 'Unknown'} on {editDate || 'N/A'}
            </p>
        </div>
    );
}
