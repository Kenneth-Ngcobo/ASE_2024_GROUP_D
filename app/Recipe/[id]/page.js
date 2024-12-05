import { Suspense } from "react";
import Image from "next/image";
import BackButton from "../../components/ui/BackButton";
import { fetchRecipeById } from "../../api";
import ImageGallery from "../../components/recipe-detail/ImageGallery";
import CollapsibleSection from "../../components/recipe-detail/CollapsibleSection";
import Loading from "./loading";
import EditDescription from "../../components/recipe-detail/EditDescription";
import ReviewsSection from "../../components/recipe-detail/ReviewsSection";
import AllergensSection from "../../components/recipe-detail/AllergensSection";
import RecipeIngredientsSelector from "../../components/recipe/RecipeIngredientsSelector";
import VoiceAssistant from "../../components/voice-ai/VoiceAssistant";

// Generate metadata for the recipe page dynamically
export async function generateMetadata({ params }) {
  const { id } = params;
  const recipe = await fetchRecipeById(id);

  if (!recipe) {
    return {
      title: "Recipe not found",
      description: "Error occurred while fetching the recipe.",
    };
  }

  return {
    title: recipe.title || "Untitled Recipe",
    description: recipe.description || "No description available.",
    openGraph: {
      title: recipe.title || "Untitled Recipe",
      description: recipe.description || "No description available.",
      images: recipe.images?.[0] || "/0.png",
      type: "article",
    },
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
    console.error("Error fetching recipe:", error);
    error = "Failed to load recipe data.";
  } finally {
    load = false;
  }

  if (error) {
    throw error;
  }

  return (
    <div className="min-h-screen bg-[#fcfde2] dark:bg-[#1c1d02] py-8">
      <Suspense fallback={<Loading />}>
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Back Button */}
          <div className="absolute  left-4 mb-8">
            <BackButton />
          </div>

          <div className="space-y-8">
            {/* Image Section */}
            <div className="bg-white dark:bg-gray-950 rounded-2xl shadow-xl p-6 overflow-hidden">
              <Suspense fallback={<Loading />}>
                {recipe.images && recipe.images.length > 0 ? (
                  <ImageGallery images={recipe.images} />
                ) : recipe.images?.[0] ? (
                  <Image
                    src={recipe.images[0]}
                    alt={recipe.title || "Recipe Image"}
                    width={300}
                    height={200}
                    className="w-full h-[400px] object-cover rounded-xl"
                  />
                ) : (
                  <div className="w-full h-[400px] bg-gray-100 dark:bg-gray-950 rounded-xl flex items-center justify-center">
                    <p className="text-[#020123] dark:text-[#dddcfe">
                      No image available
                    </p>
                  </div>
                )}
              </Suspense>
            </div>

            {/* Title and Tags Section */}
            <div className="bg-white dark:bg-gray-950 rounded-2xl shadow-xl p-8">
              <h1 className="text-4xl font-bold text-[#fc9d4f] dark: text-[#b05103] mb-4">
                {recipe.title || "Untitled Recipe"}
              </h1>
              <div className="flex flex-wrap gap-3 mb-6">
                {recipe.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-[#f9efd2] dark:bg-[#1c1d02] dark:text-[#dddcfe] hover:bg-[#edd282] text-[#020123] rounded-2xl text-sm font-medium uppercase tracking-wide transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Editable Recipe Details */}
            <EditDescription recipe={recipe} />
            {/* Allergens Section */}
            <AllergensSection recipeId={id} />

            {/** Collapsible Section */}
            <CollapsibleSection
              title="Ingredients"
              content={
                <div className="pt-4">
                  <RecipeIngredientsSelector
                    ingredients={recipe.ingredients || {}}
                  />
                </div>
              }
              defaultOpen={true}
            />

            <CollapsibleSection
              title="Nutrition"
              content={
                <ul className="list-disc list-inside">
                  {Object.entries(recipe.nutrition || {}).map(
                    ([key, value], index) => (
                      <li key={index}>
                        {key}: {value}
                      </li>
                    )
                  )}
                </ul>
              }
              defaultOpen={true}
            />

            <CollapsibleSection
              title="Instructions"
              content={
                <div>
                  {recipe.instructions || "No instructions available."}
                  <VoiceAssistant instructions={recipe.instructions || []} />
                </div>
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
                <strong>Published:</strong>{" "}
                {new Date(recipe.published).toDateString()}
              </p>
              <p className="text-sm">
                <strong className="text-[#020123] dark:text-[#dddcfe">
                  Prep Time:
                </strong>{" "}
                {recipe.prep} minutes
              </p>
              <p className="text-sm">
                <strong className="text-[#020123] dark:text-[#dddcfe">
                  Cook Time:
                </strong>{" "}
                {recipe.cook} minutes
              </p>
              <p className="text-sm">
                <strong className="text-[#020123] dark:text-[#dddcfe">
                  Servings:
                </strong>{" "}
                {recipe.servings}
              </p>
              <p className="text-sm">
                <strong className="text-[#020123] dark:text-[#dddcfe">
                  Category:
                </strong>{" "}
                {recipe.category}
              </p>
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
}
