import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProgressBar from "./ProgressBar/ProgressBar";
import {
  QuestionHE1,
  QuestionHE2,
  QuestionHE3,
  QuestionHE4,
  QuestionHE5,
} from "./HousingEnvironmentQuestions/HousingEnvironemntQuestions";

import {
  QuestionHC1,
  QuestionHC2,
  QuestionHC3,
  QuestionHC4,
} from "./HouseholdCompositionQuestions/HouseholdCompositionQuestions";

import {
  QuestionLC1,
  QuestionLC2,
  QuestionLC3,
  QuestionLC4,
  QuestionLC5,
} from "./LifestyleCommitmentQuestions/LifestyleCommitmentQuestions";

import { finishHCSlice, finishHESlice, finishLCSlice } from "../../redux/MatchFormSlice";

import InputButton from "../Input/InputButton/InputButton";

import "./Questions.css";

export default function Questions() {
  const finishHE = useSelector((store) => store[finishHESlice.name]);
  const finishHC = useSelector((store) => store[finishHCSlice.name]);
  const finishLC = useSelector((store) => store[finishLCSlice.name]);

  const [currQuestions, setCurrQuestions] = useState(0);
  const [finish, setFinish] = useState(false);

  const totalQuestions = 5;

  const onClickNext = () => {
    setCurrQuestions((preState) => preState + 1);
  };

  const onClickBack = () => {
    setCurrQuestions((preState) => preState - 1);
  };

  const isNextAble =
    (currQuestions === 0 && finishHE === true) ||
    (currQuestions === 1 && finishHC === true) ||
    (currQuestions === 2 && finishLC === true);
  return (
    <div className="bg-[#F8EAC9] py-10" id="form">
      <form className="flex flex-col min-h-screen w-max m-auto rounded-2xl">
        {/* Question lists */}
        <ul className="flex flex-col items-end justify-start max-w-max gap-5 rounded-xl bg-white py-20 pr-12 pl-24">
          <ProgressBar currIdx={currQuestions} />
          {currQuestions === 0 && <HousingEnvironmentQuestions />}
          {currQuestions === 1 && <HouseholdCompositionQuestions />}
          {currQuestions === 2 && <LifeStyleCommitmentQuestions />}
        </ul>
        <div className="flex justify-between">
          <InputButton
            id="nextButton"
            inputStyle="hidden"
            labelStyle={`bg-[#7C0F0F] text-white mt-5 rounded-md cursor-pointer font-semibold block ${
              currQuestions === 0 ? "disabledButton" : ""
            }`}
            disabled={currQuestions === 0}>
            <a href="#form" onClick={onClickBack} className="block px-6 py-3">
              Back
            </a>
          </InputButton>
          {finish && (
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
            id="nextButton"
            inputStyle="hidden"
            labelStyle={`bg-[#7C0F0F] text-white mt-5 rounded-md cursor-pointer font-semibold block ${
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

function HousingEnvironmentQuestions() {
  const dispatch = useDispatch();
  const [currQuestions, setCurrQuestions] = useState(1);

  const questions = [
    <li key={"HE1"}>
      <QuestionHE1 getNextQuestion={getNextQuestion} />
    </li>,
    <li key={"HE2"}>
      <QuestionHE2 getNextQuestion={getNextQuestion} />
    </li>,
    <li key={"HE3"}>
      <QuestionHE3 getNextQuestion={getNextQuestion} />
    </li>,
    <li key={"HE4"}>
      <QuestionHE4 getNextQuestion={getNextQuestion} />
    </li>,
    <li key={"HE5"}>
      <QuestionHE5 getNextQuestion={getNextQuestion} />
    </li>,
  ];

  function getNextQuestion() {
    if (currQuestions < questions.length) {
      setCurrQuestions(currQuestions + 1);
    } else {
      dispatch(finishHESlice.actions.assign(true));
    }
  }

  // pendingQuestions representes questions that are in waiting list

  return (
    <>
      <div className="flex justify-start w-full">
        <h2 className="text-2xl font-semibold text-[#7C0F0F]">Housing Environment</h2>
      </div>
      {questions.slice(0, currQuestions)}
    </>
  );
}

function HouseholdCompositionQuestions() {
  const dispatch = useDispatch();
  const [currQuestions, setCurrQuestions] = useState(1);

  const questions = [
    <li key={"HC1"}>
      <QuestionHC1 getNextQuestion={getNextQuestion} />
    </li>,
    <li key={"HC2"}>
      <QuestionHC2 getNextQuestion={getNextQuestion} />
    </li>,
    <li key={"HC3"}>
      <QuestionHC3 getNextQuestion={getNextQuestion} />
    </li>,
    <li key={"HC4"}>
      <QuestionHC4 getNextQuestion={getNextQuestion} />
    </li>,
  ];

  function getNextQuestion() {
    if (currQuestions < questions.length) {
      setCurrQuestions((cnt) => cnt + 1);
    } else {
      dispatch(finishHCSlice.actions.assign(true));
    }
  }

  // pendingQuestions representes questions that are in waiting list

  return (
    <>
      <div className="flex justify-start w-full">
        <h2 className="text-2xl font-semibold text-[#7C0F0F]">Household Composition</h2>
      </div>
      {questions.slice(0, currQuestions)}
    </>
  );
}

function LifeStyleCommitmentQuestions() {
  const dispatch = useDispatch();
  const [currQuestions, setCurrQuestions] = useState(1);

  const questions = [
    <li key={"LC1"}>
      <QuestionLC1 getNextQuestion={getNextQuestion} />
    </li>,
    <li key={"LC2"}>
      <QuestionLC2 getNextQuestion={getNextQuestion} />
    </li>,
    <li key={"LC3"}>
      <QuestionLC3 getNextQuestion={getNextQuestion} />
    </li>,
    <li key={"LC4"}>
      <QuestionLC4 getNextQuestion={getNextQuestion} />
    </li>,
    <li key={"LC5"}>
      <QuestionLC5 getNextQuestion={getNextQuestion} />
    </li>,
  ];

  function getNextQuestion() {
    if (currQuestions < questions.length) {
      setCurrQuestions(currQuestions + 1);
    } else {
      dispatch(finishLCSlice.actions.assign(true));
    }
  }

  // pendingQuestions representes questions that are in waiting list

  return (
    <>
      <div className="flex justify-start w-full">
        <h2 className="text-2xl font-semibold text-[#7C0F0F]">Lifestyle & Commitment</h2>
      </div>
      {questions.slice(0, currQuestions)}
    </>
  );
}
