"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, Suspense } from "react";
import { FaUser, FaHeart, FaRegHeart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import CategoryList from "./CategoryList";
import { FilterButton } from "./FilterButton";
import ThemeButton from "./ThemeButton";
import RecipeSearchBar from "./searchBar";
import UserModal from "./UserModal.js";
import { FilterModal } from "./FilterButton";
import { ShoppingListProvider } from "../context/shoppingListContext.js";
import ShoppingBagHeader from "./ShoppingBagHeader.js";
import Loading from "../loading.js";

const Header = ({ isAuthenticated, onLogout }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const toggleFilterModal = () => setIsFilterOpen((prev) => !prev);
  const toggleModal = () => setShowModal((prev) => !prev);

  useEffect(() => {
    // Fetch total recipes
    const fetchTotalRecipes = async () => {
      try {
        const response = await fetch("/api/recipes/total");
        if (!response.ok) throw new Error("Failed to fetch total recipes");
        const data = await response.json();
        setTotalRecipes(data.total);
      } catch (error) {
        console.error("Error fetching total recipes:", error);
      }
    };

    // Check favorite status
    const checkFavoriteStatus = async () => {
      try {
        const response = await fetch("/api/favorites/status");
        if (response.ok) {
          const data = await response.json();
          setIsFavorited(data.hasFavorites);
        }
      } catch (error) {
        console.error("Error checking favorite status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTotalRecipes();
    checkFavoriteStatus();
  }, []);

  const handleFavoriteClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    router.push('/favorites');
  };

  return (
    <header className="bg-[#f9efd2] dark:bg-gray-950 top-0 z-50">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <div className="flex space-x-8">
            <Link
              href="/"
              className="block text-[ #020123] hover:text-[#fc9d4f] font-medium py-2 uppercase "
            >
              Recipes
            </Link>
            <Link
              href=""
              className="block text-[ #020123] hover:text-[#fc9d4f] font-medium py-2 uppercase"
            >
              Recommended
            </Link>
            <Link
              href=""
              className="block text-[ #020123] hover:text-[#fc9d4f] font-medium py-2 uppercase "
            >
              Favourite
            </Link>
          </div>

           <Link href="/" className="flex items-center">
            <Image
              src="/0.png"
              alt="Logo"
              width={150}
              height={100}
              className="h-20 w- "
            />
          </Link>

          <div className="flex items-center space-x-8">
            <Suspense fallback={<Loading />}>
              <CategoryList
                totalRecipes={totalRecipes}
                onCategoryChange={() => {}}
              />
            </Suspense>
            <FilterButton onClick={toggleFilterModal} />

            <button
              onClick={toggleModal}
              className="text-[#020123] dark:text-white hover:text-[#fc9d4f]"
            >
              <FaUser className="w-5 h-5" />
            </button>

            {/* Authentication Modal */}
            <UserModal show={showModal} onClose={toggleModal} />
            <ShoppingListProvider>
            <ShoppingBagHeader />
          </ShoppingListProvider>
            <ThemeButton />
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white border-t transition-all duration-300 ${
          isDropdownOpen ? 'max-h-screen py-4' : 'max-h-0 overflow-hidden'
        }`}
      >
        <div className="container mx-auto px-4 space-y-4">
          <Link
            href="/recipes"
            className="block text-[ #020123] hover:text-[#fc9d4f] font-medium py-2"
          >
            Recipes
          </Link>
          <Link
            href="/Recomended"
            className="block text-[#020123] hover:text-[#fc9d4f] font-medium py-2"
          >
            Recommended
          </Link>
          <Link
            href="/Favourite"
            className="block text-[#020123] hover:text-[#fc9d4f] font-medium py-2"
          >
            Favourites
          </Link>
          <div className="py-2">
            <Suspense fallback={<Loading />}>
              <CategoryList
                totalRecipes={totalRecipes}
                onCategoryChange={() => {}}
              />
            </Suspense>
            
          </div>
          <div className="py-2">
            <FilterButton onClick={() => setIsFilterOpen(!isFilterOpen)} />
          </div>
        </div>
      </div>


      {/* Modals */}
      {isFilterOpen && <FilterModal onClose={() => setIsFilterOpen(false)} />}
      <RecipeSearchBar />
      <UserModal show={showModal} onClose={() => setShowModal(false)} />
     
    </header>
  );
};

export default Header;