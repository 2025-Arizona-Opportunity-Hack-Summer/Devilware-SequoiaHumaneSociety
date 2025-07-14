import { useState } from "react";
import { Link, NavLink } from "react-router";

import dogNav from "../../../assets/images/dog-com.svg";
import catNav from "../../../assets/images/cat-com.svg";

function AdoptNavBar({ species }) {
  const [visibleNavList, setVisibleNavList] = useState(false);

  const onClickToggleNavList = () => {
    setVisibleNavList((preState) => !preState);
  };

  return (
    <nav>
      <div className="flex bg-[#7C0F0F] p-4 gap-2">
        <Link
          to="/adopt"
          className="bg-[#7C0F0F] text-[#495057] flex gap-2 px-6 py-2 font-bold rounded-md hover:text-[#fff] group hover:bg-[#C1272D]">
          <ArrowSVG />
          <p>Adopt</p>
        </Link>
        <div className="relative w-max">
          <button
            className="flex gap-2 px-6 py-2 font-bold border-2 rounded-md bg-white border-black w-full cursor-pointer"
            onClick={onClickToggleNavList}>
            <CurrentNav species={species} />
          </button>
          <NavOptionList visible={visibleNavList} species={species} setVisible={setVisibleNavList} />
        </div>
      </div>
    </nav>
  );
}

export default AdoptNavBar;

function CurrentNav({ species }) {
  if (species === "cat") {
    return (
      <>
        <img src={catNav} alt="cat" className="w-6" />
        <p>Cat</p>
      </>
    );
  } else if (species === "dog") {
    return (
      <>
        <img src={dogNav} alt="dog" className="w-6" />
        <p>Dog</p>
      </>
    );
  }

  return <></>;
}

function NavOptionList({ visible, species, setVisible }) {
  if (visible === false) {
    return <></>;
  }

  const navLinkClass = ({ isActive }) =>
    `flex gap-2 px-6 py-2 font-bold border-2 rounded-md hover:bg-white hover:border-black border-transparent`;

  return (
    <div className="absolute bg-[#7C0F0F] rounded-md w-full">
      {species !== "cat" && (
        <NavLink to="/adopt/cat" className={navLinkClass} onClick={() => setVisible(false)}>
          <img src={catNav} alt="cat" className="w-6" />
          <p>Cat</p>
        </NavLink>
      )}
      {species !== "dog" && (
        <NavLink to="/adopt/dog" className={navLinkClass} onClick={() => setVisible(false)}>
          <img src={dogNav} alt="dog" className="w-6" />
          <p>Dog</p>
        </NavLink>
      )}
    </div>
  );
}

function ArrowSVG() {
  return (
    <svg
      className="w-6 h-6"
      viewBox="-1 0 10 10"
      id="meteor-icon-kit__regular-long-arrow-down-xs"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      transform="rotate(90)">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5 6.5858L6.2929 5.2929C6.6834 4.9024 7.3166 4.9024 7.7071 5.2929C8.0976 5.6834 8.0976 6.3166 7.7071 6.7071L4.7071 9.7071C4.3166 10.0976 3.6834 10.0976 3.2929 9.7071L0.29289 6.7071C-0.09763 6.3166 -0.09763 5.6834 0.29289 5.2929C0.68342 4.9024 1.31658 4.9024 1.70711 5.2929L3 6.5858V1C3 0.44772 3.4477 0 4 0C4.5523 0 5 0.44772 5 1V6.5858z"
          fill="#6c757d"
          className="group-hover:fill-white"></path>
      </g>
    </svg>
  );
}
