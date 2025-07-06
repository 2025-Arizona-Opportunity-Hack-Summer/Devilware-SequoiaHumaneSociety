import { useState } from "react";

import FilterModal from "../Modal/FilterModal/FilterModal";
// import GoBackButton from "./GoBackButton/GoBackButton";

import InputText from "../Input/InputText/InputText";
import InputButton from "../Input/InputButton/InputButton";

import searchImg from "../../assets/images/search-com.svg";

import "./MatchedPets.css";

function MatchedPets({ setIsQuestionPage }) {
  const [visibleFilter, setVisibleFilter] = useState(false);

  const onClickOpenFilter = () => {
    setVisibleFilter((preState) => true);
  };

  const onClickGoBackQuestionBack = () => {
    setIsQuestionPage((preState) => true);
  };
  return (
    <>
      <div className="bg-white py-10" id="form">
        <div className="flex flex-col min-h-screen xl:w-[80vw] w-[90vw] m-auto rounded-2xl gap-3">
          {/* <GoBackButton onClickHandler={onClickGoBackQuestionBack} /> */}
          <h2
            className="text-3xl  text-[#C1272D] tracking-tighter"
            style={{
              fontFamily: "Koulen, sans-serif",
              fontStyle: "normal",
              fontWeight: 600,
            }}>
            Results
          </h2>
          <div className="flex flex-wrap w-full justify-between">
            <div className="flex w-[80%] px-3 p-2 items-center shadow-[5px_5px_5px_#00000040] filter-text-container border-2 border-transparent">
              <img src={searchImg} alt="search" className="w-4 h-4 mr-3" />
              <InputText
                id="searchMachtedPet"
                inputStyle="w-full focus:border-0 focus:outline-0"
                placeholder="Search for a pet"
              />
              <InputButton id="clearText" inputStyle="hidden" labelStyle="cursor-pointer font-semibold">
                x
              </InputButton>
            </div>
            <InputButton
              id="filter"
              onClickHandler={onClickOpenFilter}
              inputStyle="hidden"
              labelStyle="block px-8 py-2 cursor-pointer border border-[#00000040] shadow-[0px_5px_5px_1px_#00000040] rounded-md filter-label-text text-lg hover:translate-1 hover:shadow-none duration-300">
              Filter
            </InputButton>
          </div>
        </div>
      </div>
      <FilterModal visible={visibleFilter} setVisibleFilter={setVisibleFilter} />
    </>
  );
}

export default MatchedPets;
