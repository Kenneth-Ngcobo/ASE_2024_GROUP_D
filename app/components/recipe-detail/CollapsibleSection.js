'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

/**
 * A collapsible section component for displaying content with a toggleable header.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.title - The title of the section.
 * @param {React.ReactNode} props.content - The content to display when the section is expanded.
 * @param {boolean} [props.defaultOpen=true] - Determines whether the section is open by default.
 * @returns {JSX.Element} A collapsible section with a header and toggleable content.
 */
function CollapsibleSection({ title, content, defaultOpen = true }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="bg-white dark:bg-gray-950 rounded-xl shadow-lg p-6 mb-6 transition-all duration-300 ease-in-out">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full text-xl font-semibold font-serif flex items-center justify-between 
                            transition-all duration-300 
                            ${isOpen ? ' text-[#fc9d4f] dark:from-bg-black dark:to-bg-black dark:text-gray-600' : 'bg-transparent dark:bg-black dark:text-gray-400 text-[#fc9d4f]'}
`}
            >
                {title}
                <FontAwesomeIcon
                    icon={isOpen ? faChevronUp : faChevronDown}
                    className={`ml-2 text-[#fc9d4f] transition-transform duration-300 transform ${isOpen ? 'rotate-180 scale-110' : 'scale-100'}`}
                    size="sm"
                />
            </button>
            {isOpen && (
                <div className="mt-4 text-[#020123] dark:text-gray-500">
                    {content}
                </div>
            )}
        </div>
    );
}

export default CollapsibleSection;
