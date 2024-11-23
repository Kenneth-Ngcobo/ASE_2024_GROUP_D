"use client"
import {LuUndo2} from 'react-icons/lu'

export default function BackButton() {

 return ( 
    <button 
        onClick={() => window.history.back()} // Use `window.history.back()` instead of `router.back()` for Next.js
        href="/recipes" // Ensure this path matches your routing 
    >
        <LuUndo2 size={38} className='  mr-2 text-[#edd282] hover:text-[#fc9d4f] font-large font-semibold ' />
    </button>
)
}