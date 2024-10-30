import React from 'react';
import Link from 'next/link'; // Import Link component to enable navigation
import Image from 'next/image'; // Import Image component for optimized image loading

// Functional component 'Recipes' that accepts a 'recipe' prop
const Recipes = ({ recipe }) => {
  return (
    // Link component to navigate to a specific recipe page based on its ID
    <Link
      href={`/recipes/${recipe.id}`} // Dynamic route to the recipe's detail page
      className="block p-4 bg-[#1C1C1C] border border-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-800" // Tailwind classes for styling and hover effects
    >
      {/* Display recipe image with specific width, height, and object-fit styling */}
      <Image
        src={recipe.image} // Source of the image, coming from the recipe prop
        alt={recipe.title} // Alternative text for the image
        width={300} // Image width in pixels
        height={200} // Image height in pixels
        className="object-cover rounded-md" // Tailwind class for covering and rounding the image
      />

      {/* Recipe title */}
      <h2 className="text-xl font-bold mt-8 text-orage">
        {recipe.title} {/* Display the recipe title */}

      </h2>

      {/* Recipe category */}
      <p className="text-sm text-gray-400 mt-1">
        Category: {recipe.category} {/* Display the recipe category */}
      </p>

 ?
     
      {/* Recipe preparation time */}
      <p className="text-sm text-gray-500">
        Prep Time: {recipe.prep} mins {/* Display the preparation time */}
      </p>
    </Link>
  );
};

export default Recipes;
