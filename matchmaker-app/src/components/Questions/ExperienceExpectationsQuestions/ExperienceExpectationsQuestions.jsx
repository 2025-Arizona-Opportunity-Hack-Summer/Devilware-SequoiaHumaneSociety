import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import user from "../../../assets/images/user.png";

import QuestionContainer from "../QuestionComponent/QuestionContainer/QuestionContainer";
import AnswerContainer from "../QuestionComponent/AnswerContainer/AnswerContainer";
import OptionContainer from "../QuestionComponent/OptionContainer/OptionContainer";
import WaitingAnswerSpinner from "../QuestionComponent/WaitingAnswerSpinner.jsx/WaitingAnswerSpinner";
import UserLogo from "../QuestionComponent/UserLogo/UserLogo";

import InputDatalist from "../../Input/InputDataList/InputDataList";
import InputRadio from "../../Input/InputRadio/InputRadio";

import InputButton from "../../Input/InputButton/InputButton";

import { ee1Slice, ee2Slice, ee3Slice, ee4Slice } from "../../../redux/ExperienceExpectationsSlice.jsx";

export function QuestionEE1({ getNextQuestion }) {
  const dispatch = useDispatch();
  const initialAnswer = useSelector((store) => store[ee1Slice.name]);
  const [hasAnswer, setHasAnswer] = useState(false);
  const [answer, setAnswer] = useState(initialAnswer);

  useEffect(() => {
    if (initialAnswer !== "") {
      setHasAnswer((preState) => true);
      getNextQuestion();
    }
  }, []);

  const onClickNo = () => {
    setHasAnswer((preState) => true);
    dispatch(ee1Slice.actions.assign(false));
    setAnswer((preState) => false);
    getNextQuestion();
  };

  const onClickYes = () => {
    setHasAnswer((preState) => true);
    dispatch(hc2Slice.actions.assign(true));
    setAnswer((preState) => true);
    getNextQuestion();
  };

  return (
    <div className="xl:max-w-2xl xl:w-[800px]">
      {/* Question container - contains the questions */}
      <QuestionContainer>
        <p className={`${!hasAnswer ? "typewriter" : ""} overflow-hidden`}>
          Have you ever house-trained a pet or dealt with behavioral issues?
        </p>
      </QuestionContainer>

      {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
      <div className={`flex items-end justify-end mt-3 ${!hasAnswer ? "answer" : ""}`}>
        {/* If the answer is empty string ==> Display list of options */}
        <OptionContainer visible={!hasAnswer}>
          <InputRadio
            id="ee1a"
            name="ee1"
            inputStyle="hidden"
            labelStyle="block px-6 py-3 border-2 border-[#E0E0E0] rounded-md cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300"
            onClickHandler={onClickNo}>
            No
          </InputRadio>

          <InputRadio
            id="ee1b"
            name="ee1"
            inputStyle="hidden"
            labelStyle="block px-6 py-3 border-2 border-[#E0E0E0] rounded-md cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300"
            onClickHandler={onClickYes}>
            Yes
          </InputRadio>
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

export function QuestionEE2({ getNextQuestion }) {
  const dispatch = useDispatch();
  const initialAnswer = useSelector((store) => store[ee2Slice.name]);

  const [hasAnswer, setHasAnswer] = useState(false);
  const [answers, setAnswers] = useState(initialAnswer);

  const options = ["I don't know"];

  useEffect(() => {
    if (initialAnswer !== "") {
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
      dispatch(ee2Slice.actions.assign(answers));
      getNextQuestion();
    }
  };
  return (
    <div className="xl:max-w-2xl xl:w-[800px]">
      {/* Question container - contains the questions */}
      <QuestionContainer>
        <p className={`${!hasAnswer ? "typewriter" : ""} overflow-hidden`}>
          What would you do if the pet developed expensive medical problems
        </p>
      </QuestionContainer>

      {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
      <div className={`flex items-end justify-end mt-3 ${!hasAnswer ? "answer" : ""}`}>
        {/* If the answer is empty string ==> Display list of options */}
        <OptionContainer visible={!hasAnswer}>
          <div className="relative z-30 flex flex-col items-end">
            <InputDatalist
              id={"ee3a"}
              labelText={""}
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

export function QuestionEE3({ getNextQuestion }) {
  const dispatch = useDispatch();
  const initialAnswer = useSelector((store) => store[ee3Slice.name]);

  const [hasAnswer, setHasAnswer] = useState(false);
  const [answers, setAnswers] = useState(initialAnswer);

  const options = ["The pet characteristics does not fit mine"];

  useEffect(() => {
    if (initialAnswer !== "") {
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
      dispatch(ee3Slice.actions.assign(answers));
      getNextQuestion();
    }
  };
  return (
    <div className="xl:max-w-2xl xl:w-[800px]">
      {/* Question container - contains the questions */}
      <QuestionContainer>
        <p className={`${!hasAnswer ? "typewriter" : ""} overflow-hidden`}>
          Under what circumstances would you consider returning or rehoming the pet?
        </p>
      </QuestionContainer>

      {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
      <div className={`flex items-end justify-end mt-3 ${!hasAnswer ? "answer" : ""}`}>
        {/* If the answer is empty string ==> Display list of options */}
        <OptionContainer visible={!hasAnswer}>
          <div className="relative z-30 flex flex-col items-end">
            <InputDatalist
              id={"ee3a"}
              labelText={""}
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

export function QuestionEE4({ getNextQuestion }) {
  const dispatch = useDispatch();
  const initialAnswer = useSelector((store) => store[ee4Slice.name]);

  const [hasAnswer, setHasAnswer] = useState(false);
  const [answer, setAnswer] = useState(initialAnswer);

  useEffect(() => {
    if (initialAnswer !== null) {
      getNextQuestion();
      setHasAnswer((preState) => true);
    }
  }, []);

  const onClickNo = () => {
    getNextQuestion();
    setHasAnswer((preState) => true);
    setAnswer((preState) => false);
    dispatch(ee4Slice.actions.assign(false));
  };

  const onClickYes = () => {
    getNextQuestion();
    setHasAnswer((preState) => true);
    setAnswer((preState) => true);
    dispatch(ee4Slice.actions.assign(true));
  };
  return (
    <>
      <div className="xl:max-w-2xl xl:w-[800px]">
        {/* Question container - contains the questions */}
        <QuestionContainer>
          <p className={`${!hasAnswer ? "typewriter" : ""} overflow-hidden`}>
            {/* Running text */}
            Do you have a veterinarian selected, and can you afford routine and emergency veterinary care?
          </p>
        </QuestionContainer>
        {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
        <div className={`flex items-end justify-end mt-3 ${!hasAnswer ? "answer" : ""}`}>
          {/* If the answer is empty string ==> Display list of options */}
          <OptionContainer visible={!hasAnswer}>
            <InputRadio
              id="ee4a"
              name="ee4"
              inputStyle="hidden"
              labelStyle="block px-6 py-3 border-2 border-[#E0E0E0] rounded-md cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300"
              onClickHandler={onClickNo}>
              No
            </InputRadio>

            <InputRadio
              id="ee4b"
              name="ee4"
              inputStyle="hidden"
              labelStyle="block px-6 py-3 border-2 border-[#E0E0E0] rounded-md cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300"
              onClickHandler={onClickYes}>
              Yes
            </InputRadio>
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
