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
        <ShoppingListProvider>
            <>
                <RegisterServiceWorker /> {/* Register the Service Worker */}
                <RecipeCarousel />
                <Suspense fallback={<Loading />}>
                    <Recipes
                        recipes={recipes.recipes}
                        initialSort={sort}
                        initialOrder={order}
                    />
                    <Pagination
                        currentPage={recipes.currentPage}
                        totalPages={recipes.totalPages}
                    />
                    <Footer />
                </Suspense>
            </>
        </ShoppingListProvider>
    );
}
