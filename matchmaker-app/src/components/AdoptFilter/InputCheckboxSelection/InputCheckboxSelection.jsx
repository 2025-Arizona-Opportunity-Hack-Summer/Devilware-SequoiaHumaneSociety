import { useState } from "react";

import "./InputCheckboxSelection.css";
import SessionStorage from "../../../features/sessionStorage";

function InputCheckboxSelection({
  dataList = [],
  id,
  setValues,
  values = [],
  title,
  onClickButton,
  visibleList,
  openDataList,
}) {
  const onChangeValue = (event) => {
    const currValue = event.target.value;

    let updatedValues = [];
    if (values.includes(currValue) === false) {
      updatedValues = [...values, currValue];
      setValues((preState) => updatedValues);
    } else {
      updatedValues = values.filter((item) => item !== currValue);
      setValues((preState) => preState.filter((item) => item !== currValue));
    }

    if (title === "breeds") {
      SessionStorage.setItem("adopt-pet-breed", updatedValues);
    } else if (title === "active levels") {
      SessionStorage.setItem("adopt-pet-active-level", updatedValues);
    } else if (title === "sizes") {
      SessionStorage.setItem("adopt-pet-size", updatedValues);
    }
  };
  const dataListCheckBox = dataList.map((item) => (
    <li className="flex flex-row justify-between cursor-pointer group" key={item}>
      <div className="checkbox-wrapper w-full">
        <input type="checkbox" id={item} onChange={onChangeValue} value={item} checked={values.includes(item)} />
        <label
          htmlFor={item}
          className="flex justify-between border border-[#adb5bd] first:border-t p-2 w-full bg-[#fff] cursor-pointer text-[#6c757d]">
          <p className="font-semibold">{item}</p>
          <div className="toggle">
            <span></span>
          </div>
        </label>
      </div>
    </li>
  ));

  if (dataList.length === 0) {
    return <></>;
  }

  return (
    <div className="flex flex-col items-center select-none">
      <p className="text-lg font-semibold">{title.toUpperCase()}</p>
      <div className="w-full relative group">
        <div
          className="flex gap-10 justify-between p-3 cursor-pointer shadow-xl bg-[#ced4da] group-hover:bg-[#4f2edc] items-center"
          onClick={onClickButton}>
          <p className="text-[#6c757d] font-semibold group-hover:text-white w-max">Choose {title.toLowerCase()}</p>
          <ArrowUpSVG openDataList={openDataList} />
        </div>
        {visibleList && (
          <ul className="flex flex-col xl:max-h-52 overflow-y-auto overflow-x-hidden absolute w-full z-20 shadow-2xl list-option">
            {dataListCheckBox}
          </ul>
        )}
      </div>
    </div>
  );
}

function ArrowUpSVG({ openDataList }) {
  return (
    <svg
      viewBox="0 -0.5 17 17"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className="si-glyph si-glyph-arrow-up w-6 arrow duration-300"
      fill="#000000"
      style={{ rotate: openDataList === false ? "0deg" : "180deg" }}>
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <title>1191</title> <defs> </defs>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <path
            d="M15.812,9.896 C15.587,9.896 15.361,9.834 15.162,9.699 L8.932,5.543 L2.895,9.74 C2.354,10.099 1.625,9.953 1.266,9.412 C0.905,8.873 1.051,8.142 1.592,7.783 L8.28,3.152 C8.673,2.888 9.188,2.888 9.583,3.15 L16.464,7.74 C17.005,8.099 17.152,8.832 16.792,9.371 C16.564,9.713 16.191,9.896 15.812,9.896 L15.812,9.896 Z"
            fill="#434343"
            className="si-glyph-fill group-hover:fill-[#fff]"></path>
        </g>
      </g>
    </svg>
  );
}
export default InputCheckboxSelection;
