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

import { petListSlice } from "../../../redux/MatchedPetSlice";

import { filterPet } from "../../../features/filterPet";

function FilterModal({ visible, setVisibleFilter }) {
  const dispatch = useDispatch();
  const [speciesFilter, setSpeciesFilter] = useState([]);
  const [petList, setPetList] = useState([]); // only use for filter not for display

  useEffect(() => {
    const API_BASE_URL = import.meta.env.VITE_API_URL;
    const PETS_ENDPOINT = import.meta.env.VITE_PETS_ENDPOINT;

    const url = `${API_BASE_URL}/${PETS_ENDPOINT}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPetList((preState) => data.content);

        const storedSpeciesFilter = SessionStorage.getItem("match-species-filter");

        if (storedSpeciesFilter !== null) {
          setSpeciesFilter((preState) => storedSpeciesFilter);
        }

        const updatedList = filterPet(data.content, storedSpeciesFilter, null);
        dispatch(petListSlice.actions.assign(updatedList));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onClickCloseFilter = () => {
    setVisibleFilter((preState) => false);
  };

  // xl:w-[80vw] xl:left-1/2 xl:-translate-x-1/2

  const onClickApplyFilter = () => {
    const updatedList = filterPet(petList, speciesFilter, null);
    dispatch(petListSlice.actions.assign(updatedList));
    onClickCloseFilter();
  };

  return (
    <Modal visible={visible} className={"root-modal-close"}>
      <div className="bg-white absolute w-full bottom-0 p-6 px-20 filter-modal">
        <div className="flex justify-between items-center">
          <InputButton
            id="closeFilterModal"
            onClickHandler={onClickCloseFilter}
            inputStyle="hidden"
            labelStyle="text-[#7C0F0F] font-semibold cursor-pointer hover:text-[#C1272D]">
            x
          </InputButton>

          <h3 className="text-xl font-semibold">Filter</h3>
          <p className="cursor-pointer hover:text-[#7C0F0F]">Clear All</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col justify-start gap-5">
            <SpeciesFilter speciesFilter={speciesFilter} setSpeciesFilter={setSpeciesFilter} />
            <BreedFilter petList={petList} />
            <ActiveLevelsFilter />
            <SizeFilter />
            <SortFilter />
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
