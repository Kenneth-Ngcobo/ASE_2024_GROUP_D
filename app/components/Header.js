"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaUser, FaShoppingBag } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import CategoryList from './CategoryList';
import FilterButton from './FilterButton'
import ThemeButton from './ThemeButton';

const Header = ({ isAuthenticated, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [totalRecipes, setTotalRecipes] = useState(0); // State to hold total recipes
  const router = useRouter();

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const toggleFilterModal = () => {
        setIsFilterOpen((prev) => !prev); // Toggle modal open/close state
    };

  useEffect(() => {
    // Fetch total recipes from API or state management
    const fetchTotalRecipes = async () => {
      try {
        const response = await fetch('/api/recipes/total');
        if (!response.ok) throw new Error('Failed to fetch total recipes');
        const data = await response.json();
        setTotalRecipes(data.total);
      } catch (error) {
        console.error('Error fetching total recipes:', error);
      }
    };
    fetchTotalRecipes();
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <div className="hidden md:flex space-x-8">
            <Link href="/recipes" className="text-gray-600 hover:text-teal-500 font-medium uppercase text-sm">
              Recipes
            </Link>
            <Link href="/Recomended" className="text-gray-600 hover:text-teal-500 font-medium uppercase text-sm">
              Recomended
            </Link>
            <Link href="/Favourite" className="text-gray-600 hover:text-teal-500 font-medium uppercase text-sm">
              Favourite
            </Link>
          </div>
          <Link href="/" className="flex items-center">
            <Image
              src="/Kwa.png"
              alt="Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
          <div className="hidden md:flex items-center space-x-8">
                      <CategoryList totalRecipes={totalRecipes} onCategoryChange={() => { }} />
                      <FilterButton onClick={toggleFilterModal} />  
            <Link href="/account" className="text-gray-600 hover:text-teal-500">
              <FaUser className="w-5 h-5" />
            </Link>
            <Link href="/cart" className="text-gray-600 hover:text-teal-500">
              <FaShoppingBag className="w-5 h-5" />
            </Link>
          </div>
          <button
            className="md:hidden text-gray-600"
            onClick={toggleDropdown}
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </nav>
      </div>
      <div className="border-t border-gray-200">
        <div className="container mx-auto px-4 py-3">
          {/* Add any additional content for the search bar or other elements here */}
        </div>
          </div>
          {isFilterOpen && <FilterModal onClose={toggleFilterModal} />}
    </header>
  );
};

export default Header;

