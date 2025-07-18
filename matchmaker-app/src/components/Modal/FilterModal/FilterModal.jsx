import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../Modal";
import InputButton from "../../Input/InputButton/InputButton";

import SpeciesFilter from "./SpeciesFilter/SpeciesFilter";
import ActiveLevelsFilter from "./ActiveLevelsFilter/ActiveLevelsFilter";
import SizeFilter from "./SizesFilter/SizeFilter";
import SortFilter from "./SortFilter/SortFilter";
import BreedFilter from "./BreedFilter/BreedFilter";
import SessionStorage from "../../../features/sessionStorage";

import { filterPet } from "../../../features/filterPet";

function FilterModal({ visible, setVisibleFilter, filterValue, setFilterValue, originalPetList, setPetList }) {
  const dispatch = useDispatch();

  const { speciesFilter, breedFilter, activeLevelFilter, sizeFilter, sortFilter } = filterValue;
  const { setSpeciesFilter, setBreedFilter, setActiveLevelFilter, setSizeFilter, setSortFilter } = setFilterValue;

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

    const updatedPetList = filterPet(
      originalPetList,
      storedSpeciesFilter,
      storedBreedFilter,
      storedActiveLevelFilter,
      storedSizeFilter,
      storedSortFilter
    );
    setPetList((prev) => updatedPetList);
  }, []);

  const onClickCloseFilter = () => {
    setVisibleFilter((preState) => false);
  };

  const onClickApplyFilter = () => {
    SessionStorage.setItem("match-species-filter", speciesFilter);
    SessionStorage.setItem("match-breed-filter", breedFilter);
    SessionStorage.setItem("match-active-level-filter", activeLevelFilter);
    SessionStorage.setItem("match-size-filter", sizeFilter);
    SessionStorage.setItem("match-sort-filter", sortFilter);
    const updatedPetList = filterPet(
      originalPetList,
      speciesFilter,
      breedFilter,
      activeLevelFilter,
      sizeFilter,
      sortFilter
    );
    setPetList((prev) => updatedPetList);
    onClickCloseFilter();
  };

  const onClickClearAll = () => {
    const updatedPetList = filterPet(originalPetList, [], [], [], [], "");
    setSpeciesFilter((preState) => []);
    setBreedFilter((preState) => []);
    setActiveLevelFilter((preState) => []);
    setSizeFilter((preState) => []);
    setSortFilter((preState) => "");
    SessionStorage.removeItem("match-species-filter");
    SessionStorage.removeItem("match-breed-filter");
    SessionStorage.removeItem("match-active-level-filter");
    SessionStorage.removeItem("match-size-filter");
    SessionStorage.removeItem("match-sort-filter");
    setPetList((prev) => updatedPetList);
    onClickCloseFilter();
  };
  return (
    <Modal visible={visible} className={"root-modal-close"}>
      <div className="bg-white absolute w-full bottom-0 p-6 px-20 filter-modal">
        <div className="flex justify-between items-center">
          <button
            className="cursor-pointer hover:bg-[#7C0F0F] bg-[#adb5bd] py-1 px-3 rounded-md text-white font-semibold"
            onClick={onClickCloseFilter}>
            x
          </button>

          <h3 className="text-3xl font-semibold" style={{ fontFamily: "Delius, cursive", fontWeight: 400 }}>
            Filter
          </h3>
          <button
            className="cursor-pointer hover:bg-[#7C0F0F] bg-[#adb5bd] px-4 py-2 rounded-md text-white font-semibold"
            onClick={onClickClearAll}>
            Clear All
          </button>
        </div>
        <div className="flex flex-col gap-2 mt-5">
          <div className="flex flex-col justify-start gap-5">
            <SpeciesFilter speciesFilter={speciesFilter} setSpeciesFilter={setSpeciesFilter} />
            <BreedFilter petList={originalPetList} breedFilter={breedFilter} setBreedFilter={setBreedFilter} />
            <ActiveLevelsFilter activeLevelFilter={activeLevelFilter} setActiveLevelFilter={setActiveLevelFilter} />
            <SizeFilter sizeFilter={sizeFilter} setSizeFilter={setSizeFilter} />
            <SortFilter sortFilter={sortFilter} setSortFilter={setSortFilter} />
          </div>
        </div>
        <InputButton
          id="applyFilterButton"
          inputStyle="hidden"
          labelStyle="bg-[#adb5bd] hover:bg-[#7C0F0F] text-white rounded-md cursor-pointer font-semibold block text-center mt-10 py-2 text-lg"
          onClickHandler={onClickApplyFilter}>
          {/* When button is clicked, move the page to the top again*/}
          Apply
        </InputButton>
      </div>
    </Modal>
  );
}

export default FilterModal;
