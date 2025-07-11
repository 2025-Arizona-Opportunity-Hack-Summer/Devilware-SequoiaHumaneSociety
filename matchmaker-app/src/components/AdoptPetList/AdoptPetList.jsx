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
      <div className="flex flex-col gap-5">
        <nav>
          <ul className="flex bg-[#7C0F0F] p-4 gap-2">
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

export default AdoptPetList;
