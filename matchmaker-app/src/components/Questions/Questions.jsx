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

import SessionStorage from "../features/sessionStorage";

import "./Questions.css";

export default function Questions() {
  const dispatch = useDispatch();
  const finishHE = useSelector((store) => store[finishHESlice.name]); // true when the user have answered all housing environment question
  const finishHC = useSelector((store) => store[finishHCSlice.name]); // true when the user have answered all household composition question
  const finishLC = useSelector((store) => store[finishLCSlice.name]); // true when the user have answered all lifesytle and commitmnet question
  const finishEE = useSelector((store) => store[finishEESlice.name]); // true when the user have answered all experience and expectation question
  const finishSP = useSelector((store) => store[finishSPSlice.name]); // true when the user have answered all specific perferences question

  const [openSubmit, setOpenSubmit] = useState(false); // the submit buttion only displays when openSubmit = true
  const [currQuestions, setCurrQuestions] = useState(0);
  /*
    currQuestions represents the index of current list of questions
    0 --> housing environment
    1 --> household composition
    2 --> lifestyle and commitment
    3 --> experience and expectation
    4 --> specific perferences
    5 --> review
  */

  useEffect(() => {
    // only called when the page is first reload

    /**
     * get which list of questions will display when the page is first reload
     * @returns {number} index of list of questions
     **/
    const getQuestionNumber = () => {
      const spId = ["sp1", "sp2", "sp3", "sp4", "sp5", "sp6"];
      const eeId = ["ee1", "ee2", "ee3", "ee4"];
      const lcId = ["lc1", "lc2", "lc3", "lc4", "lc5"];
      const hcId = ["hc1", "hc2", "hc3", "hc4"];
      const heId = ["he1", "he2", "he3", "he4"];

      const SPAnswers = spId.map((id) => SessionStorage.getItem(id) !== null);

      if (!SPAnswers.includes(false)) {
        // if the session storage store all SP answers then all other questions from EE, LC, HC, and HE have also been answered
        dispatch(finishSPSlice.actions.assign(true));
        dispatch(finishEESlice.actions.assign(true));
        dispatch(finishLCSlice.actions.assign(true));
        dispatch(finishHCSlice.actions.assign(true));
        dispatch(finishHESlice.actions.assign(true));
        return 5;
      }

      const EEAnswers = eeId.map((id) => SessionStorage.getItem(id) !== null);

      if (!EEAnswers.includes(false)) {
        // if the session storage store all EE answers then all other questions from LC, HC, and HE have also been answered
        dispatch(finishEESlice.actions.assign(true));
        dispatch(finishLCSlice.actions.assign(true));
        dispatch(finishHCSlice.actions.assign(true));
        dispatch(finishHESlice.actions.assign(true));
        return 4;
      }

      const LCAnswers = lcId.map((id) => SessionStorage.getItem(id) !== null);

      if (!LCAnswers.includes(false)) {
        // if the session storage store all LC answers then all other questions from HC, and HE have also been answered
        dispatch(finishLCSlice.actions.assign(true));
        dispatch(finishHCSlice.actions.assign(true));
        dispatch(finishHESlice.actions.assign(true));
        return 3;
      }

      const HCAnswers = hcId.map((id) => SessionStorage.getItem(id) !== null);

      if (!HCAnswers.includes(false)) {
        // if the session storage store all HC answers then all other questions from and HE have also been answered
        dispatch(finishHCSlice.actions.assign(true));
        dispatch(finishHESlice.actions.assign(true));
        return 2;
      }

      const HEAnswers = heId.map((id) => SessionStorage.getItem(id) !== null);

      if (!HEAnswers.includes(false)) {
        dispatch(finishHESlice.actions.assign(true));
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
    (currQuestions === 4 && finishSP === true); // true if the next button is clickable

  return (
    <div className="bg-[#F8EAC9] py-10" id="form">
      <form className="flex flex-col min-h-screen xl:w-[80vw] w-[90vw] m-auto rounded-2xl" onSubmit={onSubmitForm}>
        {/* Question lists */}
        <ul className="flex flex-col items-end justify-start max-w-screen gap-5 rounded-xl bg-white py-20 xl:pr-12 xl:pl-24 px-6">
          <ProgressBar currIdx={currQuestions} />
          {currQuestions === 0 && <HousingEnvironmentQuestions />}
          {currQuestions === 1 && <HouseholdCompositionQuestions />}
          {currQuestions === 2 && <LifestyleCommitmentQuestions />}
          {currQuestions === 3 && <ExperienceExpectationsQuestions />}
          {currQuestions === 4 && <SpecificPreferencesQuestions />}
          {currQuestions === 5 && <ReviewQuestions setOpenSubmit={setOpenSubmit} />}
        </ul>

        {/* Buttons */}
        <div className="flex justify-between items-center mt-5">
          <InputButton
            id="nextButton"
            inputStyle="hidden"
            labelStyle={`bg-[#7C0F0F] text-white rounded-md cursor-pointer font-semibold block ${
              currQuestions === 0 ? "disabled-button" : ""
            }`}
            disabled={currQuestions === 0}>
            {/* When button is clicked, move the page to the top again*/}
            <a href="#form" onClick={onClickBack} className="block px-6 py-3">
              Back
            </a>
          </InputButton>
          {openSubmit && (
            /* Submit button */
            <>
              <label htmlFor="submitButton" className="submit-label">
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
              !isNextAble ? "disabled-button" : ""
            }`}
            disabled={!isNextAble}>
            {/* When button is clicked, move the page to the top again*/}
            <a href="#form" onClick={onClickNext} className="block px-6 py-3">
              Next
            </a>
          </InputButton>
        </div>
      </form>
    </div>
  );
}
