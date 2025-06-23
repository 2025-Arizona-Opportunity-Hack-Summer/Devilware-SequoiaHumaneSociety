import { useState } from "react";

import ProgressBar from "./ProgressBar/ProgessBar";
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

  // activeQuestions representes questions that are displayed on the screen
  const [activeQuestions, setActiveQuestions] = useState([
    <li key={"HE1"}>
      <QuestionHE1 onSubmitAnswer={onSubmitAnswer} />
    </li>,
  ]);
  const [finish, setFinish] = useState(false);

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

  return (
    <div className="bg-[#F8EAC9] py-10">
      <form className="flex flex-col min-h-screen w-max m-auto rounded-2xl">
        {/* Question lists */}
        <ul className="flex flex-col items-end justify-start max-w-max gap-5 rounded-xl bg-white py-20 pr-12 pl-24">
          {activeQuestions}
        </ul>
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
      </form>
      <ProgressBar percentage={Math.round((answers.length / totalQuestions) * 100)} />
    </div>
  );
}
