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
    <header className="bg-gray-100 dark:bg-gray-950 top-0 z-50">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <div className="flex space-x-8">
            <Link
              href="/recipes"
              className="text-gray-600 dark:text-white hover:text-teal-500 font-medium uppercase text-sm"
            >
              Recipes
            </Link>
            <Link
              href="/Recomended"
              className="text-gray-600 dark:text-white hover:text-teal-500 font-medium uppercase text-sm"
            >
              Recommended
            </Link>
            <button
              onClick={handleFavoriteClick}
              className="flex items-center text-gray-600 dark:text-white hover:text-teal-500 font-medium uppercase text-sm"
            >
              {isLoading ? (
                <div className="w-5 h-5 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-full" />
              ) : (
                <>
                  {isFavorited ? (
                    <FaHeart className="w-5 h-5 text-red-500 mr-2" />
                  ) : (
                    <FaRegHeart className="w-5 h-5 mr-2" />
                  )}
                  Favorites
                </>
              )}
            </button>
          </div>

          <Link href="/" className="flex items-center">
            <Image
              src="/Kwa.png"
              alt="Logo"
              width={150}
              height={60}
              className="h-10 w-auto"
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
              className="text-gray-600 dark:text-white hover:text-teal-500"
            >
              <FaUser className="w-5 h-5" />
            </button>

            <ThemeButton />
          </div>
        </nav>
      </div>

      {/* Modals */}
      {isFilterOpen && <FilterModal onClose={() => setIsFilterOpen(false)} />}
      <RecipeSearchBar />
      <UserModal show={showModal} onClose={toggleModal} />
    </header>
  );
};

export default Header;