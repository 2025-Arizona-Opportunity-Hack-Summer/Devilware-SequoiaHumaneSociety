import { useState } from "react";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#7C0F0F] text-white text-center py-4">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-4">
        <div className="mb-2 sm:mb-0">
          &copy; {new Date().getFullYear()} Sequoia Humane Society. All rights reserved.
        </div>
        <div className="space-x-4">
          <NavLink to="/" className="hover:underline">
            Home
          </NavLink>
          <NavLink to="/adopt" className="hover:underline">
            Adopt
          </NavLink>
          <NavLink to="/volunteer" className="hover:underline">
            Volunteer
          </NavLink>
          <NavLink to="/foster" className="hover:underline">
            Foster
          </NavLink>
          <NavLink to="/contact" className="hover:underline">
            Contact
          </NavLink>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
