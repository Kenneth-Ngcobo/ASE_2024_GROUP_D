'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, Suspense } from 'react';
import { FaUser, FaShoppingBag, FaHeart, FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import CategoryList from './ui/CategoryList.js';
import { FilterButton } from './filter-sort/FilterButton.js';
import ThemeButton from './ui/ThemeButton';
import RecipeSearchBar from './ui/searchBar.js';
import UserModal from './UserModal.js';
import { FilterModal } from './filter-sort/FilterButton.js';
import Loading from '../loading.js';

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
  const [totalRecipes, setTotalRecipes] = useState(0); // State to hold total recipes
  const [showModal, setShowModal] = useState(false);
  const [shoppingListCount, setShoppingListCount] = useState(0); // State for shopping list count
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleFilterModal = () => setIsFilterOpen((prev) => !prev);
  const toggleModal = () => setShowModal((prev) => !prev);

  /**
   * Fetches the shopping list items from the API and updates the shopping list count state.
   * @async
   */
 /* useEffect(() => {
    const fetchShoppingList = async () => {
      try {
        const response = await fetch('/api/shopping_lists');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success) {
          setShoppingListCount(data.data.length); // Update the shopping list count
        } else {
          throw new Error('Failed to fetch shopping list');
        }
      } catch (error) {
        console.error('Error fetching shopping list:', error);
      }
    };

    fetchShoppingList();
  }, []);*/

  const toggleSearch = () => setIsSearchOpen((prev) => !prev);

  return (
    <header className="sticky top-0 bg-[#f9efd2] dark:bg-gray-950 z-50 shadow-md">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <div className="hidden md:flex space-x-8 items-center">
            <Link
              href="/"
              className="block text-[#020123] hover:text-[#fc9d4f] font-medium py-2 uppercase"
            >
              Recipes
            </Link>
            <Link
              href="/recommended"
              className="block text-[#020123] hover:text-[#fc9d4f] font-medium py-2 uppercase"
            >
              Recommended
            </Link>
            <Link
              href="/favourites"
              className="block text-[#020123] hover:text-[#fc9d4f] font-medium py-2 uppercase"
            >
              Favourites
            </Link>
            <Suspense fallback={<Loading />}>
              <CategoryList
                totalRecipes={totalRecipes}
                onCategoryChange={() => {}}
              />
              <FilterButton onClick={toggleFilterModal} />
            </Suspense>
          </div>

          <Link href="/" className="flex items-center justify-center">
            <Image
              src="/0.png"
              alt="Logo"
              width={150}
              height={100}
              className="h-20 w-"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Suspense fallback={<Loading />}>
              <CategoryList
                totalRecipes={totalRecipes}
                onCategoryChange={() => { }}
              />
            </Suspense>
            <FilterButton onClick={toggleFilterModal} />
            <button
              onClick={toggleSearch}
              className="text-[#020123] dark:text-white hover:text-[#fc9d4f]"
            >
              <FaSearch className="w-5 h-5" />
            </button>

            <button
              onClick={toggleModal}
              className="text-[#020123] dark:text-white hover:text-[#fc9d4f]"
            >
              <FaUser className="w-5 h-5" />
            </button>

            <Link
              href="/Favourite"
              className="text-[#020123] dark:text-white hover:text-[#fc9d4f]"
            >
              <FaHeart className="w-5 h-5" />
            </Link>

            <Suspense fallback={<Loading />}></Suspense>

            <ThemeButton />

            <Link href="/shopping-list" className="relative">
              <FaShoppingBag className="w-5 h-5 text-[#020123] dark:text-white hover:text-[#fc9d4f]" />
              {shoppingListCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {shoppingListCount}
                </span>
              )}
            </Link>
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

      <div
        className={`md:hidden bg-white border-t transition-all duration-300 ${
          isDropdownOpen ? "max-h-screen py-4" : "max-h-0 overflow-hidden"
        }`}
      >
        <div className="container mx-auto px-4 space-y-4">
          <Link
            href="/recipes"
            className="block text-[#020123] hover:text-[#fc9d4f] font-medium py-2"
          >
            Recipes
          </Link>
          <Suspense fallback={<Loading />}>
            <CategoryList
              totalRecipes={totalRecipes}
              onCategoryChange={() => {}}
            />
            <div className="py-2">
              <FilterButton onClick={() => setIsFilterOpen(!isFilterOpen)} />
            </div>
          </Suspense>
        </div>
      </div>

      {/* Modals */}
      {isFilterOpen && <FilterModal onClose={() => setIsFilterOpen(false)} />}
      <UserModal show={showModal} onClose={() => setShowModal(false)} />

      {/* Search Bar Conditionally Rendered */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 w-full z-50">
          <RecipeSearchBar onClose={toggleSearch} />
        </div>
      )}
    </header>
  );
};

export default Header;
