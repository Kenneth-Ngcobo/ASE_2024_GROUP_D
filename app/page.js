
import { fetchRecipes } from "./api";
import Pagination from "./components/pagination";
import Recipes from "./components/recipes";
import Footer from "./components/footer";
import Loading from "./loading";
import SearchBar from "./components/searchBar";
import CategoryList from "./components/CategoryList";
import RecipeCarousel from "./components/RecipeCarousel";
import { Suspense } from 'react';

export default async function Home({ searchParams }) {
    // Initialize recipes object to store fetched data
    let recipes = {};
    // Initialize error variable to capture any error messages
    let error = null;

    // Determine the current page from search parameters, defaulting to 1
    const page = searchParams.page ? parseInt(searchParams.page) : 1;
    const sort = searchParams.sort || 'default';
    const order = searchParams.order || 'ascending';
    const search = searchParams.search || '';
    const tags = searchParams.tags ||'';
    const category = searchParams.category || '';
    const ingredients = searchParams.ingredients || ''
    const instructions = searchParams.instructions || ''
    try {
        // Fetch recipes from the API with a limit of 20 per page
        recipes = await fetchRecipes(20, page,search, tags, category, ingredients, instructions);
    } catch (err) {
        // Capture any error that occurs during the fetch
        error = err.message; // Store the error message
    }

    // Return the rendered JS for the Home component
    return (
        <>
            <Suspense fallback={<Loading />}>
                <SearchBar/>
                  <CategoryList />
                {/* Render the Recipes component, passing the fetched recipes as props */}
                <Recipes 
                    recipes={recipes.recipes}
                    initialSort={sort}
                    initialOrder={order}
                />
                <RecipeCarousel />
    
                {/* Render the Pagination component, passing the current page and total pages */}
                <Pagination
                    currentPage={recipes.currentPage} // Current page number
                    totalPages={recipes.totalPages} // Total number of pages available
                    
                />
                
                <Footer />
            </Suspense>

        </>
    );
}
