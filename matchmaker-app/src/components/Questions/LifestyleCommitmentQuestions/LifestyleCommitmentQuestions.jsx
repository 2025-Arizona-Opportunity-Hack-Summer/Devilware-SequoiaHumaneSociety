import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import user from "../../../assets/images/user.png";

import QuestionContainer from "../QuestionComponent/QuestionContainer/QuestionContainer";
import AnswerContainer from "../QuestionComponent/AnswerContainer/AnswerContainer";
import OptionContainer from "../QuestionComponent/OptionContainer/OptionContainer";
import WaitingAnswerSpinner from "../QuestionComponent/WaitingAnswerSpinner.jsx/WaitingAnswerSpinner";
import UserLogo from "../QuestionComponent/UserLogo/UserLogo";

import { lc1Slice, lc2Slice, lc3Slice, lc4Slice, lc5Slice } from "../../../redux/LifeStyleCommitmentSlice";

import InputRadio from "../../Input/InputRadio/InputRadio";

// import "./HouseholdCompositionQuestions.css";

export function QuestionLC1({ getNextQuestion }) {
  const dispatch = useDispatch();
  const initialAnswer = useSelector((store) => store[lc1Slice.name]);

  const [reason, setReasion] = useState(initialAnswer);
  const [hasAnswer, setHasAnswer] = useState(false);

  const onClickOption = (event) => {
    setReasion((prevState) => event.target.value);
    dispatch(lc1Slice.actions.assign(event.target.value));
    setHasAnswer((prevState) => true);
    getNextQuestion();
  };

  useEffect(() => {
    if (initialAnswer !== "") {
      getNextQuestion();
      setHasAnswer((preState) => true);
    }
  }, []);

  const options = ["Save a live", "Find companion"];

  const renderedOptions = options.map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ));
  return (
    <>
      <div className="xl:max-w-screen">
        <QuestionContainer>
          <p className={`${!hasAnswer ? "typewriter" : ""} overflow-hidden`}>
            What is your primary reason for wanting to adopt a pet?
          </p>
        </QuestionContainer>

        {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
        <div className={`flex items-end justify-end mt-3 ${!hasAnswer ? "answer" : ""}`}>
          {/* If the answer is empty string ==> Display list of options */}
          <OptionContainer visible={!hasAnswer}>
            <select
              id="lc1a"
              name="lc1a"
              className="block px-3 py-3 border-2 border-[#E0E0E0] rounded-md transition-all duration-300 focus:border-[#7C0F0F] hover:border-[#7C0F0F] cursor-pointer"
              onChange={onClickOption}
              value={reason}>
              <option value="" disabled></option>
              {renderedOptions}
            </select>
          </OptionContainer>
          {/* If the answer is NOT empty string ==> Display answer */}

          <AnswerContainer visible={hasAnswer}>
            <p>{reason}</p>
          </AnswerContainer>

          {/* Whether the answer is empty string or NOT, ALWAYS display user logo */}
          <div className="flex items-center">
            <img src={user} alt="you" className="xl:w-12 xl:h-12" />
          </div>
        </div>
      </div>

      <WaitingAnswerSpinner visible={!hasAnswer} />
    </>
  );
}

