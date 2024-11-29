"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, Suspense } from "react";
import { FaUser, FaCaretDown } from "react-icons/fa";
import { PiHeart } from "react-icons/pi";
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [favoriteDetails, setFavoriteDetails] = useState([]);
  const [error, setError] = useState(null);

  const router = useRouter();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleFilterModal = () => setIsFilterOpen((prev) => !prev);
  const toggleModal = () => setShowModal((prev) => !prev);

  useEffect(() => {
    const fetchFavorites = async () => {
      const loggedInEmail = localStorage.getItem("loggedInUserEmail");
      if (!loggedInEmail) {
        return;
      }

      try {
        const response = await fetch(`/api/favorites?email=${encodeURIComponent(loggedInEmail)}`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch favorites");
        }

        const data = await response.json();
        setFavoriteDetails(data.favorites);
      } catch (err) {
        setError("Failed to load favorites. Please try again later.");
        console.error("Error fetching favorites:", err);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <header className="sticky top-0 bg-[#f9efd2] dark:bg-gray-950 z-50 shadow-md">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <div className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="block text-[#020123] hover:text-[#fc9d4f] font-medium py-2 uppercase"
            >
              Recipes
            </Link>
            <Link
              href=""
              className="block text-[#020123] hover:text-[#fc9d4f] font-medium py-2 uppercase"
            >
              Recommended
            </Link>

            <Link href="/favorites" className="flex items-center text-[#020123] hover:text-[#fc9d4f] font-medium py-2 uppercase">
              <PiHeart className="mr-2" size={20} />
              <span>Favorites ({favoriteDetails.length})</span>
            </Link>
          </div>

          <Link href="/" className="flex items-center">
            <Image src="/0.png" alt="Logo" width={150} height={100} className="h-20 w-auto" />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Suspense fallback={<Loading />}>
              <CategoryList totalRecipes={totalRecipes} onCategoryChange={() => {}} />
            </Suspense>
            <FilterButton onClick={toggleFilterModal} />
            <button onClick={toggleModal} className="text-[#020123] dark:text-white hover:text-[#fc9d4f]">
              <FaUser className="w-5 h-5" />
            </button>
            <ShoppingListProvider>
              <ShoppingBagHeader />
            </ShoppingListProvider>
            <UserModal show={showModal} onClose={toggleModal} />
            <ThemeButton />
          </div>
        </nav>
      </div>

      <RecipeSearchBar />
      {isFilterOpen && <FilterModal onClose={() => setIsFilterOpen(false)} />}
    </header>
  );
};

export default Header;
