"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, Suspense } from "react";
import { FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import CategoryList from "./CategoryList";
import {FilterButton} from "./FilterButton";
import ThemeButton from "./ThemeButton";
import RecipeSearchBar from "./searchBar";
import UserModal from "./UserModal.js";
import { FilterModal } from "./FilterButton";
import { ShoppingListProvider } from "../context/ShoppingListContext.js";
import ShoppingBagHeader from "./ShoppingBagHeader.js";
import Loading from "../loading.js";

const Header = ({ isAuthenticated, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [totalRecipes, setTotalRecipes] = useState(0); // State to hold total recipes
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleFilterModal = () => setIsFilterOpen((prev) => !prev);
  const toggleModal = () => setShowModal((prev) => !prev);


  return (
    <header className="bg-[#f9efd2] dark:bg-gray-950 top-0 z-50">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <div className="hidden md:flex space-x-8">
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
          <div className="hidden md:flex items-center space-x-8">
            {/* Wrapping CategoryList in Suspense */}
            <Suspense fallback={<Loading />}>
              <CategoryList
                totalRecipes={totalRecipes}
                onCategoryChange={() => {}}
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
            <UserModal show={showModal} onClose={toggleModal} />
            <ShoppingListProvider>
            <ShoppingBagHeader />
          </ShoppingListProvider>
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