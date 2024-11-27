'use client';
import { useDownload } from '../context/DownloadContext';

const DownloadButton = ({ recipe }) => {
    const { downloadRecipe } = useDownload();

    const handleDownload = () => {
        // Append the recipe to the existing array in local storage
        downloadRecipe(recipe);
    };

    return (
        <button onClick={handleDownload} className="mt-4 bg-[#fc9d4f] hover:bg-[#edd282] text-white p-2 rounded">
            Save Recipe
        </button>
    );
};

export default DownloadButton;
