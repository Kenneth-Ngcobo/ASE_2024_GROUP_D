import { Suspense } from 'react';
import Image from 'next/image';
import BackButton from '../../components/BackButton';
import { fetchRecipeById } from '../../api';
import ImageGallery from '../../components/ImageGallery';
import CollapsibleSection from '../../components/CollapsibleSection';
import Loading from './loading';
import EditableRecipeDetails from '../../components/EditableRecipeDetails';
import ReviewsSection from '../../components/ReviewsSection';
import AllergensSection from '../../components/AllergensSection';
import RecipeIngredientsSelector from '../../components/RecipeIngredientsSelector';
import { ShoppingListProvider } from '../../context/ShoppingListContext';
import { DownloadProvider } from '../../context/DownloadContext';
import DownloadButton from '../../components/DownLoadButton';

export async function generateMetadata({ params }) {
    const { id } = params;
    const recipe = await fetchRecipeById(id);

    if (!recipe) {
        return {
            title: 'Recipe not found',
            description: 'Error occurred while fetching the recipe.'
        };
    }

    return {
        title: recipe.title || 'Untitled Recipe',
        description: recipe.description || 'No description available.',
        openGraph: {
            title: recipe.title || 'Untitled Recipe',
            description: recipe.description || 'No description available.',
            images: recipe.images?.[0] || '/kwaMai.jpg',
            type: 'article'
        }
    };
}

export default async function RecipePage({ params }) {
    const { id } = params;
    let recipe = null;
    let load = true;
    let error = null;

    try {
        recipe = await fetchRecipeById(id);
    } catch (err) {
        console.error('Error fetching recipe:', err);
        error = 'Failed to load recipe data.';
    } finally {
        load = false;
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#fcfde2] py-8">
                <ShoppingListProvider>
                    <DownloadProvider>
                        <div className="container mx-auto px-4 max-w-5xl">
                            <p className="text-center text-red-500">{error}</p>
                        </div>
                    </DownloadProvider>
                </ShoppingListProvider>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fcfde2] py-8">
            <ShoppingListProvider>
                <DownloadProvider>
                    <Suspense fallback={<Loading />}>
                        <div className="container mx-auto px-4 max-w-5xl">
                            <div className="absolute left-4 mb-8">
                                <BackButton />
                            </div>

                            <div className="space-y-8">
                                <div className="bg-white dark:bg-gray-950 rounded-2xl shadow-xl p-6 overflow-hidden">
                                    <Suspense fallback={<Loading />}>
                                        {recipe.images && recipe.images.length > 0 ? (
                                            <ImageGallery images={recipe.images} />
                                        ) : recipe.images?.[0] ? (
                                            <Image
                                                src={recipe.images[0]}
                                                alt={recipe.title || 'Recipe Image'}
                                                width={300}
                                                height={200}
                                                className="w-full h-[400px] object-cover rounded-xl"
                                            />
                                        ) : (
                                            <div className="w-full h-[400px] bg-gray-100 dark:bg-gray-950 rounded-xl flex items-center justify-center">
                                                <p className="text-gray-500">No image available</p>
                                            </div>
                                        )}
                                    </Suspense>
                                </div>

                                <div className="bg-white dark:bg-gray-950 rounded-2xl shadow-xl p-8">
                                    <h1 className="text-4xl font-bold text-[#fc9d4f] mb-4">
                                        {recipe.title || 'Untitled Recipe'}
                                    </h1>
                                    <div className="flex flex-wrap gap-3 mb-6">
                                        {recipe.tags?.map((tag, index) => (
                                            <span key={index} className="px-4 py-2 bg-[#f9efd2] dark:bg-gray-800 dark:text-gray-400 hover:bg-[#edd282] text-[#020123] rounded-2xl text-sm font-medium uppercase tracking-wide transition-colors">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <EditableRecipeDetails
                                    id={id}
                                    initialDescription={recipe.description}
                                    lastEditedBy={recipe.lastEditedBy}
                                    lastEditedAt={recipe.lastEditedAt}
                                />

                                <AllergensSection recipeId={id} />

                                <CollapsibleSection
                                    title="Ingredients"
                                    content={
                                        <div className="pt-4">
                                            <RecipeIngredientsSelector ingredients={recipe.ingredients || {}} />
                                        </div>
                                    }
                                    defaultOpen={true}
                                />

                                <CollapsibleSection
                                    title="Nutrition"
                                    content={
                                        <ul className="list-disc list-inside">
                                            {Object.entries(recipe.nutrition || {}).map(([key, value], index) => (
                                                <li key={index}>
                                                    {key}: {value}
                                                </li>
                                            ))}
                                        </ul>
                                    }
                                    defaultOpen={true}
                                />

                                <CollapsibleSection
                                    title="Instructions"
                                    content={recipe.instructions || 'No instructions available.'}
                                    defaultOpen={true}
                                />

                                <CollapsibleSection
                                    title="Reviews"
                                    content={<ReviewsSection recipeId={id} />}
                                    defaultOpen={true}
                                />

                                <div className="mt-8 bg-white dark:bg-gray-950 p-6 rounded-xl shadow-xl">
                                    <p className="text-sm text-[#020123]">
                                        <strong>Published:</strong> {new Date(recipe.published).toDateString()}
                                    </p>
                                    <p className="text-sm">
                                        <strong className="text-[#020123]">Prep Time:</strong> {recipe.prep} minutes
                                    </p>
                                    <p className="text-sm">
                                        <strong className="text-[#020123]">Cook Time:</strong> {recipe.cook} minutes
                                    </p>
                                    <p className="text-sm">
                                        <strong className="text-[#020123]">Servings:</strong> {recipe.servings}
                                    </p>
                                    <p className="text-sm">
                                        <strong className="text-[#020123]">Category:</strong> {recipe.category}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <DownloadButton recipe={recipe} />
                    </Suspense>
                </DownloadProvider>
            </ShoppingListProvider>
        </div>
    );
}
