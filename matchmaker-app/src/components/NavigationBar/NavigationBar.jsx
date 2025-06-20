import { NavLink } from "react-router";

import "./NavigationBar.css";
import navIconUnchecked from "../../assets/images/nav-icon-unchecked.svg";
import navIconChecked from "../../assets/images/nav-icon-checked.svg";
import shsLogo from "../../assets/images/shs-logo.png";

function NavigationBar() {
  return (
    <div className="navigation-bar">
      <LogoContainer />
      <NavListContainer />
    </div>
  );
}

function LogoContainer() {
  return (
    <div className="flex justify-between items-center">
      <figure className="flex items-center justify-start">
        <img src={shsLogo} alt="logo" className="w-10" />
        <figcaption className="text-[#7C0F0F] uppercase font-bold text-2xl">
          Sequoia
        </figcaption>
      </figure>
      {/*
          The nav-button-container only visible when the width of viewport <= 769 
        */}
      <div className="nav-button-container">
        <label htmlFor="nav-button" className="nav-button-label">
          <img
            src={navIconUnchecked}
            alt="uncheckedIcon"
            className="icon-image"
          />
        </label>
        <input
          type="checkbox"
          className="nav-button"
          id="nav-button"
          name="nav-button"
        />
      </div>
    </div>
  );
}

function NavListContainer() {
  const isLinkActive = ({ isActive }) => {
    return isActive ? "link-active" : "";
  };

  return (
    <div className="nav-list-container">
      <nav className="nav-list">
        <NavLink to="/" className={isLinkActive}>
          Home
        </NavLink>
        <NavLink to="/about" className={isLinkActive}>
          About
        </NavLink>
        <NavLink to="/contact" className={isLinkActive}>
          Contact
        </NavLink>
        <NavLink to="/adopt" className={isLinkActive}>
          Adopt
        </NavLink>
        <NavLink to="/match" className={isLinkActive}>
          Match
        </NavLink>
      </nav>
      <nav className="nav-list mt-1.5">
        <NavLink to="/sign-in" className={isLinkActive}>
          Sign in
        </NavLink>
        <NavLink to="register" className={isLinkActive}>
          Register
        </NavLink>
      </nav>
    </div>
  );
}
export default NavigationBar;
