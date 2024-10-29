import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          {/* Logo and Social Links */}
          <div className="mb-4 md:mb-0">
            <Link to="/" className="text-white text-2xl font-bold">
              CodeWithMithlesh
            </Link>
          </div>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>

        {/* Links Section */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-600 pt-6">
          <div className="mb-4 md:mb-0">
            <Link to="/blogs" className="text-gray-400 hover:text-white mx-2">
              Blogs
            </Link>
            <Link to="/courses" className="text-gray-400 hover:text-white mx-2">
              Courses
            </Link>
            <Link to="/about" className="text-gray-400 hover:text-white mx-2">
              About
            </Link>
            <Link to="/contact" className="text-gray-400 hover:text-white mx-2">
              Contact
            </Link>
            <Link to="/privacy" className="text-gray-400 hover:text-white mx-2">
              Privacy Policy
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} ALL RIGHTS RESERVED |
            CODEWITHMITHLESH.COM
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
