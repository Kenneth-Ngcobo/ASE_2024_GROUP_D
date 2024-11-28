import PushNotificationManager from "./components/PushNotificationManager";
import InstallPrompt from "./components/InstallPrompt";
import { Suspense } from 'react';

import { fetchRecipes } from './api';
import Pagination from './components/pagination';
import Recipes from './components/recipes';
import Footer from './components/footer';
import Loading from './loading';
import RecipeCarousel from './components/RecipeCarousel';
import HomePage from "./components/ui/homepage";
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
        <ShoppingListProvider>
            <RegisterServiceWorker />
          <RecipeCarousel />

            <Suspense fallback={<Loading />}>
                {/* Render the Recipes component */}
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
        </ShoppingListProvider>
    );
}
