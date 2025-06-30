import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import user from "../../../assets/images/user.png";

import QuestionContainer from "../QuestionComponent/QuestionContainer/QuestionContainer";
import AnswerContainer from "../QuestionComponent/AnswerContainer/AnswerContainer";
import OptionContainer from "../QuestionComponent/OptionContainer/OptionContainer";
import WaitingAnswerSpinner from "../QuestionComponent/WaitingAnswerSpinner.jsx/WaitingAnswerSpinner";
import UserLogo from "../QuestionComponent/UserLogo/UserLogo";

import InputDatalist from "../../Input/InputDataList/InputDataList";
import InputRadio from "../../Input/InputRadio/InputRadio";
import InputButton from "../../Input/InputButton/InputButton";

import SessionStorage from "../../../features/sessionStorage.jsx";

import { finishEESlice } from "../../../redux/MatchFormSlice.jsx";

export default function ExperienceExpectationsQuestions() {
  const dispatch = useDispatch();
  const [currQuestions, setCurrQuestions] = useState(1);

  /** 
    currQuestions represent the number of questions will display
    1 --> [ee1]
    2 --> [ee1, ee2]
    3 --> [ee1, ee2, ee3]
    4 --> [ee1, ee2, ee3, ee4]
  **/

  const questions = [
    <li key={"EE1"} className="w-full">
      <QuestionEE1 getNextQuestion={getNextQuestion} />
    </li>,
    <li key={"EE2"} className="w-full">
      <QuestionEE2 getNextQuestion={getNextQuestion} />
    </li>,
    <li key={"EE3"} className="w-full">
      <QuestionEE3 getNextQuestion={getNextQuestion} />
    </li>,
    <li key={"EE4"} className="w-full">
      <QuestionEE4 getNextQuestion={getNextQuestion} />
    </li>,
  ];

  function getNextQuestion() {
    if (currQuestions < questions.length) {
      setCurrQuestions(currQuestions + 1);
    } else {
      dispatch(finishEESlice.actions.assign(true));
    }
  }

  return (
    <>
      <div className="flex justify-start w-full">
        <h2 className="text-2xl font-bold text-[#7C0F0F]">Experience & Expectations</h2>
      </div>
      {questions.slice(0, currQuestions)}
    </>
  );
}

function QuestionEE1({ getNextQuestion }) {
  const [hasAnswer, setHasAnswer] = useState(false);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    const storedAnswer = SessionStorage.getItem("ee1");

    if (storedAnswer !== null) {
      // if session storage have the answered, then move to the next question
      setAnswer((preState) => storedAnswer);
      setHasAnswer((preState) => true);
      getNextQuestion();
    }
  }, []);

  const onClickNo = () => {
    setHasAnswer((preState) => true);
    SessionStorage.setItem("ee1", false);
    setAnswer((preState) => false);
    getNextQuestion();
  };

  const onClickYes = () => {
    setHasAnswer((preState) => true);
    SessionStorage.setItem("ee1", true);
    setAnswer((preState) => true);
    getNextQuestion();
  };

  return (
    <div className="xl:max-w-screen">
      {/* Question container - contains the questions */}
      <QuestionContainer>
        <p className={`${!hasAnswer ? "typewriter" : ""} overflow-hidden`}>
          Have you ever house-trained a pet or dealt with behavioral issues?
        </p>
      </QuestionContainer>

      {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
      <div className={`flex items-end justify-end xl:mt-3 mt-5 ${!hasAnswer ? "option" : ""}`}>
        {/* If the answer is empty string ==> Display list of options */}
        <OptionContainer visible={!hasAnswer}>
          <div className="flex flex-row flex-wrap gap-2">
            <InputRadio
              id="ee1b"
              name="ee1"
              inputStyle="hidden"
              labelStyle="block px-6 py-3 border-2 border-[#E0E0E0] rounded-md cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300"
              onClickHandler={onClickYes}>
              Yes
            </InputRadio>
            <InputRadio
              id="ee1a"
              name="ee1"
              inputStyle="hidden"
              labelStyle="block px-6 py-3 border-2 border-[#E0E0E0] rounded-md cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300"
              onClickHandler={onClickNo}>
              No
            </InputRadio>
          </div>
        </OptionContainer>

        {/* If the answer is NOT empty string ==> Display answer */}
        <AnswerContainer visible={hasAnswer}>
          <p>{answer === false ? "No" : "Yes"}</p>
        </AnswerContainer>

        <UserLogo src={user} />
      </div>

      {/* If the answer is empty string ==> There is spinner represents the company is waiting to user's answer */}
      <WaitingAnswerSpinner visible={!hasAnswer} />
    </div>
  );
}

