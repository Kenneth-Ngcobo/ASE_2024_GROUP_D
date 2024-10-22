import { fetchRecipes } from './api'
import Pagination from './components/pagination';
import Recipes from './components/recipes';

export default async function Home({ searchParams}) {
    let recipes = {};
    let error = null;

    const page = searchParams.page ? parseInt(searchParams.page) : 1;

    try {
        recipes = await fetchRecipes(20, page );
    } catch (e) {
        error = e.message;
    }



    return (
        <>
            <Recipes recipes={recipes.recipes} />
            <Pagination 
                currentPage={recipes.currentPage}
                totalPages={recipes.totalPages}
            />
            {error && <div className="text-red-500 text-center p-4">Error: {error}</div>}
        </>
    );
}
