import PushNotificationManager from "./components/PushNotificationManager";
import InstallPrompt from "./components/InstallPrompt";
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { fetchRecipes } from './api';
import Pagination from './components/pagination';
import Recipes from './components/recipes';
import Footer from './components/footer';
import Loading from './loading';
import RecipeCarousel from './components/RecipeCarousel';
import { ShoppingListProvider } from './context/shoppingListContext';
import RegisterServiceWorker from './components/RegisterServiceWorker';

export default async function Home({ searchParams }) {
    let recipes = {};
    let error = null;

    const page = searchParams.page ? parseInt(searchParams.page) : 1;
    const sort = searchParams.sort || '';
    const order = searchParams.order || 'desc';
    const search = searchParams.search || '';
    const tags = searchParams.tags || '';
    const category = searchParams.category || '';
    const ingredients = searchParams.ingredients || '';
    const instructions = searchParams.instructions || '';

    try {
        recipes = await fetchRecipes(20, page, search, tags, category, ingredients, instructions, sort, order);
    } catch (err) {
        error = err.message;
    }

    return (
            <>
        <RegisterServiceWorker />
                {/* Welcome Section with background image */}
                                <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: `url('/home page1.jpg')` }}>
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white">
                        <div className="text-center px-4">
                            <h1 className="text-4xl font-bold mb-4">Welcome to the Recipe App</h1>
                            <p className="text-lg mb-6">Discover delicious recipes and enjoy cooking!</p>
                          {/*  <button
                                className="bg-yellow-500 text-black py-2 px-4 rounded-full hover:bg-yellow-600 transition"
                                onClick={() => window.location.href='/recipes'}
                            >
                                Get Started
                            </button>*/}
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
                     <PushNotificationManager /> 
                     <InstallPrompt />
                <Footer />
            </Suspense>

        </>
    );
}
