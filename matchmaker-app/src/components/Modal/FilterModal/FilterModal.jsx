import { useState } from "react";

import Modal from "../Modal";
import InputButton from "../../Input/InputButton/InputButton";

import SpeciesFilter from "./SpeciesFilter/SpeciesFilter";
import ActiveLevelsFilter from "./ActiveLevelsFilter/ActiveLevelsFilter";
import SizeFilter from "./SizesFilter/SizeFilter";
import SortFilter from "./SortFilter/SortFilter";
import BreedFilter from "./BreedFilter/BreedFilter";

function FilterModal({ visible, setVisibleFilter }) {
  const onClickCloseFilter = () => {
    setVisibleFilter((preState) => false);
  };

  // xl:w-[80vw] xl:left-1/2 xl:-translate-x-1/2

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
            <SpeciesFilter />
            <BreedFilter />
            <ActiveLevelsFilter />
            <SizeFilter />
            <SortFilter />
          </div>
        </div>
        <InputButton
          id="backButton"
          inputStyle="hidden"
          labelStyle="bg-[#adb5bd] hover:bg-[#7C0F0F] text-white rounded-md cursor-pointer font-semibold block text-center mt-10 py-2 text-lg">
          {/* When button is clicked, move the page to the top again*/}
          Apply
        </InputButton>
      </div>
    </Modal>
  );
}

export default FilterModal;
