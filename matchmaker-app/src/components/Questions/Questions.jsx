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

import { finishHESlice } from "../../redux/MatchFormSlice";

import InputButton from "../Input/InputButton/InputButton";

import "./Questions.css";

export default function Questions() {
  const finishHE = useSelector((store) => store[finishHESlice.name]);

  const [currQuestions, setCurrQuestions] = useState(0);
  const [finish, setFinish] = useState(false);

  const totalQuestions = 5;

  const onClickNext = () => {
    window.scrollTo(0, 0);
    setCurrQuestions((preState) => preState + 1);
  };

  const onClickBack = () => {
    window.scrollTo(0, 0);

    setCurrQuestions((preState) => preState - 1);
  };

  const isNextAble = currQuestions == 0 && finishHE == true;
  return (
    <div className="bg-[#F8EAC9] py-10">
      <form className="flex flex-col min-h-screen w-max m-auto rounded-2xl">
        {/* Question lists */}
        <ul className="flex flex-col items-end justify-start max-w-max gap-5 rounded-xl bg-white py-20 pr-12 pl-24">
          <ProgressBar currIdx={currQuestions} />
          {currQuestions === 0 && <HousingEnvironmentQuestions />}
          {currQuestions === 1 && <HouseholdCompositionQuestions />}
        </ul>
        <div className="flex justify-between">
          <InputButton
            id="backButton"
            onClickHandler={onClickBack}
            inputStyle="hidden"
            labelStyle={`bg-[#7C0F0F] text-white px-6 py-3 mt-5 rounded-md cursor-pointer font-semibold block ${
              currQuestions === 0 ? "disabledButton" : ""
            }`}
            disabled={currQuestions === 0}>
            Back
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
            onClickHandler={onClickNext}
            inputStyle="hidden"
            labelStyle={`bg-[#7C0F0F] text-white px-6 py-3 mt-5 rounded-md cursor-pointer font-semibold block ${
              !isNextAble ? "disabledButton" : ""
            }`}
            disabled={!isNextAble}>
            Next
          </InputButton>
        </div>
      </form>
    </div>
  );
}

function HousingEnvironmentQuestions() {
  const dispatch = useDispatch();

  const [activeQuestions, setActiveQuestions] = useState([
    <li key={"HE1"}>
      <QuestionHE1 getNextQuestion={getNextQuestion} />
    </li>,
  ]);

  function getNextQuestion() {
    if (pendingQuestions.length > 0) {
      const nextQuestion = pendingQuestions.shift();
      setActiveQuestions((prevQuestions) => [...prevQuestions, nextQuestion]);
    } else {
      dispatch(finishHESlice.actions.assign(true));
    }
  }

  // pendingQuestions representes questions that are in waiting list
  const pendingQuestions = [
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

  return (
    <>
      <div className="flex justify-start w-full">
        <h2 className="text-2xl font-semibold text-[#7C0F0F]">Housing Environment</h2>
      </div>
      {activeQuestions}
    </>
  );
}

function HouseholdCompositionQuestions() {
  const [activeQuestions, setActiveQuestions] = useState([
    <li key={"HC1"}>
      <QuestionHC1 onSubmitAnswer={onSubmitAnswer} />
    </li>,
  ]);

  function onSubmitAnswer(newAnswer) {
    //setAnswer((prevAnswers) => [...prevAnswers, newAnswer]);
    if (pendingQuestions.length > 0) {
      const nextQuestion = pendingQuestions.shift();
      setActiveQuestions((prevQuestions) => [...prevQuestions, nextQuestion]);
    }
  }

  // pendingQuestions representes questions that are in waiting list
  const pendingQuestions = [
    <li key={"HC2"}>
      <QuestionHC2 onSubmitAnswer={onSubmitAnswer} />
    </li>,
    <li key={"HC3"}>
      <QuestionHC3 onSubmitAnswer={onSubmitAnswer} />
    </li>,
    <li key={"HC4"}>
      <QuestionHC4 onSubmitAnswer={onSubmitAnswer} />
    </li>,
  ];

  return <>{activeQuestions}</>;
}
