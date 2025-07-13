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
import AdoptFilterList from "../AdoptFilterList/AdoptFilterList";
import AdoptFilter from "../AdoptFilter/AdoptFilter";
import SessionStorage from "../../features/sessionStorage";
import { filterPet } from "../../features/filterPet";

import "./AdoptPetList.css";

function AdoptPetList() {
  const { species } = useParams();
  const [originalPetList, setOriginalPetList] = useState([]);
  const [petList, setPetList] = useState();
  const [breedList, setBreedList] = useState([]);
  const [breedFilter, setBreedFilter] = useState([]);
  const [activeLevelFiter, setActiveLevelFilter] = useState([]);
  const [sizeFilter, setSizeFilter] = useState([]);
  const [sortFilter, setSortFilter] = useState("");

  const [visibleSort, setVisibleSort] = useState(false);
  const [visibleRequiredSignIn, setVisibleRequiredSignIn] = useState(false);
  const [visibleNavList, setVisibleNavList] = useState(false);

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
        setOriginalPetList((preState) => data.content);
        setBreedList((preState) => data.breeds);
        setBreedFilter((preState) => []);
        setActiveLevelFilter((preState) => []);
        setSizeFilter((preState) => []);
        setSortFilter((preState) => "");
        const storedSpecies = SessionStorage.getItem("adopt-pet-species");

        if (storedSpecies === null || storedSpecies !== species) {
          SessionStorage.setItem("adopt-pet-species", species);
          SessionStorage.setItem("adopt-pet-breed", []);
          SessionStorage.setItem("adopt-pet-active-level", []);
          SessionStorage.setItem("adopt-pet-size", []);
          SessionStorage.setItem("adopt-pet-sort", "");
        } else {
          setBreedFilter((preState) => SessionStorage.getItem("adopt-pet-breed"));
          setActiveLevelFilter((preState) => SessionStorage.getItem("adopt-pet-active-level"));
          setSizeFilter((preState) => SessionStorage.getItem("adopt-pet-size"));
          setSortFilter((preState) => SessionStorage.getItem("adopt-pet-sort"));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [species]);

  useEffect(() => {
    setPetList((preState) => filterPet(originalPetList, [], breedFilter, activeLevelFiter, sizeFilter, sortFilter));
  }, [breedFilter, activeLevelFiter, sizeFilter, sortFilter]);
  const navLinkClass = ({ isActive }) =>
    `flex gap-2 px-6 py-2 font-bold border-2 rounded-md hover:bg-white hover:border-black border-transparent`;

  const filterValue = { breedFilter, activeLevelFiter, sizeFilter };
  const setFilter = { setBreedFilter, setActiveLevelFilter, setSizeFilter };

  const onClickToggle = () => {
    setVisibleNavList((preState) => !preState);
  };

  const onClickSortToggle = () => {
    setVisibleSort((preState) => !preState);
  };

  const onClickSortFilter = (value) => {
    setSortFilter((preState) => value);
    setVisibleSort((preState) => false);
    SessionStorage.setItem("adopt-pet-sort", value);
  };

  const onClickClearAll = () => {
    setBreedFilter((preState) => []);
    setActiveLevelFilter((preState) => []);
    setSizeFilter((preState) => []);
    setSortFilter((preState) => "");
    SessionStorage.setItem("adopt-pet-breed", []);
    SessionStorage.setItem("adopt-pet-active-level", []);
    SessionStorage.setItem("adopt-pet-size", []);
    SessionStorage.setItem("adopt-pet-sort", "");
  };
  return (
    <>
      <div className="flex flex-col gap-5 adopt-pet-list-root">
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
                onClick={onClickToggle}>
                {species === "cat" && (
                  <>
                    <img src={catNav} alt="cat" className="w-6" />
                    <p>Cat</p>
                  </>
                )}
                {species === "dog" && (
                  <>
                    <img src={dogNav} alt="dog" className="w-6" />
                    <p>Dog</p>
                  </>
                )}
              </button>
              {visibleNavList && (
                <div className="absolute bg-[#7C0F0F] rounded-md w-full">
                  {species !== "cat" && (
                    <NavLink to="/adopt/cat" className={navLinkClass} onClick={() => setVisibleNavList(false)}>
                      <img src={catNav} alt="cat" className="w-6" />
                      <p>Cat</p>
                    </NavLink>
                  )}
                  {species !== "dog" && (
                    <NavLink to="/adopt/dog" className={navLinkClass} onClick={() => setVisibleNavList(false)}>
                      <img src={dogNav} alt="dog" className="w-6" />
                      <p>Dog</p>
                    </NavLink>
                  )}
                </div>
              )}
            </div>
          </div>
        </nav>
        <div className="flex gap-10 mx-20">
          <div className="flex flex-col gap-20">
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
            <div>
              <AdoptFilter breedList={breedList} filterValue={filterValue} setFilter={setFilter} />
            </div>
          </div>
          <div className="w-full">
            <div className="flex justify-between">
              <AdoptFilterList
                breedFilter={breedFilter}
                activeLevelFilter={activeLevelFiter}
                sizeFilter={sizeFilter}
                onClickClearAll={onClickClearAll}
              />
              <div className="flex gap-3 items-center w-max">
                <p className="font-semibold">Sort by</p>
                <div className="relative">
                  <button
                    className="min-w-[139px] text-left px-2 py-2 cursor-pointer shadow-xl bg-[#ff] text-[#4f2edc] font-semibold border-[#4f2edc] border"
                    onClick={onClickSortToggle}>
                    {sortFilter === "" ? "Most relevance" : sortFilter}
                  </button>
                  {visibleSort && (
                    <ul className="flex flex-col xl:max-h-52 overflow-y-auto overflow-x-hidden absolute z-20 shadow-2xl list-option w-max">
                      <li className="flex flex-row justify-between cursor-pointer w-max">
                        <button
                          className="w-[139px] text-left border border-[#adb5bd] first:border-t p-2 bg-[#fff] cursor-pointer text-[#6c757d] font-semibold hover:text-[#4f2edc] hover:border-l-2 hover:border-l-[#4f2edc]"
                          onClick={onClickSortFilter.bind(null, "")}>
                          Most relevance
                        </button>
                      </li>
                      <li className="flex flex-row justify-between cursor-pointer w-max">
                        <button
                          className="border border-[#adb5bd] first:border-t p-2 w-full bg-[#fff] cursor-pointer text-[#6c757d] font-semibold hover:text-[#4f2edc] hover:border-l-2 hover:border-l-[#4f2edc]"
                          onClick={onClickSortFilter.bind(null, "Alphabetical A-Z")}>
                          Alphabetical A-Z
                        </button>
                      </li>
                      <li className="flex flex-row justify-between cursor-pointer">
                        <button
                          className="border border-[#adb5bd] first:border-t p-2 w-full bg-[#fff] cursor-pointer text-[#6c757d] font-semibold hover:text-[#4f2edc] hover:border-l-2 hover:border-l-[#4f2edc]"
                          onClick={onClickSortFilter.bind(null, "Alphabetical Z-A")}>
                          Alphabetical Z-A
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-10">
              <PetList petList={petList} setVisibleSignIn={setVisibleRequiredSignIn} />
            </div>
          </div>
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
          fill="#6c757d"
          className="group-hover:fill-white"></path>
      </g>
    </svg>
  );
}
export default AdoptPetList;
