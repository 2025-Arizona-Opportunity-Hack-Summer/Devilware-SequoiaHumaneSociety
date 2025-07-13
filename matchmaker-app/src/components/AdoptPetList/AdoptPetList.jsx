import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PetList from "../MatchedPets/PetList/PetList";
import RequiredSignInModal from "../RequiredSignInModal/RequiredSignInModal";
import GetToMatchPage from "./GetToMatchPage/GetToMatchPage";

import AdoptFilter from "../AdoptFilter/AdoptFilter";
import AdoptNavBar from "./AdoptNavBar/AdoptNavBar";
import AdoptSortButton from "./AdoptSortButton/AdoptSortButton";
import AdoptFilterResult from "./AdoptFilterResult/AdoptFilterResult";

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

  const filterValue = { breedFilter, activeLevelFiter, sizeFilter };
  const setFilter = { setBreedFilter, setActiveLevelFilter, setSizeFilter };

  const onClickSortToggle = () => {
    setVisibleSort((preState) => !preState);
  };

  const onClickSortOption = (value) => {
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
        <AdoptNavBar species={species} />
        <div className="flex gap-10 mx-20">
          <div className="flex flex-col gap-20">
            <GetToMatchPage />
            <AdoptFilter breedList={breedList} filterValue={filterValue} setFilter={setFilter} />
          </div>
          <div className="w-full">
            <div className="flex justify-between mb-10">
              <AdoptFilterResult
                breedFilter={breedFilter}
                activeLevelFilter={activeLevelFiter}
                sizeFilter={sizeFilter}
                onClickClearAll={onClickClearAll}
              />
              <AdoptSortButton
                sortFilter={sortFilter}
                visibleSortList={visibleSort}
                onClickSortOption={onClickSortOption}
                onClickSortToggle={onClickSortToggle}
              />
            </div>
            <PetList petList={petList} setVisibleSignIn={setVisibleRequiredSignIn} />
          </div>
        </div>
      </div>
      <RequiredSignInModal visible={visibleRequiredSignIn} setVisible={setVisibleRequiredSignIn} />
    </>
  );
}

export default AdoptPetList;
