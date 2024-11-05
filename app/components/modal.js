import { useEffect } from 'react';

export function Modal({ isOpen, onClose, children }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        } else {
            document.body.style.overflow = 'unset'; // Re-enable scrolling
        }

        return () => {
            document.body.style.overflow = 'unset'; // Clean up on unmount
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
                    &times; {/* Close icon */}
                </button>
                {children}
            </div>
        </div>
    );
}
