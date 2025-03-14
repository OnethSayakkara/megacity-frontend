import { useState, useEffect } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FiPhone, FiMail, FiMapPin, FiMenu } from "react-icons/fi";
import logo from "../assets/images/logo.svg";
import { Link, useLocation } from "react-router-dom";
import StickyHeader from "./StickyHeader"; // Import StickyHeader

const Header = ({ scrollbar }) => {
  const location = useLocation();
  const [isSticky, setSticky] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (scrollbar) {
      const handleScroll = (status) => {
        if (status.offset.y > 100) {
          setSticky(true);
        } else {
          setSticky(false);
        }
      };
      scrollbar.addListener(handleScroll);
      return () => {
        scrollbar.removeListener(handleScroll);
      };
    }
  }, [scrollbar]);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".popup-container")) {
        setShowPopup(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Main Header */}
      <header className="w-full absolute top-0 left-0 z-50">
        {/* Top Bar */}
        <div className="bg-gray-100 text-md py-2 px-4 flex justify-between items-center font-medium font-grotesk text-slate-500">
          <span className="ml-16">Reliable Taxi Service & Transport Solutions!</span>
          <div className="flex space-x-4 mr-32 cursor-pointer">
          <a href="/login">Login</a>
            <a href="/signup">Sign Up</a>
            <span>FAQ</span>
            <div className="flex space-x-4 mt-1">
              <FaFacebookF className="text-gray-600 cursor-pointer" />
              <FaTwitter className="text-gray-600 cursor-pointer" />
              <FaInstagram className="text-gray-600 cursor-pointer" />
              <FaLinkedinIn className="text-gray-600 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Main Header Content */}
        <div className="flex justify-between items-center -space-y-10 h-28 pt-4 bg-white">
          {/* Logo */}
          <div>
            <img src={logo} alt="Logo" className="w-44 h-44 object-contain mb-5 ml-12" />
          </div>

          {/* Contact Info */}
          <div className="flex space-x-8 text-sm mr-36 font-roboto">
            <div className="flex items-center space-x-2">
              <FiPhone className="text-orange-500 text-3xl" />
              <div>
                <p className="text-gray-500">Call Us Now</p>
                <p className="font-grotesk font-bold text-lg">+9477 673 2675</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <FiMail className="text-orange-500 text-3xl" />
              <div>
                <p className="text-gray-500">Email Now</p>
                <p className="font-grotesk font-bold text-lg">megacity@gmail.Com</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <FiMapPin className="text-orange-500 text-3xl" />
              <div>
                <p className="text-gray-500">Halk Street</p>
                <p className="font-grotesk font-bold text-lg">Colombo 7, SL - 2386</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav
          className="bg-Orangepeel text-white w-[1100px] mx-auto flex justify-between items-center px-6 h-[55px] relative -mt-6 ml-[280px]"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 2% 100%)" }}
        >
          <div className="flex space-x-6 text-md font-semibold font-grotesk ml-5">
            <a className={`hover-underline ${location.pathname === "/" ? "active" : ""}`} href="/">Home</a>
            <a className={`hover-underline ${location.pathname === "/company" ? "active" : ""}`} href="#">Company</a>
            <a className={`hover-underline ${location.pathname === "/our-taxi" ? "active" : ""}`} href="#">Our Taxi</a>
            <a className={`hover-underline ${location.pathname === "/signup" ? "active" : ""}`} href="signup">Sign Up</a>
            <a className={`hover-underline ${location.pathname === "/blog" ? "active" : ""}`} href="#">Blog</a>
            <a className={`hover-underline ${location.pathname === "/contact" ? "active" : ""}`} href="contact">Contact</a>
          </div>
          <div className="relative popup-container">
            {/* Book a Taxi Button */}
            <button
              className="bg-zinc-900 w-[150px] -mr-6 py-4 "
              onClick={(e) => {
                e.stopPropagation(); // Prevents triggering document click event
                setShowPopup(!showPopup);
              }}
            >
              Book a Taxi
            </button>
          </div>
        </nav>

        {/* Pop-up Box (Outside the Navigation Bar) */}
        {showPopup && (
  <div
    className={`absolute top-[185px] right-[155px] bg-white shadow-lg w-48 
                transition-all duration-300 ease-out transform 
                ${showPopup ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"} z-50`}
    onMouseLeave={() => setShowPopup(false)}
  >
    <p className="text-gray-800 font-semibold font-grotesk hover:text-orange-500 cursor-pointer py-3 px-4 border-b border-gray-300">
      Ride Now
    </p>
    <p className="text-gray-800 font-semibold font-grotesk hover:text-orange-500 cursor-pointer py-3 px-4 border-b border-gray-300">
      Tours
    </p>
    <p className="text-gray-800 font-semibold font-grotesk hover:text-orange-500 cursor-pointer py-3 px-4">
      Airport
    </p>
  </div>
)}



      </header>

      {/* Conditionally Render Sticky Header */}
      {isSticky && <StickyHeader />}
    </>
  );
};

export default Header;
