import { useDownload } from "../../context/DownloadContext";

/**
 * DownloadButton component that triggers the download of a recipe.
 * It uses the `downloadRecipe` function from the `DownloadContext` to handle
 * the download process and alerts the user when the download is complete.
 *
 * @param {Object} props - The component properties.
 * @param {Object} props.recipe - The recipe object containing the recipe details.
 * @param {string} props.recipe.id - The unique ID of the recipe.
 * @param {Object} props.recipe - The recipe details to be downloaded.
 * @returns {JSX.Element} The rendered DownloadButton component.
 */
const DownloadButton = ({ recipe }) => {
    const { downloadRecipe } = useDownload();

    /**
     * Handles the download action for the recipe.
     * Triggers the downloadRecipe function from context and shows an alert.
     */
    const handleDownload = () => {
        downloadRecipe(recipe.id, recipe);
        alert('Recipe downloaded for offline use!');
    };

    return (
        <button onClick={handleDownload} className="bg-blue-500 text-white px-4 py-2 rounded">
            Download for Offline Use
        </button>
    );
};

export default DownloadButton;