export function QuestionLC2({ getNextQuestion }) {
  const dispatch = useDispatch();
  const initialAnswer = useSelector((store) => store[lc2Slice.name]);
  const [hasAnswer, setHasAnswer] = useState(false);
  const [hour, setHour] = useState(initialAnswer);

  useEffect(() => {
    if (initialAnswer !== "") {
      setHasAnswer((preState) => true);
      getNextQuestion();
    }
  }, []);

  const onClickOption = (event) => {
    setHasAnswer((preState) => true);
    setHour((hour) => Number(event.target.value));
    dispatch(lc2Slice.actions.assign(Number(event.target.value)));
    getNextQuestion();
  };

  const hourOptions = Array(25)
    .fill(0)
    .map((_, idx) => idx);
  const renderedOptions = hourOptions.map((value) => (
    <option key={value} value={value}>
      {value}
    </option>
  ));
  return (
    <div className="xl:max-w-screen">
      {/* Question container - contains the questions */}
      <QuestionContainer>
        <p className={`${!hasAnswer ? "typewriter" : ""} overflow-hidden`}>
          How many hours can you dedicate daily to exercise, training, and interaction?
        </p>
      </QuestionContainer>

      {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
      <div className={`flex items-end justify-end mt-3 ${!hasAnswer ? "answer" : ""}`}>
        {/* If the answer is empty string ==> Display list of options */}
        <OptionContainer visible={!hasAnswer}>
          <select
            id="lc2a"
            name="lc2a"
            className="block px-3 py-3 border-2 border-[#E0E0E0] rounded-md transition-all duration-300 focus:border-[#7C0F0F] hover:border-[#7C0F0F] cursor-pointer"
            onChange={onClickOption}
            value={hour}>
            <option value="" disabled></option>
            {renderedOptions}
          </select>
        </OptionContainer>

        {/* If the answer is NOT empty string ==> Display answer */}
        <AnswerContainer visible={hasAnswer}>
          <p>{hour}</p>
        </AnswerContainer>

        <UserLogo src={user} />
      </div>

      {/* If the answer is empty string ==> There is spinner represents the company is waiting to user's answer */}
      <WaitingAnswerSpinner visible={!hasAnswer} />
    </div>
  );
}

export function QuestionLC3({ getNextQuestion }) {
  const dispatch = useDispatch();
  const initialAnswer = useSelector((store) => store[lc3Slice.name]);
  const [hasAnswer, setHasAnswer] = useState(false);
  const [activityLevel, setActivityLevel] = useState(initialAnswer);

  useEffect(() => {
    if (initialAnswer !== "") {
      setHasAnswer((preState) => true);
      getNextQuestion();
    }
  }, []);

  const onClickOption = (event) => {
    setHasAnswer((preState) => true);
    setActivityLevel((preState) => event.target.value);
    dispatch(lc3Slice.actions.assign(event.target.value));
    getNextQuestion();
  };

  const activityLevelOptions = ["Very active", "Moderately active", "Quiet Active"];

  const renderedOptions = activityLevelOptions.map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ));

  return (
    <div className="xl:max-w-screen">
      {/* Question container - contains the questions */}
      <QuestionContainer>
        <p className={`${!hasAnswer ? "typewriter" : ""} overflow-hidden`}>What is your activity level?</p>
      </QuestionContainer>

      {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
      <div className={`flex items-end justify-end mt-3 ${!hasAnswer ? "answer" : ""}`}>
        {/* If the answer is empty string ==> Display list of options */}
        <OptionContainer visible={!hasAnswer}>
          <select
            id="lc3a"
            name="lc3a"
            className="block px-3 py-3 border-2 border-[#E0E0E0] rounded-md transition-all duration-300 focus:border-[#7C0F0F] hover:border-[#7C0F0F] cursor-pointer"
            onChange={onClickOption}
            value={activityLevel}>
            <option value="" disabled></option>
            {renderedOptions}
          </select>
        </OptionContainer>

        {/* If the answer is NOT empty string ==> Display answer */}
        <AnswerContainer visible={hasAnswer}>
          <p>I am {activityLevel.toLowerCase()}</p>
        </AnswerContainer>

        <UserLogo src={user} />
      </div>

      {/* If the answer is empty string ==> There is spinner represents the company is waiting to user's answer */}
      <WaitingAnswerSpinner visible={!hasAnswer} />
    </div>
  );
}

