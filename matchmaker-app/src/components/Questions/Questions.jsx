import { useState } from "react";

import {
  QuestionHE1,
  QuestionHE2,
  QuestionHE3,
  QuestionHE4,
  QuestionHE5,
} from "./HousingEnvironmentQuestions/HousingEnvironemntQuestions";

import "./Questions.css";

export default function Questions() {
  const [answers, setAnswer] = useState([]);
  const [activeQuestions, setActiveQuestions] = useState([
    <li key={"HE1"}>
      <QuestionHE1 onSubmitAnswer={onSubmitAnswer} />
    </li>,
  ]);
  const [finish, setFinish] = useState(false);

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

  function onSubmitAnswer(newAnswer) {
    setAnswer((prevAnswers) => [...prevAnswers, newAnswer]);
    if (pendingQuestions.length > 0) {
      const nextQuestion = pendingQuestions.shift();
      setActiveQuestions((prevQuestions) => [...prevQuestions, nextQuestion]);
    } else {
      setFinish((preState) => true);
    }
  }

  return (
    <div className="bg-[#F8EAC9]">
      <form className="flex flex-col px-28 pt-10 min-h-screen bg-white w-max m-auto">
        <ul
          className="flex flex-col items-end justify-start max-w-max gap-5 rounded-xl"
          style={{ fontFamily: "Koh Santepheap, serif" }}
        >
          {activeQuestions}
        </ul>
        {finish && (
          <>
            <label
              htmlFor="submitButton"
              // className="relative cursor-pointer rounded-md bg-[#7C0F0F] before:absolute before:w-[0px] before:h-full border-2 border-[#7C0F0F] before:bg-white before:content-[''] before:top-0 before:left-0 before:z-10] hover:before:w-full transition-all duration-300"
              className="submitLabel"
            >
              <span
                style={{
                  fontFamily: "Koulen, sans-serif",
                  fontStyle: "normal",
                  fontWeight: 600,
                }}
              >
                Find your matched pets
              </span>
            </label>
            <input type="submit" className="hidden" id="submitButton" />
          </>
        )}
      </form>
    </div>
  );
}
