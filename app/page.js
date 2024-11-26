
import { fetchRecipes } from "./api";
import Pagination from "./components/pagination";
import Recipes from "./components/recipes";
import Footer from "./components/footer";
import Loading from "./loading";
import RecipeCarousel from "./components/RecipeCarousel";
import { ShoppingListProvider } from "./context/ShoppingListContext";
import { Suspense } from 'react';

export default async function Home({ searchParams }) {
    // Initialize recipes object to store fetched data
    let recipes = {};
    // Initialize error variable to capture any error messages
    let error = null;

    // Determine the current page from search parameters, defaulting to 1
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

    // Return the rendered JS for the Home component
    return (
        <ShoppingListProvider>
            <>
                {/* Welcome Section with background image */}
                                <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: `url('/home page1.jpg')` }}>
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white">
                        <div className="text-center px-4">
                            <h1 className="text-4xl font-bold mb-4">Welcome to the Recipe App</h1>
                            <p className="text-lg mb-6">Discover delicious recipes and enjoy cooking!</p>

                        </div>
                    </div>
                </div>

        <RecipeCarousel />

            <Suspense fallback={<Loading />}>
                {/*<CategoryList totalRecipes={recipes.totalRecipes} />*/}
                {/* Render the Recipes component, passing the fetched recipes as props */}
                <Recipes 
                    recipes={recipes.recipes}
                    initialSort={sort}
                    initialOrder={order}
                />
                
    
                {/* Render the Pagination component, passing the current page and total pages */}
                <Pagination
                    currentPage={recipes.currentPage} // Current page number
                    totalPages={recipes.totalPages} // Total number of pages available
                    
                />
                
                <Footer />
            </Suspense>

        </>
        </ShoppingListProvider>  
    );
}
