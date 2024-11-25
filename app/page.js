import { fetchRecipes } from "./api"; // API function to fetch recipes
import Pagination from "./components/pagination"; // Pagination component
import Recipes from "./components/recipes"; // Recipes listing component
import Footer from "./components/footer"; // Footer component
import Loading from "./loading"; // Loading fallback component
import RecipeCarousel from "./components/RecipeCarousel"; // Carousel for featured recipes
import { Suspense } from "react"; // React Suspense for lazy loading
// import RecordVoice from "./components/RecordVoice"; // Voice command/recording component

export default async function Home({ searchParams }) {
    // Initialize recipes object to store fetched data
    let recipes = {};
    // Initialize error variable to capture any error messages
    let error = null;

    // Extract search parameters with defaults
    const page = searchParams.page ? parseInt(searchParams.page) : 1;
    const sort = searchParams.sort || '';
    const order = searchParams.order || 'desc';
    const search = searchParams.search || '';
    const tags = searchParams.tags ||'';
    const category = searchParams.category || '';
    const ingredients = searchParams.ingredients || ''
    const instructions = searchParams.instructions || ''
    try {
        // Fetch recipes from the API with a limit of 20 per page
        recipes = await fetchRecipes(20, page,search, tags, category, ingredients, instructions, sort, order);
    } catch (err) {
        // Capture any error that occurs during the fetch
        error = err.message; // Store the error message
    }

    // Return the rendered JSX for the Home component
    return (
        <>
            <RecipeCarousel /> {/* Recipe carousel */}
            {/* <RecordVoice /> Voice recorder/command component */}
            <Suspense fallback={<Loading />}>
                {/* Render the Recipes component */}
                <Recipes
                    recipes={recipes.recipes}
                    initialSort={sort}
                    initialOrder={order}
                />

                {/* Render the Pagination component */}
                <Pagination
                    currentPage={recipes.currentPage} // Current page number
                    totalPages={recipes.totalPages} // Total number of pages
                />

                <Footer /> {/* Footer section */}
            </Suspense>
        </>
    );
}
