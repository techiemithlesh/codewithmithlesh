import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="container">
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-2 lg:px-2">
          <div className="relative flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-left">
              <Link to="/" className="text-white text-xl font-bold">
                CODEWITHMITHLESH
              </Link>
            </div>

            {/* Nav Links for Desktop */}
            <div className="hidden md:flex space-x-4 items-center">
              <Link to="/blogs" className="text-gray-300 hover:text-white">
                Blogs
              </Link>
              <Link to="/courses" className="text-gray-300 hover:text-white">
                Courses
              </Link>
              <Link to="/notes" className="text-gray-300 hover:text-white">
                Notes
              </Link>
              <Link to="/contact" className="text-gray-300 hover:text-white">
                Contact
              </Link>

              {/* Hire Me Button for Desktop */}
              <Link
                to="/hire-me"
                className="ml-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500"
              >
                Hire Me
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-300 hover:text-white focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={
                      isOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              <Link
                to="/blogs"
                className="block text-gray-300 hover:text-white"
              >
                Blogs
              </Link>
              <Link
                to="/courses"
                className="block text-gray-300 hover:text-white"
              >
                Courses
              </Link>
              <Link
                to="/notes"
                className="block text-gray-300 hover:text-white"
              >
                Notes
              </Link>

              <Link
                to="/contact"
                className="block text-gray-300 hover:text-white"
              >
                Contact
              </Link>

              {/* Hire Me Button for Mobile */}
              <Link
                to="/hire-me"
                className="block mt-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500 text-center"
              >
                Hire Me
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
