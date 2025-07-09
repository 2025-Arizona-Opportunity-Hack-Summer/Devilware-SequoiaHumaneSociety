import { useState } from "react";

import InputCheckbox from "../../../Input/InputCheckbox/InputCheckbox";

function SizeFilter() {
  const [sizeFilter, setSizeFilter] = useState([]);

  const onChangSizeFilter = (event) => {
    const currActiveLevel = event.target.value;

    if (sizeFilter.includes(currActiveLevel) === false) {
      setSizeFilter((preState) => [...preState, currActiveLevel]);
    } else {
      setSizeFilter((preState) => preState.filter((speciesItem) => speciesItem != currActiveLevel));
    }
  };

  const sizes = ["Large", "Medium", "Small"];

  const SizeCheckboxes = sizes.map((size) => (
    <InputCheckbox
      id={`filter_${size}`}
      value={size}
      inputStyle="hidden checkbox-question-input"
      labelStyle="checkbox-question-label text-center flex-grow"
      checked={sizeFilter.includes(size)}
      onChangeHandler={onChangSizeFilter}
      key={`filter_${size}`}>
      {size}
    </InputCheckbox>
  ));

  return (
    <div className="flex flex-col gap-2">
      <p className="font-medium text-md">Sizes</p>
      <div className="flex justify-start gap-3 flex-wrap">{SizeCheckboxes}</div>
    </div>
  );
}

export default SizeFilter;