export function QuestionLC4({ getNextQuestion }) {
  const dispatch = useDispatch();
  const initialAnswer = useSelector((store) => store[lc4Slice.name]);

  const [hasAnswer, setHasAnswer] = useState(false);
  const [plan, setPlan] = useState(initialAnswer.plan);
  const [frequency, setFrequency] = useState(initialAnswer.frequency);

  useEffect(() => {
    if (initialAnswer.frequency !== "") {
      getNextQuestion();
      setHasAnswer((preState) => true);
    }
  }, []);

  const onClickNever = (event) => {
    setHasAnswer((preState) => true);
    setFrequency((preState) => event.target.value);
    dispatch(lc4Slice.actions.assign({ frequency: "Never", plan: "" }));
    getNextQuestion();
  };

  const onClickNonNever = (event) => {
    setFrequency((preState) => event.target.value);
  };

  const onSelectPlan = (event) => {
    setPlan(event.target.value);
    setHasAnswer((preState) => true);
    dispatch(lc4Slice.actions.assign({ frequency: frequency, plan: event.target.value }));
    getNextQuestion();
  };

  return (
    <>
      <div className="xl:max-w-screen">
        {/* Question container - contains the questions */}
        <QuestionContainer>
          <p className={`${!hasAnswer ? "typewriter" : ""} overflow-hidden`}>
            {/* Running text */}
            How often do you travel?
          </p>
        </QuestionContainer>
        {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
        <div className={`flex items-end justify-end mt-3 ${!hasAnswer ? "answer" : ""}`}>
          {/* If the answer is empty string ==> Display list of options */}
          <OptionContainer visible={!hasAnswer}>
            <div className="flex flex-row gap-2 flex-wrap">
              <InputRadio
                id="lc4a"
                name="lc4"
                inputStyle="hidden"
                labelStyle="block px-6 py-3 border-2 border-[#E0E0E0] rounded-md cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300"
                onClickHandler={onClickNonNever}
                value="Always">
                Always
              </InputRadio>

              <InputRadio
                id="lc4b"
                name="lc4"
                inputStyle="hidden"
                labelStyle="block px-6 py-3 border-2 border-[#E0E0E0] rounded-md cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300"
                onClickHandler={onClickNonNever}
                value="Sometime">
                Sometime
              </InputRadio>

              <InputRadio
                id="lc4c"
                name="lc4"
                inputStyle="hidden"
                labelStyle="block px-6 py-3 border-2 border-[#E0E0E0] rounded-md cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300"
                onClickHandler={onClickNonNever}
                value="Rarely">
                Rearely
              </InputRadio>

              <InputRadio
                id="lc4d"
                name="lc4"
                inputStyle="hidden"
                labelStyle="block px-6 py-3 border-2 border-[#E0E0E0] rounded-md cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300"
                onClickHandler={onClickNever}
                value="Never">
                Never
              </InputRadio>
            </div>
          </OptionContainer>

          {/* If the answer is NOT empty string ==> Display answer */}
          <AnswerContainer visible={hasAnswer}>
            <p>
              I {frequency.toLowerCase()} travel. {frequency === "Never" ? "" : `When I travel, ${plan}`}
            </p>
          </AnswerContainer>

          <UserLogo src={user} />
        </div>
      </div>
      {frequency !== "Never" && frequency !== "" && !hasAnswer && (
        <QuestionLC4a onSelectPlan={onSelectPlan} plan={plan} />
      )}
      {/* If the answer is empty string ==> There is spinner represents the company is waiting to user's answer */}
      <WaitingAnswerSpinner visible={!hasAnswer} />
    </>
  );
}

function QuestionLC4a({ onSelectPlan, plan }) {
  const planOptions = [
    "I will keep the pets with me",
    "I send pet to relatives",
    "I use public services",
    "I have not thought about it",
  ];

  const renderedOptions = planOptions.map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ));

  return (
    <div className="xl:max-w-screen w-full">
      <QuestionContainer>
        <p className="typewriter overflow-hidden">
          {/* Running text */}
          What are your plans for pet care during travel?
        </p>
      </QuestionContainer>

      {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
      <div className="flex items-end justify-end mt-3 answer relative z-30">
        <OptionContainer>
          <select
            id="lc3a"
            name="lc3a"
            className="block px-3 py-3 border-2 border-[#E0E0E0] rounded-md transition-all duration-300 focus:border-[#7C0F0F] hover:border-[#7C0F0F] cursor-pointer"
            onChange={onSelectPlan}
            value={plan}>
            <option value="" disabled></option>
            {renderedOptions}
          </select>
        </OptionContainer>

        <UserLogo src={user} />
      </div>
    </div>
  );
}

export function QuestionLC5({ getNextQuestion }) {
  const dispatch = useDispatch();
  const initialAnswer = useSelector((store) => store[lc5Slice.name]);

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
    dispatch(lc5Slice.actions.assign(false));
  };

  const onClickYes = () => {
    getNextQuestion();
    setHasAnswer((preState) => true);
    setAnswer((preState) => true);
    dispatch(lc5Slice.actions.assign(true));
  };

  return (
    <>
      <div className="xl:max-w-screen">
        {/* Question container - contains the questions */}
        <QuestionContainer>
          <p className={`${!hasAnswer ? "typewriter" : ""} overflow-hidden`}>
            {/* Running text */}
            Are you prepared for the 10-20 year commitment of pet ownership?
          </p>
        </QuestionContainer>
        {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
        <div className={`flex items-end justify-end mt-3 ${!hasAnswer ? "answer" : ""}`}>
          {/* If the answer is empty string ==> Display list of options */}
          <OptionContainer visible={!hasAnswer}>
            <div className="flex flex-row gap-2 flex-wrap">
              <InputRadio
                id="lc5b"
                name="lc5"
                inputStyle="hidden"
                labelStyle="block px-6 py-3 border-2 border-[#E0E0E0] rounded-md cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300"
                onClickHandler={onClickYes}>
                Yes
              </InputRadio>
              <InputRadio
                id="lc5a"
                name="lc5"
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
