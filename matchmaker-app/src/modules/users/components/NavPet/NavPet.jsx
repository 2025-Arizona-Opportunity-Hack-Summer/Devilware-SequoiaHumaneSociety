import { NavLink } from "react-router-dom";

function NavPet() {
  const favoritePetClass = ({ isActive }) =>
    `px-6 py-3 text-base font-medium rounded-sm transition-all duration-200 block border font-semibold ${
      isActive
        ? "bg-[#7C0F0F] text-white shadow-md"
        : "text-[#7C0F0F] hover:bg-[#7C0F0F] hover:text-white hover:shadow-md"
    }`;

  const adoptedPetClass = ({ isActive }) =>
    `px-6 py-3 text-base rounded-sm transition-all duration-200 block border border-[#127475] font-semibold ${
      isActive
        ? "bg-[#127475] text-white shadow-md"
        : "text-[#127475] hover:bg-[#127475] hover:text-white hover:shadow-md"
    }`;

  const onHoldPetClass = ({ isActive }) =>
    `px-6 py-3 text-base rounded-sm transition-all duration-200 block border border-[#7251b5] font-semibold ${
      isActive
        ? "bg-[#7251b5] text-white shadow-md"
        : "text-[#7251b5] hover:bg-[#7251b5] hover:text-white hover:shadow-md"
    }`;

  return (
    <div className="mb-10">
      <nav>
        <ul className="flex flex-row items-center gap-3">
          <li>
            <NavLink to="/favorite" className={favoritePetClass}>
              Favorite Pets
            </NavLink>
          </li>
          <li>
            <NavLink to="/on-hold" className={onHoldPetClass}>
              On-hold Pets
            </NavLink>
          </li>
          <li>
            <NavLink to="/adopted" className={adoptedPetClass}>
              Adopted Pets
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavPet;
