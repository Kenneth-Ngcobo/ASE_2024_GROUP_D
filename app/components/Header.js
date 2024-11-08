"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import CategoryList from "./CategoryList";
import FilterButton from "./FilterButton";
import ThemeButton from "./ThemeButton";
import RecipeSearchBar from "./searchBar";
import UserModal from "./UserModal.js";

const Header = ({ isAuthenticated, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [totalRecipes, setTotalRecipes] = useState(0); // State to hold total recipes
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleFilterModal = () => {
    setIsFilterOpen((prev) => !prev); // Toggle modal open/close state
  };

  const toggleModal = () => setShowModal((prev) => !prev);

  useEffect(() => {
    // Fetch total recipes from API or state management
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
    fetchTotalRecipes();
  }, []);

  return (
    <header className="bg-gray-100 top-0 z-50">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <div className="hidden md:flex space-x-8">
            <Link
              href="/recipes"
              className="text-gray-600 hover:text-teal-500 font-medium uppercase text-sm"
            >
              Recipes
            </Link>
            <Link
              href="/Recomended"
              className="text-gray-600 hover:text-teal-500 font-medium uppercase text-sm"
            >
              Recomended
            </Link>
            <Link
              href="/Favourite"
              className="text-gray-600 hover:text-teal-500 font-medium uppercase text-sm"
            >
              Favourite
            </Link>
          </div>

          <Link href="/" className="flex items-center">
            <Image
              src="/Kwa.png"
              alt="Logo"
              width={150}
              height={60}
              className="h-10 w-auto "
            />
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <CategoryList
              totalRecipes={totalRecipes}
              onCategoryChange={() => {}}
            />
            <FilterButton onClick={toggleFilterModal} />

            {/* User Icon Toggle */}

            <button
              onClick={toggleModal}
              className="text-gray-600 hover:text-teal-500"
            >
              <FaUser className="w-5 h-5" />
            </button>

            {/* Authentication Modal */}
            <UserModal show={showModal} onClose={toggleModal} />
            <ThemeButton />

          </div>
          <button
            className="md:hidden text-gray-600"
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
        className={`md:hidden bg-white border-t transition-all duration-300 ${
          isDropdownOpen ? 'max-h-screen py-4' : 'max-h-0 overflow-hidden'
        }`}
      >
        <div className="container mx-auto px-4 space-y-4">
          <Link
            href="/recipes"
            className="block text-[#1e455c] hover:text-[#2b617f] font-medium py-2"
          >
            Recipes
          </Link>
          <Link
            href="/Recomended"
            className="block text-[#1e455c] hover:text-[#2b617f] font-medium py-2"
          >
            Recommended
          </Link>
          <Link
            href="/Favourite"
            className="block text-[#1e455c] hover:text-[#2b617f] font-medium py-2"
          >
            Favourites
          </Link>
          <div className="py-2">
            <CategoryList
              totalRecipes={totalRecipes}
              onCategoryChange={() => {}}
            />
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