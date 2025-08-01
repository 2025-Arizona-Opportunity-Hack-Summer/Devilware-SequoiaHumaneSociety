import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// import FilterModal from "../Modal/FilterModal/FilterModal";
import RequiredSignInModal from "../../../../../components/common/RequiredSignInModal/RequiredSignInModal";
import FilterModal from "../FilterModal/FilterModal";
import GoBackButton from "../GoBackButton/GoBackButton";
import FilterList from "../FilterModal/FilterList";

import PetList from "../../PetList/PetList";

import InputText from "../../../../../components/common/inputs/InputText";
import InputButton from "../../../../../components/common/inputs/InputButton";

import SessionStorage from "../../../../../utils/sessionStorage";

import { matchedPetListSlice } from "../../../../../store/slices/MatchedPetSlice";
import { userSlice } from "../../../../../store/slices/UserInfoSlice";
import { filterPetsByCriteria } from "../../../utils/petUtils";
import searchImg from "../../../../../assets/images/search-com.svg";

import "./MatchedPets.css";

function MatchedPets({ visible, setIsQuestionPage }) {
  const matchPetList = useSelector((store) => store[matchedPetListSlice.name]);
  const userProfile = useSelector((store) => store[userSlice.name]);
  const [visibleFilter, setVisibleFilter] = useState(false);
  const [visibleSignIn, setVisibleSignIn] = useState(false);
  const [searchPet, setSearchPet] = useState("");
  const [petList, setPetList] = useState(matchPetList);
  const [speciesFilter, setSpeciesFilter] = useState([]);
  const [breedFilter, setBreedFilter] = useState([]);
  const [activeLevelFilter, setActiveLevelFilter] = useState([]);
  const [sizeFilter, setSizeFilter] = useState([]);
  const [sortFilter, setSortFilter] = useState("");

  useEffect(() => {
    const storedSpeciesFilter = SessionStorage.getItem("match-species-filter");

    if (storedSpeciesFilter !== null) {
      setSpeciesFilter((preState) => storedSpeciesFilter);
    }

    const storedBreedFilter = SessionStorage.getItem("match-breed-filter");

    if (storedBreedFilter !== null) {
      setBreedFilter((preState) => storedBreedFilter);
    }

    const storedActiveLevelFilter = SessionStorage.getItem("match-active-level-filter");

    if (storedActiveLevelFilter !== null) {
      setActiveLevelFilter((preState) => storedActiveLevelFilter);
    }

    const storedSizeFilter = SessionStorage.getItem("match-size-filter");

    if (storedSizeFilter !== null) {
      setSizeFilter((preState) => storedSizeFilter);
    }

    const storedSortFilter = SessionStorage.getItem("match-sort-filter");

    if (storedSortFilter !== null) {
      setSortFilter((preState) => storedSortFilter);
    }

    const updatedPetList = filterPetsByCriteria(
      matchPetList,
      storedSpeciesFilter,
      storedBreedFilter,
      storedActiveLevelFilter,
      storedSizeFilter,
      storedSortFilter,
      userProfile
    );
    setPetList((prev) => updatedPetList);
  }, [matchPetList]);

  const onClickOpenFilter = () => {
    setVisibleFilter((preState) => true);
  };

  const onClickGoBackQuestionBack = () => {
    setIsQuestionPage((preState) => true);
  };

  if (visible === false) {
    return <></>;
  }

  const onChangeSearchPet = (event) => {
    const nextText = event.target.value;
    setSearchPet((preState) => event.target.value);

    if (nextText === "") {
      setPetList((preState) => matchPetList);
    } else {
      setPetList((preState) => matchPetList.filter((pet) => pet.name.toLowerCase().includes(nextText.toLowerCase())));
    }
  };

  const onClickResetSearchPet = () => {
    setSearchPet((preState) => "");
    setPetList((preState) => matchPetList);
  };

  const filterValue = {
    speciesFilter,
    breedFilter,
    activeLevelFilter,
    sizeFilter,
    sortFilter,
  };

  const setFilterValue = {
    setSpeciesFilter,
    setBreedFilter,
    setActiveLevelFilter,
    setSizeFilter,
    setSortFilter,
  };

  const onClickRemoveItem = (title, value) => {
    if (title == "Species") {
      let updatedFilter = [...speciesFilter.filter((item) => item !== value)];
      setSpeciesFilter((prev) => updatedFilter);
      SessionStorage.setItem("match-species-filter", updatedFilter);
      const updatedPetList = filterPetsByCriteria(
        matchPetList,
        updatedFilter,
        breedFilter,
        activeLevelFilter,
        sizeFilter,
        sortFilter,
        userProfile
      );
      setPetList((prev) => updatedPetList);
    }
    if (title == "Breed") {
      let updatedFilter = [...breedFilter.filter((item) => item !== value)];
      setBreedFilter((prev) => updatedFilter);
      SessionStorage.setItem("match-breed-filter", updatedFilter);
    }
  };
  return (
    <>
      <div className="flex flex-col min-h-screen m-auto rounded-2xl gap-3 bg-white py-10 matched-pet-root">
        <GoBackButton onClickHandler={onClickGoBackQuestionBack} />
        <h2
          className="text-3xl  text-[#C1272D] tracking-tighter"
          style={{
            fontFamily: "Koulen, sans-serif",
            fontStyle: "normal",
            fontWeight: 600,
          }}>
          Matched Results
        </h2>
        <div className="flex flex-col lg:flex-row flex-wrap w-full justify-between gap-5">
          <div className="flex lg:w-[80%] w-full px-3 p-2 items-center shadow-[5px_5px_5px_#00000040] filter-text-container border-2 border-transparent">
            <img src={searchImg} alt="search" className="w-4 h-4 mr-3" />
            <InputText
              id="searchMachtedPet"
              inputStyle="w-full focus:border-0 focus:outline-0"
              placeholder="Search for a pet"
              value={searchPet}
              onChangeHandler={onChangeSearchPet}
            />
            <InputButton
              id="clearText"
              inputStyle="hidden"
              labelStyle="cursor-pointer font-semibold"
              onClickHandler={onClickResetSearchPet}>
              x
            </InputButton>
          </div>
          <InputButton
            id="filter"
            onClickHandler={onClickOpenFilter}
            inputStyle="hidden"
            labelStyle="block px-8 py-2 cursor-pointer border border-[#00000040] shadow-[0px_5px_5px_1px_#00000040] rounded-md filter-label-text text-lg hover:translate-1 hover:shadow-none duration-300">
            Filter
          </InputButton>
        </div>
        <FilterList filterValue={filterValue} onClickRemoveItem={onClickRemoveItem} />
        <PetList petList={petList} className="mt-10" setVisibleSignIn={setVisibleSignIn} />
      </div>
      <FilterModal
        visible={visibleFilter}
        setVisibleFilter={setVisibleFilter}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        originalPetList={matchPetList}
        setPetList={setPetList}
      />
      <RequiredSignInModal visible={visibleSignIn} setVisible={setVisibleSignIn} />
    </>
  );
}

export default MatchedPets;
