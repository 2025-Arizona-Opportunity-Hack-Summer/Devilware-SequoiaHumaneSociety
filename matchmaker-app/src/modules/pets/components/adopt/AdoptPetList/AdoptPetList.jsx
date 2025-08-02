import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import PetList from "../../PetList/PetList";
import RequiredSignInModal from "../../../../../components/common/RequiredSignInModal/RequiredSignInModal";
import GetToMatchPage from "../GetToMatchPage";
import AdoptNavBar from "../AdoptNavBar";
import AdoptSortButton from "../AdoptSortButton";
import AdoptFilter from "../AdoptFilter/AdoptFilter";
import AdoptFilterResult from "../AdoptFilter/AdoptFilterResult";

import SessionStorage from "../../../../../utils/sessionStorage";

import { userSlice } from "../../../../../store/slices/UserInfoSlice";
import { filterPetsByCriteria } from "../../../utils/petUtils";

import "./AdoptPetList.css";

function AdoptPetList() {
  const userProfile = useSelector((store) => store[userSlice.name]);
  const { species } = useParams();
  const [originalPetList, setOriginalPetList] = useState([]); // store all pets data (independent with filter)
  const [petList, setPetList] = useState(); // current pet data (depend on filter)
  const [breedList, setBreedList] = useState([]); // a breed list of only current pets
  const [breedFilter, setBreedFilter] = useState([]); // breed filter
  const [activeLevelFiter, setActiveLevelFilter] = useState([]); // active level filter
  const [sizeFilter, setSizeFilter] = useState([]); // size filter
  const [sortFilter, setSortFilter] = useState(""); // sort filter

  const [visibleSortOption, setVisibleSortOption] = useState(false); // sort option is visible only when visibleSortOption === true
  const [visibleRequiredSignIn, setVisibleRequiredSignIn] = useState(false); // sign-in session is visible only when visibleRequiredSignIn === true

  const filterValue = { breedFilter, activeLevelFiter, sizeFilter }; // filterValue contains all value of filter
  const setFilter = { setBreedFilter, setActiveLevelFilter, setSizeFilter }; // setFilter contains all set function of filter

  useEffect(() => {
    /*
      Every time the species is changed, the browser will fetch pet data from database
    */
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
        /*
          data:
          - data.content: pet data array
          - data.breeds: list of string represents all breed in the above pet data array
        */
        setOriginalPetList((preState) => data.pets);
        setBreedList((preState) => data.breeds);

        /*
          All the filter is reset when the page is reloaded
        */
        setBreedFilter((preState) => []);
        setActiveLevelFilter((preState) => []);
        setSizeFilter((preState) => []);
        setSortFilter((preState) => "");

        /*
          Check if the browser session stores any filter value
          - if the filter and species match exists, set the filter with filter value 
          - otherwise, remove all previous filter data
        */
        const storedSpecies = SessionStorage.getItem("adopt-pet-species");

        if (storedSpecies === null || storedSpecies !== species) {
          SessionStorage.setItem("adopt-pet-species", species);
          SessionStorage.removeItem("adopt-pet-breed");
          SessionStorage.removeItem("adopt-pet-active-level");
          SessionStorage.removeItem("adopt-pet-size");
          SessionStorage.removeItem("adopt-pet-sort");
        } else {
          setBreedFilter((preState) => SessionStorage.getItem("adopt-pet-breed") || []);
          setActiveLevelFilter((preState) => SessionStorage.getItem("adopt-pet-active-level") || []);
          setSizeFilter((preState) => SessionStorage.getItem("adopt-pet-size") || []);
          setSortFilter((preState) => SessionStorage.getItem("adopt-pet-sort") || "");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [species]);

  useEffect(() => {
    /*
      Every time the filter is changed, call filterPet function
    */
    console.log(activeLevelFiter);
    setPetList((preState) =>
      filterPetsByCriteria(originalPetList, [], breedFilter, activeLevelFiter, sizeFilter, sortFilter, userProfile)
    );
  }, [breedFilter, activeLevelFiter, sizeFilter, sortFilter]);

  /*
    onClickSortToggle:
    - handler when sort button is clicked
  */
  const onClickSortToggle = () => {
    setVisibleSortOption((preState) => !preState); // toggle the sort filter options list
  };

  /*
    onClickSortOption:
    - handler when one of the sort option is clicked
  */
  const onClickSortOption = (value) => {
    setSortFilter((preState) => value); // set value to sortFilter
    setVisibleSortOption((preState) => false); // close the sort filter options list
    SessionStorage.setItem("adopt-pet-sort", value); // store to session storage
  };

  /*
    onClickClearAll:
    - handler when clear all buttion is clicked
    - reset all the state and remove all data in session storage
  */
  const onClickClearAll = () => {
    setBreedFilter((preState) => []);
    setActiveLevelFilter((preState) => []);
    setSizeFilter((preState) => []);
    setSortFilter((preState) => "");
    SessionStorage.removeItem("adopt-pet-breed");
    SessionStorage.removeItem("adopt-pet-active-level");
    SessionStorage.removeItem("adopt-pet-size");
    SessionStorage.removeItem("adopt-pet-sort");
    SessionStorage.removeItem("adopt-pet-species");
  };

  return (
    <>
      <div className="flex flex-col gap-5 adopt-pet-list-root">
        {/* AdoptNavBar - navigation bar used for switching between species*/}
        <AdoptNavBar species={species} />
        <div className="flex flex-col lg:flex-row gap-10 lg:mx-20 mx-5 items-center lg:items-start">
          <div className="flex flex-col gap-20">
            {/* GetToMatchPage - contains buttion to go to user questionnaires */}
            <GetToMatchPage />
            {/* AdoptFilter - contains breed, active level, and size filter */}
            <AdoptFilter breedList={breedList} filterValue={filterValue} setFilter={setFilter} />
          </div>
          <div className="w-full">
            <div className="flex flex-col gap-5 lg:flex-row justify-between mb-10">
              {/* AdoptFilterResult - a list represents the current filter value, contains clear all button*/}
              <AdoptFilterResult
                breedFilter={breedFilter}
                activeLevelFilter={activeLevelFiter}
                sizeFilter={sizeFilter}
                onClickClearAll={onClickClearAll}
              />
              {/* AdoptSortButton - contains sort filter*/}
              <AdoptSortButton
                sortFilter={sortFilter}
                visibleSortList={visibleSortOption}
                onClickSortOption={onClickSortOption}
                onClickSortToggle={onClickSortToggle}
              />
            </div>
            {/* PetList - a list represents pet result*/}
            <PetList petList={petList} setVisibleSignIn={setVisibleRequiredSignIn} />
          </div>
        </div>
      </div>
      {/* RequiredSignInModal - a session claim required sign in for some features (such as favorites features)*/}
      <RequiredSignInModal visible={visibleRequiredSignIn} setVisible={setVisibleRequiredSignIn} />
    </>
  );
}

export default AdoptPetList;
