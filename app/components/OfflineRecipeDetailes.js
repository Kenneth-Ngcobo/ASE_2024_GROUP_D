'use client';
import { useDownload } from '../context/DownloadContext';

const OfflineRecipes = () => {
    const { downloadedRecipes } = useDownload();

    return (
        <div>
            <h2>Saved Recipes</h2>
            {downloadedRecipes.length > 0 ? (
                downloadedRecipes.map((recipe) => (
                    <div key={recipe.id} className="mb-4 p-4 bg-gray-100 rounded-lg">
                        <h3 className="text-lg font-bold">{recipe.title}</h3>
                        <p>{recipe.description}</p>
                    </div>
                ))
            ) : (
                <p>No saved recipes available.</p>
            )}
        </div>
    );
};

export default OfflineRecipes;
