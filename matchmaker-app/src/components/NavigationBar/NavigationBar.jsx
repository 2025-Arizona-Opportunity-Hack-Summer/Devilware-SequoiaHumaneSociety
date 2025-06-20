import { NavLink } from "react-router";

function NavigationBar() {
  const isLinkActive = ({ isActive }) => {
    return isActive ? "link-active" : "";
  };
  return (
    <div className="flex justify-between items-center mx-3 p-5 bg-[#fff]">
      <div>
        <figure>
          <figcaption className="text-[#7C0F0F] uppercase font-bold text-2xl">
            Sequoia
          </figcaption>
        </figure>
      </div>
      {/* <div className="toggle-button-container">
        <label htmlFor="nav-button" className="nav-button-label">
          Close
        </label>
        <input
          type="checkbox"
          className="toggle-button"
          id="nav-button"
          name="nav-button"
        />
      </div> */}

      <div>
        <nav className="nav-list-desktop">
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
      </div>
      <div>
        <nav className="nav-list-desktop">
          <NavLink to="/sign-in" className={isLinkActive}>
            Sign in
          </NavLink>
          <NavLink to="register" className={isLinkActive}>
            Register
          </NavLink>
        </nav>
      </div>
    </div>
  );
}

export default NavigationBar;
