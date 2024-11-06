"use client"

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Alert, AlertDescription } from './ui/alert';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';

const RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 1000;

export default function EditableRecipeDetails({ id, initialDescription, lastEditedBy, lastEditedAt }) {
    const { data: session } = useSession();
    const [description, setDescription] = useState(initialDescription);
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState(null);
    const [editor, setEditor] = useState(lastEditedBy);
    const [editDate, setEditDate] = useState(lastEditedAt);
    const [isLoading, setIsLoading] = useState(false);
    const [retryCount, setRetryCount] = useState(0);

    // Cache management
    useEffect(() => {
        const savedMessage = localStorage.getItem("editMessage");
        if (savedMessage) {
            setMessage(JSON.parse(savedMessage));
            // Clear message after 5 seconds
            setTimeout(() => {
                setMessage(null);
                localStorage.removeItem("editMessage");
            }, 5000);
        }
    }, []);

    // Client-side validation
    const validateDescription = (text) => {
        if (!text || typeof text !== 'string') return 'Description is required';
        if (text.trim().length < 10) return 'Description must be at least 10 characters';
        if (text.trim().length > 1000) return 'Description must not exceed 1000 characters';
        return null;
    };

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const handleEdit = async () => {
        // Validate description before making API call
        const validationError = validateDescription(description);
        if (validationError) {
            setMessage({ type: 'error', text: validationError });
            return;
        }

        setIsLoading(true);
        setRetryCount(0);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

        try {
            // Optimistic update
            const previousDescription = description;
            const previousEditor = editor;
            const previousEditDate = editDate;

            setEditor(session?.user?.name || 'Unknown');
            setEditDate(new Date().toLocaleString());

            while (retryCount < RETRY_ATTEMPTS) {
                try {
                    const response = await fetch(`/api/recipes/${id}/update`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            // Add CSRF token if your app uses it
                            // 'CSRF-Token': csrfToken
                        },
                        body: JSON.stringify({ description }),
                        signal: controller.signal
                    });

                    const data = await response.json();

                    if (response.ok) {
                        setMessage({ type: 'success', text: data.message });
                        setEditor(data.lastEditedBy);
                        setEditDate(new Date(data.lastEditedAt).toLocaleString());
                        setIsEditing(false);
                        localStorage.setItem("editMessage",
                            JSON.stringify({ type: 'success', text: data.message })
                        );
                        break;
                    } else {
                        throw new Error(data.error || 'Failed to update recipe');
                    }
                } catch (error) {
                    if (error.name === 'AbortError') {
                        throw new Error('Request timed out');
                    }

                    setRetryCount(prev => prev + 1);
                    if (retryCount < RETRY_ATTEMPTS - 1) {
                        await sleep(RETRY_DELAY * (retryCount + 1)); // Exponential backoff
                        continue;
                    }
                    throw error;
                }
            }
        } catch (error) {
            console.error('Error updating recipe:', error);
            setMessage({ type: 'error', text: error.message || 'Something went wrong. Please try again later.' });

            // Revert optimistic update on failure
            setDescription(previousDescription);
            setEditor(previousEditor);
            setEditDate(previousEditDate);

            localStorage.setItem("editMessage",
                JSON.stringify({ type: 'error', text: error.message })
            );
        } finally {
            clearTimeout(timeoutId);
            setIsLoading(false);
        }
    };

    // Cancel edit mode
    const handleCancel = () => {
        setDescription(initialDescription);
        setIsEditing(false);
        setMessage(null);
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-green-800">Description</h2>
                {session && !isEditing && (
                    <Button
                        onClick={() => setIsEditing(true)}
                        variant="outline"
                        className="text-green-600 border-green-600 hover:bg-green-50"
                    >
                        Edit Description
                    </Button>
                )}
            </div>

            {message && (
                <Alert variant={message.type === 'error' ? 'destructive' : 'default'} className="mb-4">
                    <AlertDescription>{message.text}</AlertDescription>
                </Alert>
            )}

            {isEditing ? (
                <div className="space-y-4">
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="4"
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        disabled={isLoading}
                    />
                    <div className="flex space-x-4">
                        <Button
                            onClick={handleEdit}
                            disabled={isLoading}
                            className="bg-green-600 text-white hover:bg-green-700"
                        >
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Changes
                        </Button>
                        <Button
                            onClick={handleCancel}
                            variant="outline"
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            ) : (
                <p className="text-gray-700 whitespace-pre-wrap">{description}</p>
            )}

            <p className="mt-4 text-sm text-gray-600">
                <strong>Last edited by:</strong> {editor || 'Unknown'} on {editDate || 'N/A'}
            </p>
        </div>
    );
}