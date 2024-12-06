"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, Suspense } from "react";

import { useRouter } from "next/navigation";
import CategoryList from "./ui/CategoryList.js";
import { FilterButton} from "../components/FilterButton.js";
import ThemeButton from "./ui/ThemeButton";
import RecipeSearchBar from "./ui/searchBar.js";
import UserModal from "./UserModal.js";
import { FilterModal } from "../components/FilterButton.js";
import Loading from "../loading.js";
import { FaUser, FaSearch, FaHeart, FaList, FaFilter } from "react-icons/fa";

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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleFilterModal = () => setIsFilterOpen((prev) => !prev);
  const toggleModal = () => setShowModal((prev) => !prev);
  const toggleSearch = () => setIsSearchOpen((prev) => !prev);

  return (
    <header className="sticky top-0 bg-[#f9efd2] dark:bg-[var(--background)] z-50 shadow-md">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <div className="hidden md:flex space-x-8 items-center">
            <Link
              href="/"
              className="block text-[#020123] dark:text-[var(--text)] hover:text-[#fc9d4f] dark:hover:text-[var(--secondary)] font-medium py-2 uppercase"
            >
              Recipes
            </Link>
            <Suspense fallback={<Loading />} >
              <CategoryList   
                totalRecipes={totalRecipes}
                onCategoryChange={() => {}}
           
              />
              <FilterButton 
               className=" text-[#020123] dark:bg-[var(--text)] hover:text-[#fc9d4f] dark:hover:text-[var(--secondary)] font-medium py-2 uppercase"
              onClick={toggleFilterModal} />
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
            <button
              onClick={toggleSearch}
              className="text-[#020123] dark:text-[var(--text)] hover:text-[#fc9d4f] dark:hover:text-[var(--secondary)]"
            >
              <FaSearch className="w-5 h-5" />
            </button>

            {/* Search bar */}
            {isSearchOpen && (
              <div className="absolute top-full left-0 w-full z-50">
                <RecipeSearchBar onClose={toggleSearch} />
              </div>
            )}

            <button
              onClick={toggleModal}
              className="text-[#020123] dark:text-[var(--text)] hover:text-[#fc9d4f] dark:hover:text-[var(--secondary)]"
            >
              <FaUser className="w-5 h-5" />
            </button>

            <Link
              href="/Favourite"
              className="text-[#020123] dark:text-[var(--text)] hover:text-[#fc9d4f] dark:hover:text-[var(--secondary)]"
            >
              <FaHeart className="w-5 h-5" />
            </Link>

            <Suspense fallback={<Loading />}></Suspense>

            <ThemeButton />
          </div>

          <button
            className="md:hidden text-gray-600 dark:text-[var(--text)]"
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

      {/* Mobile menu dropdown */}
      <div
        className={`md:hidden items-center justify-center bg-white dark:bg-[var(--background)] border-t transition-all duration-300 ${isDropdownOpen ? "max-h-24 py-2" : "max-h-0 overflow-hidden"}`}
      >
        <div className="container mx-auto px-4 space-y-4 flex flex-col items-start">
          <Link
            href="/"
            className="block text-[#020123] dark:text-[var(--text)] hover:text-[#fc9d4f] dark:hover:text-[var(--secondary)] font-medium py-2"
          >
            {/* Optional link for logo or home */}
          </Link>

          {/* Flex container for icons */}
          <div className="flex space-x-6 ">
            {/* Category icon with functionality */}
            <FaList
              className="w-5 h-5 text-black dark:text-[var(--text)] hover:text-[#fc9d4f] dark:hover:text-[var(--secondary)]"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)} 
            />
            {isCategoryOpen && (
              <CategoryList
                totalRecipes={totalRecipes}
                onCategoryChange={(category) => {}}
              />
            )}

            {/* Filter icon with functionality */}
            <FaFilter
              className="w-5 h-5 text-black dark:text-[var(--text)] hover:text-[#fc9d4f] dark:hover:text-[var(--secondary)]"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            />

            <button
              onClick={toggleSearch}
              className="text-[#020123] dark:text-[var(--text)] hover:text-[#fc9d4f] dark:hover:text-[var(--secondary)]"
            >
              <FaSearch className="w-5 h-5" />
            </button>

            {/* Search bar */}
            {isSearchOpen && (
              <div className="absolute top-full left-0 w-full z-50">
                <RecipeSearchBar onClose={toggleSearch} />
              </div>
            )}

            {/* User icon */}
            <button
              onClick={toggleModal}
              className="text-black dark:text-[var(--text)] hover:text-[#fc9d4f] dark:hover:text-[var(--secondary)]"
            >
              <FaUser className="w-5 h-5" />
            </button>

            {/* Favourite icon */}
            <Link
              href="/Favourite"
              className="text-black dark:text-[var(--text)] hover:text-[#fc9d4f] dark:hover:text-[var(--secondary)]"
            >
              <FaHeart className="w-5 h-5" />
            </Link>

            <ThemeButton />
          </div>

          <Suspense fallback={<Loading />}></Suspense>
        </div>
      </div>

      {/* Modals */}
      {isFilterOpen && <FilterModal onClose={() => setIsFilterOpen(false)} />}
      <UserModal show={showModal} onClose={() => setShowModal(false)} />
    </header>
  );
};

export default Header;
