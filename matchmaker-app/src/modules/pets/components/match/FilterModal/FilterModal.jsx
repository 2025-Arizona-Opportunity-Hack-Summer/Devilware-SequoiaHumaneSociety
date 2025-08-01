import { useSelector } from "react-redux";
import Modal from "../../../../../components/common/Modal/Modal";

import SpeciesFilter from "./FilterComponents/SpeciesFilter";
import SizeFilter from "./FilterComponents/SizeFilter";
import SortFilter from "./FilterComponents/SortFilter";
import ActiveLevelsFilter from "./FilterComponents/ActiveLevelsFilter";
import BreedFilter from "./FilterComponents/BreedFilter";

import InputButton from "../../../../../components/common/inputs/InputButton";

import SessionStorage from "../../../../../utils/sessionStorage";

import { userSlice } from "../../../../../store/slices/UserInfoSlice";
import { filterPetsByCriteria } from "../../../utils/petUtils";

function FilterModal({ visible, setVisibleFilter, filterValue, setFilterValue, originalPetList, setPetList }) {
  const userProfile = useSelector((store) => store[userSlice.name]);
  const { speciesFilter, breedFilter, activeLevelFilter, sizeFilter, sortFilter } = filterValue;
  const { setSpeciesFilter, setBreedFilter, setActiveLevelFilter, setSizeFilter, setSortFilter } = setFilterValue;

  const onClickCloseFilter = () => {
    setVisibleFilter((preState) => false);
  };

  const onClickApplyFilter = () => {
    SessionStorage.setItem("match-species-filter", speciesFilter);
    SessionStorage.setItem("match-breed-filter", breedFilter);
    SessionStorage.setItem("match-active-level-filter", activeLevelFilter);
    SessionStorage.setItem("match-size-filter", sizeFilter);
    SessionStorage.setItem("match-sort-filter", sortFilter);

    const updatedPetList = filterPetsByCriteria(
      originalPetList,
      speciesFilter,
      breedFilter,
      activeLevelFilter,
      sizeFilter,
      sortFilter,
      userProfile
    );
    setPetList((prev) => updatedPetList);
    onClickCloseFilter();
  };

  const onClickClearAll = () => {
    const updatedPetList = filterPetsByCriteria(originalPetList, [], [], [], [], "", userProfile);
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
      <div className="bg-white absolute w-full bottom-0 p-6 lg:px-20 filter-modal max-h-screen overflow-auto">
        <div className="flex justify-between items-center">
          <button
            className="cursor-pointer hover:bg-[#7C0F0F] bg-[#adb5bd] px-2 lg:py-1 lg:px-3 rounded-md text-white font-semibold"
            onClick={onClickCloseFilter}>
            x
          </button>

          <h3 className="text-xl lg:text-3xl font-semibold" style={{ fontFamily: "Delius, cursive", fontWeight: 400 }}>
            Filter
          </h3>
          <button
            className="cursor-pointer hover:bg-[#7C0F0F] bg-[#adb5bd] p-2 lg:px-4 lg:py-2 rounded-md text-white font-semibold text-sm lg:text-base"
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
