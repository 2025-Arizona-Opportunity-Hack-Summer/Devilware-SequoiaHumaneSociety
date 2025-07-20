// import { useDispatch } from "react-redux";

import InputCheckbox from "../../../Input/InputCheckbox/InputCheckbox";

// import { speciesFilterSlice } from "../../../../redux/MatchedFilterSlice";

function SpeciesFilter({ speciesFilter = [], setSpeciesFilter }) {
  // const dispatch = useDispatch();
  const species = ["Cat", "Dog"];

  const onChangeSpeciesFilter = (event) => {
    const currSpecies = event.target.value;

    if (speciesFilter.includes(currSpecies) === false) {
      setSpeciesFilter((preState) => [...speciesFilter, currSpecies]);
    } else {
      setSpeciesFilter((preState) => preState.filter((item) => item !== currSpecies));
    }

    // dispatch(speciesFilterSlice.actions.assign(updatedFilter));
  };

  const SpeciesCheckboxes = species.map((animal) => (
    <InputCheckbox
      id={`filter_${animal}`}
      value={animal}
      inputStyle="hidden checkbox-question-input"
      labelStyle="checkbox-question-label text-center flex-grow"
      checked={speciesFilter.includes(animal)}
      onChangeHandler={onChangeSpeciesFilter}
      key={`filter_${animal}`}>
      {animal}
    </InputCheckbox>
  ));

  return (
    <div className="flex flex-col gap-2">
      <p className="font-medium text-md">Species</p>
      <div className="flex justify-start gap-3 flex-wrap">{SpeciesCheckboxes}</div>
    </div>
  );
}

export default SpeciesFilter;
