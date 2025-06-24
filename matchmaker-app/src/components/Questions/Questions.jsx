import { useState } from "react";

import ProgressBar from "./ProgressBar/ProgessBar";
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

import "./Questions.css";

export default function Questions() {
  const [answers, setAnswer] = useState([]);
  const [currQuestions, setCurrQuestions] = useState(0);
  const [finish, setFinish] = useState(false);

  const totalQuestions = 5;

  function onSubmitAnswer(newAnswer) {
    setAnswer((prevAnswers) => [...prevAnswers, newAnswer]);
    if (pendingQuestions.length > 0) {
      const nextQuestion = pendingQuestions.shift();
      setActiveQuestions((prevQuestions) => [...prevQuestions, nextQuestion]);
    } else {
      setFinish((preState) => true);
    }
  }

  const onClickNext = () => {
    setCurrQuestions((preState) => preState + 1);
  };

  const onClickBack = () => {
    setCurrQuestions((preState) => preState - 1);
  };

  return (
    <div className="bg-[#F8EAC9] py-10">
      <form className="flex flex-col min-h-screen w-max m-auto rounded-2xl">
        {/* Question lists */}
        <ul className="flex flex-col items-end justify-start max-w-max gap-5 rounded-xl bg-white py-20 pr-12 pl-24">
          <HousingEnvironmentQuestions
            setAnswer={setAnswer}
            currQuestions={currQuestions}
            onClickNext={onClickNext}
            onClickBack={onClickBack}
          />
          <HouseholdCompositionQuestions
            setAnswer={setAnswer}
            currQuestions={currQuestions}
            onClickNext={onClickNext}
            onClickBack={onClickBack}
          />
        </ul>
        <div className="flex justify-between">
          <input type="button" value={"Back"} onClick={onClickBack} />
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
          <input type="button" value={"Next"} onClick={onClickNext} />
        </div>
      </form>
      <ProgressBar percentage={Math.round((answers.length / totalQuestions) * 100)} />
    </div>
  );
}

function HouseholdCompositionQuestions({ setAnswer, currQuestions }) {
  const [activeQuestions, setActiveQuestions] = useState([
    <li key={"HC1"}>
      <QuestionHC1 onSubmitAnswer={onSubmitAnswer} />
    </li>,
  ]);

  function onSubmitAnswer(newAnswer) {
    setAnswer((prevAnswers) => [...prevAnswers, newAnswer]);
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

  if (currQuestions !== 1) {
    return <></>;
  }
  return <>{activeQuestions}</>;
}

function HousingEnvironmentQuestions({ setAnswer, currQuestions }) {
  const [activeQuestions, setActiveQuestions] = useState([
    <li key={"HE1"}>
      <QuestionHE1 onSubmitAnswer={onSubmitAnswer} />
    </li>,
  ]);

  function onSubmitAnswer(newAnswer) {
    setAnswer((prevAnswers) => [...prevAnswers, newAnswer]);
    if (pendingQuestions.length > 0) {
      const nextQuestion = pendingQuestions.shift();
      setActiveQuestions((prevQuestions) => [...prevQuestions, nextQuestion]);
    }
  }

  // pendingQuestions representes questions that are in waiting list
  const pendingQuestions = [
    <li key={"HE2"}>
      <QuestionHE2 onSubmitAnswer={onSubmitAnswer} />
    </li>,
    <li key={"HE3"}>
      <QuestionHE3 onSubmitAnswer={onSubmitAnswer} />
    </li>,
    <li key={"HE4"}>
      <QuestionHE4 onSubmitAnswer={onSubmitAnswer} />
    </li>,
    <li key={"HE5"}>
      <QuestionHE5 onSubmitAnswer={onSubmitAnswer} />
    </li>,
  ];

  if (currQuestions !== 0) {
    return <></>;
  }
  return <>{activeQuestions}</>;
}
