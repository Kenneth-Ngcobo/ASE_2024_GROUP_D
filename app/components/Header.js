"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, Suspense } from "react";
import { FaUser, FaCaretDown } from "react-icons/fa";
import { PiHeart } from "react-icons/pi";
import { useRouter } from "next/navigation";
import CategoryList from "./ui/CategoryList.js";
import { FilterButton } from "./filter-sort/FilterButton.js";
import ThemeButton from "./ui/ThemeButton";
import RecipeSearchBar from "./ui/searchBar.js";
import UserModal from "./UserModal.js";
import { FilterModal } from "./filter-sort/FilterButton.js";
import { ShoppingListProvider } from "../context/ShoppingListContext.js";
import ShoppingBagHeader from "../components/shopping-list/ShoppingBagHeader.js"
import Loading from "../loading.js";

/**
 * Header component renders the navigation bar, including the logo, links, 
 * category list, user modal, shopping bag, and theme button.
 * It also handles user authentication and dropdown menu visibility.
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isAuthenticated - Flag to indicate if the user is authenticated
 * @param {function} props.onLogout - Callback to handle user logout
 * 
 * @returns {JSX.Element} The header component
 * 
 * @component
 * @example
 * // Usage:
 * <Header isAuthenticated={true} onLogout={handleLogout} />
 */
const Header = ({ isAuthenticated, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [favoriteDetails, setFavoriteDetails] = useState([]);
  const [favoritesDropdownVisible, setFavoritesDropdownVisible] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleFilterModal = () => setIsFilterOpen((prev) => !prev);
  const toggleModal = () => setShowModal((prev) => !prev);

  // Fetch favorites when component mounts
  useEffect(() => {
    const fetchFavorites = async () => {
      const loggedInEmail = localStorage.getItem('loggedInUserEmail');
      if (!loggedInEmail) {
        return;
      }
  
      try {
        const response = await fetch(`/api/favorites?email=${encodeURIComponent(loggedInEmail)}`, {
          credentials: 'include',
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch favorites');
        }
  
        const data = await response.json();
        setFavoriteDetails(data.favorites);
      } catch (err) {
        setError('Failed to load favorites. Please try again later.');
        console.error('Error fetching favorites:', err);
      }
    };
  
    fetchFavorites();
  }, []);
  return (
    <header className=" sticky top-0 bg-[#f9efd2] dark:bg-gray-950 z-50 shadow-md">
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

            {/* Favorites Section */}
            <Link href="/favorites" className="flex items-center text-[#020123] hover:text-[#fc9d4f] font-medium py-2 uppercase">
              <PiHeart className="mr-2" size={20} />
              <span>Favorites ({favoriteDetails.length})</span>
            </Link>

            
          </div>

          <Link href="/" className="flex items-center">
            <Image
              src="/0.png"
              alt="Logo"
              width={150}
              height={100}
              className="h-20 w-"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {/* Wrapping CategoryList in Suspense */}
            <Suspense fallback={<Loading />}>
              <CategoryList
                totalRecipes={totalRecipes}
                onCategoryChange={() => { }}
              />
            </Suspense>
            <FilterButton onClick={toggleFilterModal} />

            {/* User Icon Toggle */}
            <button
              onClick={toggleModal}
              className="text-[#020123] dark:text-white hover:text-[#fc9d4f]"
            >
              <FaUser className="w-5 h-5" />
            </button>

            {/* Authentication Modal */}
            <Suspense fallback={<Loading />}>
              <ShoppingListProvider>
                <ShoppingBagHeader />
              </ShoppingListProvider>
            </Suspense>

            <UserModal show={showModal} onClose={toggleModal} />

            <ThemeButton />
          </div>
          <button
            className="md:hidden text-gray-600 dark:text-white"
            onClick={toggleDropdown}
            aria-label="Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white border-t transition-all duration-300 ${isDropdownOpen ? 'max-h-screen py-4' : 'max-h-0 overflow-hidden'
          }`}
      >
        <div className="container mx-auto px-4 space-y-4">
          <Link
            href="/recipes"
            className="block text-[#020123] hover:text-[#fc9d4f] font-medium py-2"
          >
            Recipes
          </Link>
          <Link
            href="/Recomended"
            className="block text-[#020123] hover:text-[#fc9d4f] font-medium py-2"
          >
            Recommended
          </Link>

          {/* Favorites Section */}
          <Link href="/favorites" className="flex items-center text-[#020123] hover:text-[#fc9d4f] font-medium py-2">
            <PiHeart className="mr-2" size={20} />
            <span>Favorites ({favoriteDetails.length})</span>
          </Link>

          <div className="py-2">
            <Suspense fallback={<Loading />}>
              <CategoryList
                totalRecipes={totalRecipes}
                onCategoryChange={() => { }}
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
      <ShoppingListProvider>
        <ShoppingBagHeader />
      </ShoppingListProvider>

    </header>
  );
};

export default Header;