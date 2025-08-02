import { withAuthInfo } from "@propelauth/react";
import { useLogoutFunction } from "@propelauth/react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";

import { userSlice } from "../../../store/slices/UserInfoSlice";

import shsLogo from "../../../assets/images/shs-logo.png";

import SessionStorage from "../../../utils/sessionStorage";
import "./NavigationBar.css";

export default withAuthInfo(function NavigationBar({ isLoggedIn, user, userClass }) {
  const userInfo = useSelector((store) => store[userSlice.name]);
  console.log(userInfo);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const logout = useLogoutFunction();

  const navLinkClass = ({ isActive }) =>
    `px-6 py-3 text-base font-medium rounded-2xl transition-all duration-200 ${
      isActive ? "bg-[#7C0F0F] text-white shadow-md" : "text-black hover:bg-[#7C0F0F] hover:text-white hover:shadow-md"
    }`;

  const authLinkClass = ({ isActive }) =>
    `px-6 py-3 text-base font-medium rounded-2xl transition-all duration-200 ${
      isActive ? "bg-[#7C0F0F] text-white shadow-md" : "text-black hover:bg-[#7C0F0F] hover:text-white hover:shadow-md"
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `block px-3 py-2 rounded-lg transition-colors ${
      isActive ? "bg-[#7C0F0F] text-white" : "text-[#7C0F0F] hover:bg-[#7C0F0F]/10"
    }`;

  useEffect(() => {
    if (userClass !== null && userClass.getOrgs().length > 0) {
      setIsAdmin((prev) => true);
    }
  }, [user]);

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleProfile = () => setProfileOpen((prev) => !prev);

  const onClickLogout = () => {
    SessionStorage.clear();
    Cookies.remove("email-auth");
    logout(true);
  };

  return (
    <nav className="w-full bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-2 py-3 md:px-3 md:py-3">
        {/* Logo Section */}
        <div className="flex items-center gap-1 md:gap-2">
          <img src={shsLogo} alt="logo" className="w-8 md:w-14" />
          <span
            className="text-[#7C0F0F] uppercase font-bold text-xl md:text-3xl tracking-tighter"
            style={{ fontFamily: "Koulen, sans-serif" }}>
            Sequoia
          </span>
        </div>

        {/* Desktop Navigation - Centered - Hidden at smaller desktop sizes when items would overlap */}
        <div className="hidden xl:flex xl:absolute xl:left-1/2 xl:transform xl:-translate-x-1/2">
          <ul className="flex flex-row items-center gap-3" style={{ fontFamily: "Koh Santepheap, serif" }}>
            {isAdmin && (
              <li>
                <NavLink to="/petadmin" className={navLinkClass}>
                  Pet Admin
                </NavLink>
              </li>
            )}
            <li>
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/foster" className={navLinkClass}>
                Foster
              </NavLink>
            </li>
            <li>
              <NavLink to="/volunteer" className={navLinkClass}>
                Volunteer
              </NavLink>
            </li>
            <li>
              <NavLink to="/adopt" className={navLinkClass}>
                Adopt
              </NavLink>
            </li>
            <li>
              <NavLink to="/match" className={navLinkClass}>
                Match
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Desktop Auth Links - Right - Hidden at smaller desktop sizes */}
        {!isLoggedIn && (
          <div className="hidden xl:flex">
            <ul className="flex flex-row items-center gap-3" style={{ fontFamily: "Koh Santepheap, serif" }}>
              <li>
                <NavLink to="/sign-in" className={authLinkClass}>
                  Sign In
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" className={authLinkClass}>
                  Register
                </NavLink>
              </li>
            </ul>
          </div>
        )}
        {isLoggedIn && (
          <div className="hidden xl:flex flex-col relative items-center">
            <div className="flex items-center gap-2">
              {!isAdmin && (
                <Link to="/favorite">
                  <HeartSVG />
                </Link>
              )}
              <button
                style={{ fontFamily: "Koh Santepheap, serif" }}
                className="bg-[#7C0F0F] p-2 rounded-md cursor-pointer"
                onClick={toggleProfile}>
                <UserSVG />
              </button>
            </div>
            {profileOpen && (
              <div className="absolute w-max top-[40px] right-0 flex flex-col items-start shadow-2xl z-50 bg-[#dee2e6] p-6 text-[#495057] rounded-lg gap-3 profile-menu">
                {!isAdmin && (
                  <>
                    <div className="flex flex-col items-center">
                      <img src={shsLogo} alt="shs" className="w-24" />
                      <p className=" border-[#ced4da] font-semibold text-xl">
                        {userInfo === null ? "" : `${userInfo.name.firstName} ${userInfo.name.lastName}`}
                      </p>
                      <p style={{ fontFamily: "'Koulen', sans-serif" }} className="border-[#ced4da] text-sm">
                        {user.email}
                      </p>
                      <Link to="/user-profile">
                        <button className="mt-2 bg-[#6c757d] text-[#ced4da] border-2 border-[#ced4da] p-3 rounded-lg cursor-pointer hover:bg-[#7C0F0F]">
                          Manage your Sequioa account
                        </button>
                      </Link>
                    </div>
                    <Link
                      to="/favorite"
                      className=" w-full p-2 hover:bg-[#7C0F0F] hover:text-white rounded-md"
                      style={{ fontFamily: "Koh Santepheap, serif" }}>
                      Favorites
                    </Link>
                  </>
                )}

                <button
                  onClick={onClickLogout}
                  className="cursor-pointer w-full p-2 text-left hover:bg-[#7C0F0F] hover:text-white rounded-md"
                  style={{ fontFamily: "Koh Santepheap, serif" }}>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        {/* Hamburger Menu Button - Shows on mobile and for when desktop items overlap while zooming in on site */}
        <button
          className="xl:hidden p-2 rounded-sm cursor-pointer focus:outline-none hover:bg-[#7C0F0F]/10 transition-colors duration-200"
          onClick={toggleMenu}
          aria-label="Toggle navigation">
          <div className="w-5 h-5 flex flex-col justify-center items-center">
            <span
              className={`block w-full h-0.5 bg-[#7C0F0F] transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-1" : ""
              }`}
            />
            <span
              className={`block w-full h-0.5 bg-[#7C0F0F] transition-all duration-300 my-1 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-full h-0.5 bg-[#7C0F0F] transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-1" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile/Responsive Navigation Menu */}
      <div
        className={`
        xl:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-lg 
        transform transition-transform duration-300 ease-in-out z-50
        ${menuOpen ? "translate-x-0" : "translate-x-full"}
      `}>
        <div className="flex justify-end p-4 bg-white border-b border-gray-100">
          <button
            onClick={closeMenu}
            className="p-2 rounded focus:outline-none hover:bg-[#7C0F0F]/10 transition-colors duration-200 cursor-pointer"
            aria-label="Close navigation">
            <svg
              className="w-6 h-6 text-[#7C0F0F] hover:text-[#7C0F0F]/80 transition-colors duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Mobile Navigation Links Container */}
        <div className="h-full overflow-y-auto pb-20">
          <div className="px-4 py-6">
            <ul className="flex flex-col items-center gap-4" style={{ fontFamily: "Koh Santepheap, serif" }}>
              <li>
                <NavLink to="/" className={mobileNavLinkClass}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/foster" className={mobileNavLinkClass}>
                  Foster
                </NavLink>
              </li>
              <li>
                <NavLink to="/volunteer" className={mobileNavLinkClass}>
                  Volunteer
                </NavLink>
              </li>
              <li>
                <NavLink to="/donate" className={mobileNavLinkClass}>
                  Donate
                </NavLink>
              </li>
              <li>
                <NavLink to="/adopt" className={mobileNavLinkClass}>
                  Adopt
                </NavLink>
              </li>
              <li>
                <NavLink to="/match" className={mobileNavLinkClass}>
                  Match
                </NavLink>
              </li>
              <li>
                <NavLink to="/sign-in" className={mobileNavLinkClass}>
                  Sign In
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" className={mobileNavLinkClass}>
                  Register
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
});

function UserSVG() {
  return (
    <svg className="w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="style=fill">
        <g id="profile">
          <path
            id="vector (Stroke)"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.75 6.5C6.75 3.6005 9.1005 1.25 12 1.25C14.8995 1.25 17.25 3.6005 17.25 6.5C17.25 9.3995 14.8995 11.75 12 11.75C9.1005 11.75 6.75 9.3995 6.75 6.5Z"
            fill="#fff"
          />
          <path
            id="rec (Stroke)"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.25 18.5714C4.25 15.6325 6.63249 13.25 9.57143 13.25H14.4286C17.3675 13.25 19.75 15.6325 19.75 18.5714C19.75 20.8792 17.8792 22.75 15.5714 22.75H8.42857C6.12081 22.75 4.25 20.8792 4.25 18.5714Z"
            fill="#fff"
          />
        </g>
      </g>
    </svg>
  );
}

function HeartSVG() {
  return (
    <svg className="w-10 group" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        className="group-hover:fill-[#C1272D]"
        d="M8.10627 18.2468C5.29819 16.0833 2 13.5422 2 9.1371C2 4.27416 7.50016 0.825464 12 5.50063L14 7.49928C14.2929 7.79212 14.7678 7.79203 15.0607 7.49908C15.3535 7.20614 15.3534 6.73127 15.0605 6.43843L13.1285 4.50712C17.3685 1.40309 22 4.67465 22 9.1371C22 13.5422 18.7018 16.0833 15.8937 18.2468C15.6019 18.4717 15.3153 18.6925 15.0383 18.9109C14 19.7294 13 20.5 12 20.5C11 20.5 10 19.7294 8.96173 18.9109C8.68471 18.6925 8.39814 18.4717 8.10627 18.2468Z"
        fill="#adb5bd"
      />
    </svg>
  );
}
