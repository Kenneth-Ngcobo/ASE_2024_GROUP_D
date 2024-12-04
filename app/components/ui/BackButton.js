"use client"
import { FaHandPointLeft } from 'react-icons/fa'

/**
 * BackButton component to navigate the user back to the previous page.
 * @returns {JSX.Element} The rendered BackButton component.
 */
export default function BackButton() {

    return (
        <button
            onClick={() => window.history.back()} // Use `window.history.back()` instead of `router.back()` for Next.js
            href="/recipes" // Ensure this path matches your routing 
        >
            <FaHandPointLeft size={32} className='  mr-2 text-[#edd282] hover:text-[#fc9d4f] font-large font-semibold ' />
        </button>
    )
}