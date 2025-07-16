import { useState } from "react";
import { NavLink } from "react-router-dom";
import shsLogo from "../../assets/images/shs-logo.png";

function NavigationBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `px-6 py-3 text-base font-medium rounded-2xl transition-all duration-200 ${
      isActive
        ? "bg-[#7C0F0F] text-white shadow-md"
        : "text-black hover:bg-[#7C0F0F] hover:text-white hover:shadow-md"
    }`;

  const authLinkClass = ({ isActive }) =>
    `px-6 py-3 text-base font-medium rounded-2xl transition-all duration-200 ${
      isActive
        ? "bg-[#7C0F0F] text-white shadow-md"
        : "text-black hover:bg-[#7C0F0F] hover:text-white hover:shadow-md"
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `block px-3 py-2 rounded-lg transition-colors ${
      isActive
        ? "bg-[#7C0F0F] text-white"
        : "text-[#7C0F0F] hover:bg-[#7C0F0F]/10"
    }`;

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <nav className="w-full bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-2 py-3 md:px-3 md:py-3">
        
        {/* Logo Section */}
        <div className="flex items-center gap-1 md:gap-2">
          <img src={shsLogo} alt="logo" className="w-8 md:w-14" />
          <span 
            className="text-[#7C0F0F] uppercase font-bold text-xl md:text-3xl tracking-tighter" 
            style={{ fontFamily: 'Koulen, sans-serif' }}
          >
            Sequoia
          </span>
        </div>

        {/* Desktop Navigation - Centered - Hidden at smaller desktop sizes when items would overlap */}
        <div className="hidden xl:flex xl:absolute xl:left-1/2 xl:transform xl:-translate-x-1/2">
          <ul 
            className="flex flex-row items-center gap-3" 
            style={{ fontFamily: 'Koh Santepheap, serif' }}
          >
            <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
            <li><NavLink to="/foster" className={navLinkClass}>Foster</NavLink></li>
            <li><NavLink to="/volunteer" className={navLinkClass}>Volunteer</NavLink></li>
            <li><NavLink to="/adopt" className={navLinkClass}>Adopt</NavLink></li>
            <li><NavLink to="/match" className={navLinkClass}>Match</NavLink></li>
          </ul>
        </div>

        {/* Desktop Auth Links - Right - Hidden at smaller desktop sizes */}
        <div className="hidden xl:flex">
          <ul 
            className="flex flex-row items-center gap-3" 
            style={{ fontFamily: 'Koh Santepheap, serif' }}
          >
            <li><NavLink to="/sign-in" className={authLinkClass}>Sign In</NavLink></li>
            <li><NavLink to="/register" className={authLinkClass}>Register</NavLink></li>
          </ul>
        </div>

        {/* Hamburger Menu Button - Shows on mobile and for when desktop items overlap while zooming in on site */}
        <button
          className="xl:hidden p-2 rounded-sm cursor-pointer focus:outline-none hover:bg-[#7C0F0F]/10 transition-colors duration-200"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <div className="w-5 h-5 flex flex-col justify-center items-center">
            <span className={`block w-full h-0.5 bg-[#7C0F0F] transition-all duration-300 ${
              menuOpen ? 'rotate-45 translate-y-1' : ''
            }`} />
            <span className={`block w-full h-0.5 bg-[#7C0F0F] transition-all duration-300 my-1 ${
              menuOpen ? 'opacity-0' : ''
            }`} />
            <span className={`block w-full h-0.5 bg-[#7C0F0F] transition-all duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-1' : ''
            }`} />
          </div>
        </button>
      </div>

      {/* Mobile/Responsive Navigation Menu */}
      <div className={`
        xl:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-lg 
        transform transition-transform duration-300 ease-in-out z-50
        ${menuOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex justify-end p-4 bg-white border-b border-gray-100">
          <button
            onClick={closeMenu}
            className="p-2 rounded focus:outline-none hover:bg-[#7C0F0F]/10 transition-colors duration-200 cursor-pointer"
            aria-label="Close navigation"
          >
            <svg
              className="w-6 h-6 text-[#7C0F0F] hover:text-[#7C0F0F]/80 transition-colors duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        
        {/* Scrollable Mobile Navigation Links Container */}
        <div className="h-full overflow-y-auto pb-20">
          <div className="px-4 py-6">
            <ul 
              className="flex flex-col items-center gap-4" 
              style={{ fontFamily: 'Koh Santepheap, serif' }}
            >
              <li><NavLink to="/" className={mobileNavLinkClass}>Home</NavLink></li>
              <li><NavLink to="/foster" className={mobileNavLinkClass}>Foster</NavLink></li>
              <li><NavLink to="/volunteer" className={mobileNavLinkClass}>Volunteer</NavLink></li>
              <li><NavLink to="/donate" className={mobileNavLinkClass}>Donate</NavLink></li>
              <li><NavLink to="/adopt" className={mobileNavLinkClass}>Adopt</NavLink></li>
              <li><NavLink to="/match" className={mobileNavLinkClass}>Match</NavLink></li>
              <li><NavLink to="/sign-in" className={mobileNavLinkClass}>Sign In</NavLink></li>
              <li><NavLink to="/register" className={mobileNavLinkClass}>Register</NavLink></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;