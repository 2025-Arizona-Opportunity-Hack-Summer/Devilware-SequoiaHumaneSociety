import { useState } from "react";

import InputCheckbox from "../../../Input/InputCheckbox/InputCheckbox";

function ActiveLevelsFilter() {
  const [activeLevelsFilter, setActiveLevelsFilter] = useState([]);
  const onChangeActiveLevelsFilter = (event) => {
    const currActiveLevel = event.target.value;

    if (activeLevelsFilter.includes(currActiveLevel) === false) {
      setActiveLevelsFilter((preState) => [...preState, currActiveLevel]);
    } else {
      setActiveLevelsFilter((preState) => preState.filter((speciesItem) => speciesItem != currActiveLevel));
    }
  };

  const activeLevels = ["Very Active", "Moderately Active", "Quietly Active"];

  const ActiveLevelsCheckboxes = activeLevels.map((level) => (
    <InputCheckbox
      id={`filter_${level}`}
      value={level}
      inputStyle="hidden checkbox-question-input"
      labelStyle="checkbox-question-label text-center flex-grow"
      checked={activeLevelsFilter.includes(level)}
      onChangeHandler={onChangeActiveLevelsFilter}
      key={`filter_${level}`}>
      {level}
    </InputCheckbox>
  ));

  return (
    <div className="flex flex-col gap-2">
      <p className="font-medium text-md">Active levels</p>
      <div className="flex justify-start gap-3 flex-wrap">{ActiveLevelsCheckboxes}</div>
    </div>
  );
}

export default ActiveLevelsFilter;
