import { fetchRecipes } from './api';
import Pagination from './components/pagination';
import Recipes from './components/recipes';
import Footer from './components/footer';
import LoadingSpinner from './components/loadingSpinner';
import Loading from './loading';
import { Suspense } from 'react';
import SearchBar from './components/searchBar';

export default async function Home({ searchParams }) {
    // Initialize recipes object to store fetched data
    let recipes = {};
    // Initialize error variable to capture any error messages
    let error = null;

    // Determine the current page from search parameters, defaulting to 1
    const page = searchParams.page ? parseInt(searchParams.page) : 1;

    try {
        // Fetch recipes from the API with a limit of 20 per page
        recipes = await fetchRecipes(20, page);
    } catch (err) {
        // Capture any error that occurs during the fetch
        error = err.message; // Store the error message
    }


    // Return the rendered JS for the Home component
    return (
        <>
            <Suspense fallback={<Loading />}>
               <SearchBar/>

                {/* Render the Recipes component, passing the fetched recipes as props */}
                <Recipes recipes={recipes.recipes} />
             
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
