"use client"

export default function BackButton() {

 return ( 
    <button 
        onClick={() => window.history.back()} // Use `window.history.back()` instead of `router.back()` for Next.js
        href="/recipes" // Ensure this path matches your routing
        className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 
                text-white font-bold py-3 px-6 rounded-full transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-block"
    >
        ← Back to Recipes
    </button>
)
}