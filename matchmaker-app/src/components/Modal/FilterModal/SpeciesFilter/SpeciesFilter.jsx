import { useState } from "react";

import InputCheckbox from "../../../Input/InputCheckbox/InputCheckbox";

function SpeciesFilter({ setFilter }) {
  const [speciesFilter, setSpeciesFilter] = useState([]);

  const species = ["Cat", "Dog", "Bird", "Hamster"];

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
