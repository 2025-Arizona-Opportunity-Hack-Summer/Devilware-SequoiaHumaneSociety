import { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";

import catImage from "../../assets/images/cat.jpg";
import dogImage from "../../assets/images/dog.jpg";
import catImage2 from "../../assets/images/cat2.jpg";
import dogImage2 from "../../assets/images/dog2.jpg";
import dogNav from "../../assets/images/dog-com.svg";
import catNav from "../../assets/images/cat-com.svg";

import PetList from "../MatchedPets/PetList/PetList";
import RequiredSignInModal from "../RequiredSignInModal/RequiredSignInModal";

import "./AdoptPetList.css";

function AdoptPetList() {
  const { species } = useParams();
  const [petList, setPetList] = useState([]);
  const [visibleRequiredSignIn, setVisibleRequiredSignIn] = useState(false);

  useEffect(() => {
    const API_BASE_URL = import.meta.env.VITE_API_URL;
    const PETS_ENDPOINT = import.meta.env.VITE_PETS_ENDPOINT;

    let url;
    if (species === "dog" || species === "cat") {
      url = `${API_BASE_URL}/${PETS_ENDPOINT}?species=${species.charAt(0).toUpperCase() + species.slice(1)}`;
    } else {
      url = `${API_BASE_URL}/${PETS_ENDPOINT}?species=other`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPetList((preState) => data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [species]);

  const navLinkClass = ({ isActive }) =>
    `flex gap-2 px-6 py-2 font-bold border-2 rounded-3xl hover:bg-white hover:border-black ${
      isActive ? "bg-white border-black " : "border-transparent"
    }`;

  return (
    <>
      <div className="flex flex-col gap-5 adopt-pet-list-root">
        <nav>
          <ul className="flex bg-[#7C0F0F] p-4 gap-2">
            <li>
              <Link
                to="/adopt"
                className="bg-[#adb5bd] text-white flex gap-2 px-6 py-2 font-bold hover:bg-black rounded-md duration-700">
                <ArrowSVG />
                <p>Back</p>
              </Link>
            </li>
            <li>
              <NavLink to="/adopt/cat" className={navLinkClass}>
                <img src={catNav} alt="cat" className="w-6" />
                <p>Cat</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/adopt/dog" className={navLinkClass}>
                <img src={dogNav} alt="dog" className="w-6" />
                <p>Dog</p>
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="flex gap-10 mx-20">
          <div>
            <div className="w-max shadow-2xl border-2 border-[#adb5bd] rounded-md flex flex-col items-center pt-6">
              <div className="rounded-2xl px-6">
                <p
                  className="uppercase text-center text-text text-xl font-bold"
                  style={{
                    fontFamily: "Koulen, sans-serif",
                    fontStyle: "normal",
                    fontWeight: 400,
                  }}>
                  Find your matched pet
                </p>
                <div className="flex justify-center gap-0 mt-5 relative left-6">
                  <img src={catImage} alt="cat" className="w-12 rounded-4xl" />
                  <img src={dogImage} alt="dog" className="w-12 rounded-4xl relative right-4" />
                  <img src={catImage2} alt="cat" className="w-12 rounded-4xl relative right-8" />
                  <img src={dogImage2} alt="dog" className="w-12 rounded-4xl relative right-12" />
                  <div className="w-12 rounded-4xl relative right-16 flex items-center bg-[#7C0F0F] justify-center text-white">
                    <p className="font-bold">+30</p>
                  </div>
                </div>
              </div>
              <button className="uppercase mt-5 cursor-pointer hover:bg-[#7C0F0F] bg-[#adb5bd] px-4 py-2 rounded-b-sm text-white font-semibold duration-[500ms] w-full">
                <Link className="uppercase" to="/match">
                  Get started
                </Link>
              </button>
            </div>
            <div></div>
          </div>
          <PetList petList={petList} setVisibleSignIn={setVisibleRequiredSignIn} />
        </div>
      </div>
      <RequiredSignInModal visible={visibleRequiredSignIn} setVisible={setVisibleRequiredSignIn} />
    </>
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
          fill="#fff"></path>
      </g>
    </svg>
  );
}
export default AdoptPetList;
