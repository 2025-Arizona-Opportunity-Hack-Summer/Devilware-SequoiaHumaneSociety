import { useState } from "react";

import Modal from "../Modal";
import InputCheckbox from "../../Input/InputCheckbox/InputCheckbox";
import InputButton from "../../Input/InputButton/InputButton";

function FilterModal({ visible, setVisibleFilter }) {
  const [speciesFilter, setSpeciesFilter] = useState([]);

  const species = ["Cat", "Dog", "Bird", "Hamster"];

  const onClickCloseFilter = () => {
    setVisibleFilter((preState) => false);
  };

  const onChangeSpeciesFilter = (event) => {
    const currSpecies = event.target.value;

    if (speciesFilter.includes(currSpecies) === false) {
      setSpeciesFilter((preState) => [...preState, currSpecies]);
    } else {
      setSpeciesFilter((preState) => preState.filter((speciesItem) => speciesItem != currSpecies));
    }
  };
  const SpeciesCheckboxes = species.map((animal) => (
    <InputCheckbox
      id={`filter_${animal}`}
      value={animal}
      inputStyle="hidden checkbox-question-input"
      labelStyle="checkbox-question-label text-center"
      checked={speciesFilter.includes(animal)}
      onChangeHandler={onChangeSpeciesFilter}
      key={`filter_${animal}`}>
      {animal}
    </InputCheckbox>
  ));

  const activeLevels = ["Very Active", "Moderately Active", "Quietly Active"];

  const ActiveLevelsCheckboxes = activeLevels.map((level) => (
    <InputCheckbox
      id={`filter_${level}`}
      value={level}
      inputStyle="hidden checkbox-question-input"
      labelStyle="checkbox-question-label text-center"
      checked={false}
      onChangeHandler={null}
      key={`filter_${level}`}>
      {level}
    </InputCheckbox>
  ));

  const sizes = ["Large", "Medium", "Small"];

  const SizesCheckboxes = sizes.map((size) => (
    <InputCheckbox
      id={`filter_${size}`}
      value={size}
      inputStyle="hidden checkbox-question-input"
      labelStyle={`checkbox-question-label flex-grow text-center`}
      checked={false}
      onChangeHandler={null}
      key={`filter_${size}`}>
      {size}
    </InputCheckbox>
  ));

  const sorts = ["Shortest Stay", "Longest Stay", "Alphabetical A-Z", "Alphabetical Z-A"];

  const SortsCheckboxes = sorts.map((item) => (
    <InputCheckbox
      id={`filter_${item}`}
      value={item}
      inputStyle="hidden checkbox-question-input"
      labelStyle={`checkbox-question-label flex-grow text-center`}
      checked={false}
      key={`filter_${item}`}
      onChangeHandler={null}>
      {item}
    </InputCheckbox>
  ));
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
            <div className="flex items-center gap-2">
              <p className="font-medium text-md">Species</p>
              <div className="flex justify-start gap-3 flex-wrap">{SpeciesCheckboxes}</div>
            </div>
            <div className="flex items-center gap-2">
              <p className="font-medium text-md">Active levels</p>
              <div className="flex justify-start gap-3 flex-wrap">{ActiveLevelsCheckboxes}</div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-medium text-md">Sizes</p>
            <div className="flex justify-between gap-1 flex-wrap">{SizesCheckboxes}</div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-medium text-md">Sorts</p>
            <div className="flex justify-between gap-1 flex-wrap">{SortsCheckboxes}</div>
          </div>
        </div>
        <InputButton
          id="backButton"
          inputStyle="hidden"
          labelStyle="bg-[#7C0F0F] text-white rounded-md cursor-pointer font-semibold block text-center mt-10 py-2 text-lg">
          {/* When button is clicked, move the page to the top again*/}
          Apply
        </InputButton>
      </div>
    </Modal>
  );
}

export default FilterModal;
