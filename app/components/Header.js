"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  FaHome,
  FaUtensils,
  FaInfoCircle,
  FaPhoneAlt,
  FaChevronDown,
  FaUserAlt,
} from "react-icons/fa";
import { FilterModal, FilterButton } from "./FilterButton.js";
import ThemeButton from "./ThemeButton.js";
import UserModal from "./UserModal.js";

/**
 * Header Component
 * Extended to support:
 * - Dropdown menus for mobile navigation
 * - Dynamic login/logout links based on authentication status
 * - Enhanced styling and user experience improvements
 */
export default function Header({}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Toggle mobile dropdown menu
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleModal = () => setShowModal((prev) => !prev);
  return (
    <header className="bg-gradient-to-r from-green-600 via-green-300 to-green-100 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo Section */}
        <Link href="/" className="flex items-center">
          <Image
            src="/Kwa.png"
            alt="Logo"
            width={100}
            height={80}
            className="mr-2"
          />
          <span className="text-3xl font-bold tracking-tight text-white font-lobster">
            <h1></h1>
          </span>
        </Link>

        {/* Navigation Links for Desktop */}
        <nav className="hidden md:flex space-x-6">
          <Link
            href="/"
            className="flex items-center px-4 py-2 rounded-full text-grey font-medium hover:bg-green-500 hover:bg-opacity-80 transition-colors duration-300"
          >
            <FaHome className="mr-2" /> Home
          </Link>
          <div className="flex items-center px-4 py-2 rounded-full text-grey font-medium hover:bg-green-500 hover:bg-opacity-80 transition-colors duration-300">
            <FaUtensils className="mr-2" /> Recipes
          </div>
          <div className="flex items-center px-4 py-2 rounded-full text-grey font-medium hover:bg-green-500 hover:bg-opacity-80 transition-colors duration-300">
            <FaInfoCircle className="mr-2" /> About Us
          </div>
          <div className="flex items-center px-4 py-2 rounded-full text-grey font-medium hover:bg-green-500 hover:bg-opacity-80 transition-colors duration-300">
            <FaPhoneAlt className="mr-2" /> Contact
          </div>
          <div className="flex items-center px-4 py-2 rounded-full text-grey font-medium hover:bg-green-500 hover:bg-opacity-80 transition-colors duration-300">
            <ThemeButton /> Theme
          </div>
        </nav>

        {/* User Icon Toggle */}
        <div className="relative hidden md:block">
          <button
            onClick={toggleModal}
            className="flex items-center px-4 py-2 rounded-full text-grey font-medium hover:bg-green-500 hover:bg-opacity-80 transition-colors duration-300"
          >
            <FaUserAlt className="mr-2" />
          </button>
        </div>

        {/* Authentication Modal */}
        <UserModal show={showModal} onClose={toggleModal} />

        {/* Filter Button and Modal */}
        <div className="flex items-center">
          <FilterButton onClick={() => setIsFilterOpen(true)} />
          {isFilterOpen && (
            <FilterModal onClose={() => setIsFilterOpen(false)} />
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={toggleDropdown}
            aria-label="Open Menu"
          >
            <FaChevronDown
              className={`w-6 h-6 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Dropdown Menu for Mobile */}
      {isDropdownOpen && (
        <div className="md:hidden bg-green-200 text-gray-900 p-4 rounded-b-lg shadow-lg">
          <Link
            href="/"
            className="block px-4 py-2 rounded text-grey hover:bg-green-500 hover:bg-opacity-80 transition-colors duration-300"
            onClick={() => setIsDropdownOpen(false)}
          >
            Home
          </Link>
          <div
            className="block px-4 py-2 rounded text-grey hover:bg-green-500 hover:bg-opacity-80 transition-colors duration-300"
            onClick={() => setIsDropdownOpen(false)}
          >
            Recipes
          </div>
          <div
            className="block px-4 py-2 rounded text-grey hover:bg-green-500 hover:bg-opacity-80 transition-colors duration-300"
            onClick={() => setIsDropdownOpen(false)}
          >
            About Us
          </div>
          <div
            className="block px-4 py-2 rounded text-grey hover:bg-green-500 hover:bg-opacity-80 transition-colors duration-300"
            onClick={() => setIsDropdownOpen(false)}
          >
            Contact
          </div>
        </div>

      )}
    </header>
  );

}
