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
                            ${isOpen ? ' text-[#020123] dark:from-bg-black dark:to-bg-black dark:text-[#dddfce]' : 'bg-transparent dark:bg-black dark:text-[#dddfce] text-[#020123]'}
`}
            >
                {title}
                <FontAwesomeIcon
                    icon={isOpen ? faChevronUp : faChevronDown}
                    className={`ml-2 text-[#020123] transition-transform duration-300 transform ${isOpen ? 'rotate-180 scale-110' : 'scale-100'}`}
                    size="sm"
                />
            </button>
            {isOpen && (
                <div className="mt-4 text-[#020123] dark:text-[#dddfce]">
                    {content}
                </div>
            )}
        </div>
    );
}

export default CollapsibleSection;
