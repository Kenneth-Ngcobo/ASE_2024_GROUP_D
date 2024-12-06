/**
 * DownloadButton component that triggers the download of a recipe.
 * It uses the `downloadRecipe` function from the `DownloadContext` to handle
 * the download process and alerts the user when the download is complete.
 *
 * @param {Object} props - The component properties.
 * @param {Object} props.recipe - The recipe object containing the recipe details.
 * @param {string} props.recipe.id - The unique ID of the recipe.
 * @returns {JSX.Element} The rendered DownloadButton component.
 */
'use client';
import { useState } from 'react';
import { useDownload } from '../../context/DownloadContext';

const DownloadButton = ({ recipe }) => {
    const { downloadRecipe } = useDownload();
    const [isDownloaded, setIsDownloaded] = useState(false);

    const handleDownload = async () => {
        try {
            console.log('Recipe being downloaded:', recipe);
            await downloadRecipe(recipe);
            setIsDownloaded(true);
            setTimeout(() => setIsDownloaded(false), 2000);
        } catch (error) {
            console.error('Error saving recipe:', error);
        }
    };

    return (
        <button
            onClick={handleDownload}
            className={`mt-4 p-2 rounded ${isDownloaded ? 'bg-green-500 text-white' : 'bg-[#fc9d4f] hover:bg-[#edd282] text-white'}`}
        >
            {isDownloaded ? 'Recipe Saved!' : 'Save Recipe'}
        </button>
    );
};

// Export the component for use in other files
export default DownloadButton;
