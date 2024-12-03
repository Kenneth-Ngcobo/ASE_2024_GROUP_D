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
import { ShoppingListProvider } from '../../context/shoppingListContext';
import VoiceAssistant from '../../components/VoiceAssistant';


// Generate metadata for the recipe page dynamically
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
            images: recipe.images?.[0] || '/0.png',
            type: 'article'
        }
    };
}

// Main Recipe Page Component
export default async function RecipePage({ params }) {
    const { id } = params;
    let recipe;
    let load = true;
    let error = null;

    try {
        recipe = await fetchRecipeById(id);
    } catch (error) {
        console.error('Error fetching recipe:', error);
        error = 'Failed to load recipe data.';
    } finally {
        load = false;
    }

    if (error) {
        throw error;
    }

    return (
        <div className="min-h-screen bg-[#fcfde2] dark:bg-[#1c1d02] py-8">
           < ShoppingListProvider>
            <Suspense fallback={<Loading />}>
                <div className="container mx-auto px-4 max-w-5xl">
                    {/* Back Button */}
                    <div className="absolute  left-4 mb-8">
                        <BackButton />
                    </div>

                    <div className="space-y-8">
                            {/* Image and Tags Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-gray-950 rounded-2xl shadow-xl p-6 overflow-hidden">
                                {/* Image Gallery */}
                                <Suspense fallback={<Loading />}>
                                    <div className="w-full">
                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            {recipe.images && recipe.images.length > 0 ? (
                                                <ImageGallery images={recipe.images} />
                                            ) : recipe.images?.[0] ? (
                                                <Image
                                                    src={recipe.images[0]}
                                                    alt={recipe.title || 'Recipe Image'}
                                                    width={300}
                                                    height={200}
                                                    className="w-full h-[400px] object-cover rounded-2xl"
                                                />
                                            ) : (
                                                <div className="w-full h-[400px] bg-gray-100 dark:bg-gray-950 rounded-xl flex items-center justify-center">
                                                    <p className="text-[#020123] dark:text-[#dddcfe]">No image available</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Suspense>

                                {/* Tags Section */}
                                <div className="flex flex-col justify-center">
                                    <h1 className="text-2xl font-bold text-[#fc9d4f] dark:text-[#b05103] mb-4">
                                        {recipe.title || 'Untitled Recipe'}
                                    </h1>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {recipe.tags?.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-2 bg-[#f9efd2] dark:bg-[#1c1d02] dark:text-[#dddcfe] hover:bg-[#edd282] text-[#020123] rounded-xl text-sm font-medium uppercase tracking-wide transition-colors"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        {/* Editable Recipe Details */}
                        <EditableRecipeDetails
                            id={id}
                            initialDescription={recipe.description}
                            lastEditedBy={recipe.lastEditedBy}
                            lastEditedAt={recipe.lastEditedAt}
                        />

                        {/* Allergens Section */}
                        <AllergensSection recipeId={id} />

                        {/** Collapsible Section */}
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
                                        <li key={index} className='text-[#020123] dark:text-[#dddcfe]'>
                                            {key}: {value}
                                        </li>
                                    ))}
                                </ul>
                            }
                            defaultOpen={true}
                        />

                        <CollapsibleSection
                            title="Instructions"
                            content={
                                <ol className='space-y-2'>
                                      {Object.entries(recipe.instructions || {}).map(([key, value], index) => (
                                        <li key={index} className='text-[#020123] dark:text-[#dddcfe]'>
                                            {key}: {value}
                                        </li>
                                    ))}
                                    <VoiceAssistant instructions={recipe.instructions || []}/>
                                </ol>
                                }
                            defaultOpen={true}
                        />

                        {/* New Reviews Section */}
                        <CollapsibleSection
                            title="Reviews"
                            content={<ReviewsSection recipeId={id} />}
                            defaultOpen={true}
                        />
                       
                        {/* Footer Information */}
                        <div className="mt-8 bg-white dark:bg-[#1c1d02] p-6 rounded-xl shadow-xl">
                            <p className="text-sm text-[#020123] dark:text-[#dddcfe">
                                <strong>Published:</strong> {new Date(recipe.published).toDateString()}
                            </p>
                            <p className="text-sm">
                                <strong className="text-[#020123] dark:text-[#dddcfe">Prep Time:</strong> {recipe.prep} minutes
                            </p>
                            <p className="text-sm">
                                <strong className="text-[#020123] dark:text-[#dddcfe">Cook Time:</strong> {recipe.cook} minutes
                            </p>
                            <p className="text-sm">
                                <strong className="text-[#020123] dark:text-[#dddcfe">Servings:</strong> {recipe.servings}
                            </p>
                            <p className="text-sm">
                                <strong className="text-[#020123] dark:text-[#dddcfe">Category:</strong> {recipe.category}
                            </p>
                        </div>
                    </div>
                </div>
                </Suspense>
                </ShoppingListProvider>
        </div>
    );
}
