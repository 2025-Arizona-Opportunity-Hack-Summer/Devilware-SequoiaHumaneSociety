import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProgressBar from "./ProgressBar/ProgressBar";

import HousingEnvironmentQuestions from "./HousingEnvironmentQuestions/HousingEnvironemntQuestions";
import HouseholdCompositionQuestions from "./HouseholdCompositionQuestions/HouseholdCompositionQuestions";
import LifestyleCommitmentQuestions from "./LifestyleCommitmentQuestions/LifestyleCommitmentQuestions";
import ExperienceExpectationsQuestions from "./ExperienceExpectationsQuestions/ExperienceExpectationsQuestions";
import SpecificPreferencesQuestions from "./SpecificPreferencesQuestions/SpecificPreferencesQuestions";

import { finishHCSlice, finishHESlice, finishLCSlice, finishEESlice, finishSPSlice } from "../../redux/MatchFormSlice";

import ReviewQuestions from "./ReviewQuestions/ReviewQuestions";

import InputButton from "../Input/InputButton/InputButton";

import "./Questions.css";

export default function Questions() {
  const finishHE = useSelector((store) => store[finishHESlice.name]);
  const finishHC = useSelector((store) => store[finishHCSlice.name]);
  const finishLC = useSelector((store) => store[finishLCSlice.name]);
  const finishEE = useSelector((store) => store[finishEESlice.name]);
  const finishSP = useSelector((store) => store[finishSPSlice.name]);

  const [currQuestions, setCurrQuestions] = useState(0);

  useEffect(() => {
    const getQuestionNumber = () => {
      const spId = ["sp1", "sp2", "sp3", "sp4", "sp5", "sp6"];
      const eeId = ["ee1", "ee2", "ee3", "ee4"];
      const lcId = ["lc1", "lc2", "lc3", "lc4", "lc5"];
      const hcId = ["hc1", "hc2", "hc3", "hc4"];
      const heId = ["he1", "he2", "he3", "he4"];

      const initSP = spId.map((id) => sessionStorage.getItem(id) !== null);

      if (!initSP.includes(false)) {
        return 5;
      }

      const initEE = eeId.map((id) => sessionStorage.getItem(id) !== null);

      if (!initEE.includes(false)) {
        return 4;
      }

      const initLC = lcId.map((id) => sessionStorage.getItem(id) !== null);

      if (!initLC.includes(false)) {
        return 3;
      }

      const initHC = hcId.map((id) => sessionStorage.getItem(id) !== null);

      if (!initHC.includes(false)) {
        return 2;
      }

      const initHE = heId.map((id) => sessionStorage.getItem(id) !== null);

      if (!initHE.includes(false)) {
        return 1;
      }

      return 0; // Default value if none are true
    };

    setCurrQuestions(getQuestionNumber());
  }, []);

  const onClickNext = () => {
    setCurrQuestions((preState) => preState + 1);
  };

  const onClickBack = () => {
    setCurrQuestions((preState) => preState - 1);
  };

  const onSubmitForm = (event) => {
    event.preventDefault();
  };
  const isNextAble =
    (currQuestions === 0 && finishHE === true) ||
    (currQuestions === 1 && finishHC === true) ||
    (currQuestions === 2 && finishLC === true) ||
    (currQuestions === 3 && finishEE === true) ||
    (currQuestions === 4 && finishSP === true);

  return (
    <div className="bg-[#F8EAC9] py-10" id="form">
      <form className="flex flex-col min-h-screen w-max m-auto rounded-2xl" onSubmit={onSubmitForm}>
        {/* Question lists */}
        <ul className="flex flex-col items-end justify-start max-w-max gap-5 rounded-xl bg-white py-20 pr-12 pl-24">
          <ProgressBar currIdx={currQuestions} />
          {currQuestions === 0 && <HousingEnvironmentQuestions />}
          {currQuestions === 1 && <HouseholdCompositionQuestions />}
          {currQuestions === 2 && <LifestyleCommitmentQuestions />}
          {currQuestions === 3 && <ExperienceExpectationsQuestions />}
          {currQuestions === 4 && <SpecificPreferencesQuestions />}
          {currQuestions === 5 && <ReviewQuestions />}
        </ul>
        <div className="flex justify-between items-center mt-5">
          <InputButton
            id="nextButton"
            inputStyle="hidden"
            labelStyle={`bg-[#7C0F0F] text-white rounded-md cursor-pointer font-semibold block ${
              currQuestions === 0 ? "disabledButton" : ""
            }`}
            disabled={currQuestions === 0}>
            <a href="#form" onClick={onClickBack} className="block px-6 py-3">
              Back
            </a>
          </InputButton>
          {finishSP && (
            /* Submit button */
            <>
              <label htmlFor="submitButton" className="submitLabel">
                <span
                  style={{
                    fontFamily: "Koulen, sans-serif",
                    fontStyle: "normal",
                    fontWeight: 600,
                  }}>
                  Find your matched pets
                </span>
              </label>
              <input type="submit" className="hidden" id="submitButton" />
            </>
          )}
          <InputButton
            id="backButton"
            inputStyle="hidden"
            labelStyle={`bg-[#7C0F0F] text-white rounded-md cursor-pointer font-semibold block ${
              !isNextAble ? "disabledButton" : ""
            }`}
            disabled={!isNextAble}>
            <a href="#form" onClick={onClickNext} className="block px-6 py-3">
              Next
            </a>
          </InputButton>
        </div>
      </form>
    </div>
  );
}