function QuestionEE2({ getNextQuestion }) {
  const [hasAnswer, setHasAnswer] = useState(false);
  const [answers, setAnswers] = useState("");

  const options = ["I don't know"];

  useEffect(() => {
    const storedAnswer = SessionStorage.getItem("ee2");

    if (storedAnswer !== null) {
      // if session storage have the answered, then move to the next question
      setAnswers((preSTate) => storedAnswer);
      setHasAnswer((preState) => true);
      getNextQuestion();
    }
  }, []);

  const onClickOption = (optionsList) => {
    setAnswers((preState) => optionsList);
  };

  const onClickNext = () => {
    if (answers.length === 0) {
    } else {
      setHasAnswer((preState) => true);
      SessionStorage.setItem("ee2", answers);
      getNextQuestion();
    }
  };
  return (
    <div className="xl:max-w-screen">
      {/* Question container - contains the questions */}
      <QuestionContainer>
        <p className={`${!hasAnswer ? "typewriter" : ""} overflow-hidden`}>
          What would you do if the pet developed expensive medical problems
        </p>
      </QuestionContainer>

      {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
      <div className={`flex items-end justify-end xl:mt-3 mt-5 ${!hasAnswer ? "option" : ""}`}>
        {/* If the answer is empty string ==> Display list of options */}
        <OptionContainer visible={!hasAnswer}>
          <div className="relative z-30 flex flex-col items-end">
            <InputDatalist
              id={"ee3a"}
              children={""}
              placeholder={"Choose options"}
              defaultOptions={options}
              onSubmitAnswer={onClickOption}
            />

            <InputButton
              value="Next"
              onClickHandler={onClickNext}
              inputStyle="hidden"
              id="ee3NextButton"
              labelStyle="hover:bg-[#7C0F0F] text-white px-3 py-1 rounded-sm font-bold mt-2 w-max cursor-pointer bg-[#669bbc] transition-all duration-300">
              Next
            </InputButton>
          </div>
        </OptionContainer>

        {/* If the answer is NOT empty string ==> Display answer */}
        <AnswerContainer visible={hasAnswer}>
          <p>I will:</p>
          {answers !== "" && (
            <ul className="list-decimal list-inside">
              {answers.map((answer) => (
                <li key={answer}>{answer}</li>
              ))}
            </ul>
          )}
        </AnswerContainer>

        <UserLogo src={user} />
      </div>

      {/* If the answer is empty string ==> There is spinner represents the company is waiting to user's answer */}
      <WaitingAnswerSpinner visible={!hasAnswer} />
    </div>
  );
}

function QuestionEE3({ getNextQuestion }) {
  const [hasAnswer, setHasAnswer] = useState(false);
  const [answers, setAnswers] = useState("");

  const options = ["The pet characteristics does not fit mine"];

  useEffect(() => {
    const storedAnswer = SessionStorage.getItem("ee3");

    if (storedAnswer !== null) {
      // if session storage have the answered, then move to the next question
      setAnswers((preState) => storedAnswer);
      setHasAnswer((preState) => true);
      getNextQuestion();
    }
  }, []);

  const onClickOption = (optionsList) => {
    setAnswers((preState) => optionsList);
  };

  const onClickNext = () => {
    if (answers.length === 0) {
    } else {
      setHasAnswer((preState) => true);
      SessionStorage.setItem("ee3", answers);
      getNextQuestion();
    }
  };
  return (
    <div className="xl:max-w-screen">
      {/* Question container - contains the questions */}
      <QuestionContainer>
        <p className={`${!hasAnswer ? "typewriter" : ""} overflow-hidden`}>
          Under what circumstances would you consider returning or rehoming the pet?
        </p>
      </QuestionContainer>

      {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
      <div className={`flex items-end justify-end xl:mt-3 mt-5 ${!hasAnswer ? "option" : ""}`}>
        {/* If the answer is empty string ==> Display list of options */}
        <OptionContainer visible={!hasAnswer}>
          <div className="relative z-30 flex flex-col items-end">
            <InputDatalist
              id={"ee3a"}
              children={""}
              placeholder={"Choose options"}
              defaultOptions={options}
              onSubmitAnswer={onClickOption}
            />

            <InputButton
              value="Next"
              onClickHandler={onClickNext}
              inputStyle="hidden"
              id="ee3NextButton"
              labelStyle="hover:bg-[#7C0F0F] text-white px-3 py-1 rounded-sm font-bold mt-2 w-max cursor-pointer bg-[#669bbc] transition-all duration-300">
              Next
            </InputButton>
          </div>
        </OptionContainer>

        {/* If the answer is NOT empty string ==> Display answer */}
        <AnswerContainer visible={hasAnswer}>
          <p>I will return the pet when:</p>
          {answers !== "" && (
            <ul className="list-decimal list-inside">
              {answers.map((answer) => (
                <li key={answer}>{answer}</li>
              ))}
            </ul>
          )}
        </AnswerContainer>

        <UserLogo src={user} />
      </div>

      {/* If the answer is empty string ==> There is spinner represents the company is waiting to user's answer */}
      <WaitingAnswerSpinner visible={!hasAnswer} />
    </div>
  );
}

function QuestionEE4({ getNextQuestion }) {
  const [hasAnswer, setHasAnswer] = useState(false);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    const storedAnswer = SessionStorage.getItem("ee4");

    if (storedAnswer !== null) {
      // if session storage have the answered, then move to the next question
      setAnswer((preState) => storedAnswer);
      getNextQuestion();
      setHasAnswer((preState) => true);
    }
  }, []);

  const onClickNo = () => {
    getNextQuestion();
    setHasAnswer((preState) => true);
    setAnswer((preState) => false);
    SessionStorage.setItem("ee4", false);
  };

  const onClickYes = () => {
    getNextQuestion();
    setHasAnswer((preState) => true);
    setAnswer((preState) => true);
    SessionStorage.setItem("ee4", true);
  };
  return (
    <>
      <div className="xl:max-w-screen">
        {/* Question container - contains the questions */}
        <QuestionContainer>
          <p className={`${!hasAnswer ? "typewriter" : ""} overflow-hidden`}>
            {/* Running text */}
            Do you have a veterinarian selected, and can you afford routine and emergency veterinary care?
          </p>
        </QuestionContainer>
        {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
        <div className={`flex items-end justify-end xl:mt-3 mt-5 ${!hasAnswer ? "option" : ""}`}>
          {/* If the answer is empty string ==> Display list of options */}
          <OptionContainer visible={!hasAnswer}>
            <div className="flex flex-row gap-2 flex-wrap">
              <InputRadio
                id="ee4b"
                name="ee4"
                inputStyle="hidden"
                labelStyle="block px-6 py-3 border-2 border-[#E0E0E0] rounded-md cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300"
                onClickHandler={onClickYes}>
                Yes
              </InputRadio>
              <InputRadio
                id="ee4a"
                name="ee4"
                inputStyle="hidden"
                labelStyle="block px-6 py-3 border-2 border-[#E0E0E0] rounded-md cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300"
                onClickHandler={onClickNo}>
                No
              </InputRadio>
            </div>
          </OptionContainer>

          {/* If the answer is NOT empty string ==> Display answer */}
          <AnswerContainer visible={hasAnswer}>
            <p>{answer === false ? "No" : "Yes"}</p>
          </AnswerContainer>

          <UserLogo src={user} />
        </div>
      </div>

      {/* If the answer is empty string ==> There is spinner represents the company is waiting to user's answer */}
      <WaitingAnswerSpinner visible={!hasAnswer} />
    </>
  );
}
