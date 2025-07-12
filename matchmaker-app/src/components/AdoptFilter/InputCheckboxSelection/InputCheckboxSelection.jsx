import { useState } from "react";

import "./InputCheckboxSelection.css";

function InputCheckboxSelection({ dataList = [], id, setValues, values = [], title }) {
  const [visibleList, setVisibleList] = useState(false);

  const onChangeValue = (event) => {
    const currValue = event.target.value;

    if (values.includes(currValue) === false) {
      setValues((preState) => [...preState, currValue]);
    } else {
      setValues((preState) => preState.filter((item) => item !== currValue));
    }
  };
  const dataListCheckBox = dataList.map((item) => (
    <li className="flex flex-row justify-between cursor-pointer">
      <div class="checkbox-wrapper w-full">
        <input type="checkbox" id={item} onChange={onChangeValue} value={item} checked={values.includes(item)} />
        <label
          for={item}
          className="flex justify-between border border-[#adb5bd] first:border-t p-2 w-full bg-[#fff] cursor-pointer text-[#6c757d]">
          <p className="font-semibold">{item}</p>
          <div class="toggle">
            <span></span>
          </div>
        </label>
      </div>
    </li>
  ));

  if (dataList.length === 0) {
    return <></>;
  }

  const hoverButton = () => {
    setVisibleList((preState) => true);
  };

  const blurButton = () => {
    setVisibleList((preState) => false);
  };
  return (
    <div className="flex flex-col items-center">
      <p className="text-lg font-semibold">{title.toUpperCase()}</p>
      <div className="w-full" onMouseOver={hoverButton} onMouseOut={blurButton}>
        <div className="p-3 cursor-pointer shadow-xl bg-[#ced4da]">
          <p className="text-[#6c757d] font-semibold">Choose {title.toLowerCase()}</p>
        </div>
        {visibleList && (
          <ul className="flex flex-col xl:max-h-52 overflow-y-auto overflow-x-hidden">{dataListCheckBox}</ul>
        )}
      </div>
    </div>
  );
}

export default InputCheckboxSelection;
