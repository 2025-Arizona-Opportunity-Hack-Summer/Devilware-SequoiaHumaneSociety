import { useState } from "react";

import {
  QuestionHE1,
  QuestionHE2,
  QuestionHE3,
  QuestionHE4,
  QuestionHE5,
} from "./HousingEnvironmentQuestions/HousingEnvironemntQuestions";

export default function Questions() {
  const [answers, setAnswer] = useState([]);
  const [activeQuestions, setActiveQuestions] = useState([
    <li key={"HE1"}>
      <QuestionHE1 onSubmitAnswer={onSubmitAnswer} />
    </li>,
  ]);

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
    }
  }

  return (
    <ul
      className="flex flex-col items-end max-w-max m-auto gap-5"
      style={{ fontFamily: "Koh Santepheap, serif" }}
    >
      {activeQuestions}
    </ul>
  );
}
