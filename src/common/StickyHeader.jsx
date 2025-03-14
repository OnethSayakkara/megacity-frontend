// StickyHeader.jsx
import { FiMenu } from "react-icons/fi";
import logo from "../assets/images/logo.svg"; // Import the logo
import { useLocation } from "react-router-dom"; // Import useLocation for active link logic

const StickyHeader = () => {
  const location = useLocation(); // Get the current location

  return (
    <header className="sticky-header">
      {/* Simplified Sticky Header Content */}
      <div className="flex justify-between items-center bg-white shadow-md px-6 py-3 h-[80px]">
        {/* Logo - Positioned 140px from the left */}
        <div className="ml-[100px]">
          <img src={logo} alt="Logo" className="w-32 h-32 object-contain" />
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6 text-md font-semibold font-grotesk">
          <a
            className={`hover-underline ${location.pathname === "/" ? "active" : ""}`}
            href="/"
          >
            Home
          </a>
          <a
            className={`hover-underline ${location.pathname === "/company" ? "active" : ""}`}
            href="#"
          >
            Company
          </a>
          <a
            className={`hover-underline ${location.pathname === "/our-taxi" ? "active" : ""}`}
            href="#"
          >
            Our Taxi
          </a>
          <a
            className={`hover-underline ${location.pathname === "/pages" ? "active" : ""}`}
            href="#"
          >
            Pages
          </a>
          <a
            className={`hover-underline ${location.pathname === "/blog" ? "active" : ""}`}
            href="#"
          >
            Blog
          </a>
          <a
            className={`hover-underline ${location.pathname === "/contact" ? "active" : ""}`}
            href="contact"
          >
            Contact
          </a>
        </div>

        {/* Menu and Button - Positioned 140px from the right */}
        <div className="flex items-center space-x-4 mr-[100px]">
          <FiMenu className="text-gray-600 cursor-pointer text-3xl" />
          <button className="bg-zinc-900 px-8 font-grotesk py-3 text-white">
            Book a Taxi
          </button>
        </div>
      </div>
    </header>
  );
};

export default StickyHeader;