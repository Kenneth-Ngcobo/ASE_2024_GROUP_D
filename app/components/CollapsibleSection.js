'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

function CollapsibleSection({ title, content, defaultOpen = true }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="bg-white dark:bg-gray-950 rounded-xl shadow-lg p-6 mb-6 transition-all duration-300 ease-in-out">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full text-xl font-semibold font-serif flex items-center justify-between 
                            transition-all duration-300 
                            ${isOpen ? 'bg-gradient-to-r from-blue-300 to-blue-400 text-gray-600 dark:from-bg-black dark:to-bg-black dark:text-gray-600' : 'bg-transparent dark:bg-black dark:text-gray-400 text-blue-800'}
                            rounded-lg px-4 py-2 hover:bg-gradient-to-r hover:from--200 hover:to-blue-300 
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                            shadow-md hover:shadow-lg active:shadow-sm`}
            >
                {title}
                <FontAwesomeIcon
                    icon={isOpen ? faChevronUp : faChevronDown}
                    className={`ml-2 text-blue-600 transition-transform duration-300 transform ${isOpen ? 'rotate-180 scale-110' : 'scale-100'}`}
                    size="sm"
                />
            </button>
            {isOpen && (
                <div className="mt-4 text-gray-700 dark:text-gray-500">
                    {content}
                </div>
            )}
        </div>
    );
}

export default CollapsibleSection;
