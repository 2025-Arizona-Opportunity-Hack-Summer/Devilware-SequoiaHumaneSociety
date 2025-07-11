import { useState } from "react";

import InputCheckbox from "../../../Input/InputCheckbox/InputCheckbox";

function SortFilter({ sortFilter, setSortFilter }) {
  const [stay, setStay] = useState("");
  const [alphabetical, setAlphabetical] = useState("");

  const sorts = ["Shortest Stay", "Longest Stay", "Alphabetical A-Z", "Alphabetical Z-A"];

  const onChangeStay = (value = "") => {
    if (value === stay) {
      setStay((preState) => "");
    } else {
      setStay((preState) => value);
    }
  };

  const onChangAlphabetical = (value = "") => {
    if (value === sortFilter) {
      setSortFilter((preState) => "");
    } else {
      setSortFilter((preState) => value);
    }
  };

  const onChangeSortFilter = (event) => {
    const currSort = event.target.value;

    if (currSort === "Shortest Stay" || currSort === "Longest Stay") {
      onChangeStay(currSort);
    } else {
      onChangAlphabetical(currSort);
    }
  };

  function checkedItem(item) {
    if (item === "Shortest Stay" || item === "Longest Stay") {
      return stay === item;
    } else {
      return sortFilter === item;
    }
  }
  const SortsCheckboxes = sorts.map((item) => (
    <InputCheckbox
      id={`filter_${item}`}
      value={item}
      inputStyle="hidden checkbox-question-input"
      labelStyle="checkbox-question-label text-center flex-grow"
      checked={checkedItem(item)}
      key={`filter_${item}`}
      onChangeHandler={onChangeSortFilter}>
      {item}
    </InputCheckbox>
  ));

  return (
    <div className="flex flex-col gap-2">
      <p className="font-medium text-md">Sorts</p>
      <div className="flex justify-start gap-3 flex-wrap">{SortsCheckboxes}</div>
    </div>
  );
}

export default SortFilter;
