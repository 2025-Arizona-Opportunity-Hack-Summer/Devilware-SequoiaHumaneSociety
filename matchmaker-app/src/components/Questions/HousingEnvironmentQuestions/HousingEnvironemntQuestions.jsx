import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import QuestionContainer from "../QuestionComponent/QuestionContainer/QuestionContainer";
import OptionContainer from "../QuestionComponent/OptionContainer/OptionContainer";
import AnswerContainer from "../QuestionComponent/AnswerContainer/AnswerContainer";
import UserLogo from "../QuestionComponent/UserLogo/UserLogo";
import WaitingAnswerSpinner from "../QuestionComponent/WaitingAnswerSpinner.jsx/WaitingAnswerSpinner";

import InputRadio from "../../Input/InputRadio/InputRadio";
import InputText from "../../Input/InputText/InputText";
import InputNumber from "../../Input/InputNumber/InputNumber";
import InputButton from "../../Input/InputButton/InputButton";

import user from "../../../assets/images/user.png";

import { he1Slice, he2Slice, he3Slice, he4Slice, he5Slice } from "../../../redux/HousingEnvironmentSlice";

import "./HousingEnvironmentQuestions.css";

export function QuestionHE1({ getNextQuestion }) {
  const dispatch = useDispatch();
  const initialAnswer = useSelector((store) => store[he1Slice.name]);

  const [hasAnswer, setHasAnswer] = useState(false);
  const [answer, setAnswer] = useState(initialAnswer);

  useEffect(() => {
    if (initialAnswer !== "") {
      setHasAnswer((preState) => true);
      getNextQuestion();
    }
  }, []);

  const onClickOption = (event) => {
    setHasAnswer((preAnser) => true);
    setAnswer((preAnser) => event.target.value);
    dispatch(he1Slice.actions.assign(event.target.value));
    getNextQuestion();
  };

  return (
    <div className="xl:max-w-max">
      {/* Question container - contains the question */}
      <QuestionContainer>
        {/* Running text */}
        <p className={`${!hasAnswer ? "typewriter" : ""} overflow-hidden`}>
          Do you own or rent your house? If renting, do you have written permission from your landloard to have pets?
        </p>
      </QuestionContainer>

      {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
      <div className={`flex items-end justify-end mt-3 ${!hasAnswer ? "answer" : ""}`}>
        {/* If the answer is empty string ==> Display list of options */}
        <OptionContainer visible={!hasAnswer}>
          {/* List of options is flex column and each option must be displayed at the right corner */}
          <InputRadio
            id="he1a"
            name="he1"
            value="own-home"
            onClickHandler={onClickOption}
            labelStyle="radio-question-label"
            inputStyle="radio-question-input">
            I have my own home
          </InputRadio>

          <InputRadio
            id="he1b"
            name="he1"
            value="rent-home"
            onClickHandler={onClickOption}
            labelStyle="radio-question-label"
            inputStyle="radio-question-input">
            I rent home but I have permission from my landloard to have pets
          </InputRadio>
        </OptionContainer>
        {/* If the answer is NOT empty string ==> Display answer */}
        <AnswerContainer visible={hasAnswer}>
          <p>
            {answer == "own-home"
              ? "I have my own home"
              : "I rent home but I have permission from my landloard to have pets"}
          </p>
        </AnswerContainer>

        {/* Whether the answer is empty string or NOT, ALWAYS display user logo */}
        <UserLogo src={user} />
      </div>

      {/* If the answer is empty string ==> There is spinner represents the company is waiting to user's answer */}
      <WaitingAnswerSpinner visible={!hasAnswer} />
    </div>
  );
}

export function QuestionHE2({ getNextQuestion }) {
  const dispatch = useDispatch();
  const initialAnswer = useSelector((store) => store[he2Slice.name]);

  const [house, setHouse] = useState(initialAnswer);
  const [hasAnswer, setHasAnswer] = useState(false);
  const [other, setOther] = useState(false);

  useEffect(() => {
    if (initialAnswer !== "") {
      setHouse((prevState) => initialAnswer);
      setHasAnswer((preState) => true);
      getNextQuestion();
    }
  }, []);

  const onClickOther = () => {
    setOther((prevState) => true);
  };

  const onClickNonOther = (event) => {
    setHasAnswer((prevState) => true);
    setHouse((prevAnswer) => event.target.value);
    getNextQuestion();
    dispatch(he2Slice.actions.assign(event.target.value));
  };

  const onClickNext = () => {
    if (house !== "") {
      getNextQuestion();
      setHasAnswer((prevState) => true);
      dispatch(he2Slice.actions.assign(house));
    }
  };

  const onChangeText = (event) => {
    setHouse((prevState) => event.target.value);
  };
  return (
    <div className="xl:max-w-2xl xl:w-[550px]">
      {/* Question container - contains the questions */}
      <QuestionContainer>
        {/* Running text */}
        <p className={`${!hasAnswer ? "typewriter" : ""} overflow-hidden`}>What type of housing do you live in?</p>
      </QuestionContainer>

      {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
      <div className={`flex items-end justify-end mt-3 ${!hasAnswer ? "answer" : ""}`}>
        {/* If the answer is empty string ==> Display list of options */}
        <OptionContainer visible={!hasAnswer}>
          <div className="flex flex-col gap-2 items-end">
            <InputRadio
              id="he2a"
              name="he2"
              onClickHandler={onClickNonOther}
              value="Apartment"
              inputStyle="hidden"
              labelStyle="block px-6 py-3 border border-[#E0E0E0] rounded-md cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300">
              Aparment
            </InputRadio>

            <InputRadio
              id="he2b"
              name="he2"
              onClickHandler={onClickNonOther}
              value="House"
              inputStyle="hidden"
              labelStyle="block px-6 py-3 border border-[#E0E0E0] rounded-md cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300">
              House
            </InputRadio>

            <InputRadio
              id="he2c"
              name="he2"
              onClickHandler={onClickNonOther}
              value="Condo"
              inputStyle="hidden"
              labelStyle="block px-6 py-3 border border-[#E0E0E0] rounded-md cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300">
              Condo
            </InputRadio>
            {/* If the other option is click, then remove other option from the list, create text input */}
            {!other && (
              <>
                <InputRadio
                  id="he2d"
                  name="he2"
                  onClickHandler={onClickOther}
                  inputStyle="hidden"
                  labelStyle="block px-6 py-3 border border-[#E0E0E0] rounded-md cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300">
                  Other
                </InputRadio>
              </>
            )}
            {other && (
              <>
                <InputText
                  id="he2d1"
                  placeholder="Please specify"
                  value={house}
                  onChangeHandler={onChangeText}
                  inputStyle="block px-6 py-3 border-2 rounded-md focus:border-orange-400 outline-0"></InputText>

                <InputButton
                  onClickHandler={onClickNext}
                  value="Next"
                  id="h2eNextButton"
                  labelStyle="hover:bg-[#7C0F0F] text-white px-3 py-1 rounded-sm font-bold mt-2 w-max cursor-pointer bg-[#669bbc] transition-all duration-300"
                  inputStyle="hidden">
                  Next
                </InputButton>
              </>
            )}
          </div>
        </OptionContainer>

        {/* If the answer is NOT empty string ==> Display answer */}
        <AnswerContainer visible={hasAnswer}>
          <p>{house}</p>
        </AnswerContainer>
        <UserLogo src={user} />
      </div>

      {/* If the answer is empty string ==> There is spinner represents the company is waiting to user's answer */}
      <WaitingAnswerSpinner visible={!hasAnswer} />
    </div>
  );
}

export function QuestionHE3({ getNextQuestion }) {
  const dispatch = useDispatch();
  const initialAnswer = useSelector((store) => store[he3Slice.name]);

  const [type, setType] = useState(initialAnswer.type);
  const [height, setHeight] = useState(initialAnswer.height);
  const [hasFence, setHasFence] = useState(false);
  const [hasAnswer, setHasAnswer] = useState(false);

  useEffect(() => {
    if (initialAnswer.type !== "") {
      setHasAnswer((preState) => true);
      getNextQuestion();
    }
  }, []);

  const onClickYes = () => {
    setHasFence((prevState) => true);
  };

  const onChangeHeight = (event) => {
    setHeight((prevState) => event.target.value);
  };

  const onChangeType = (event) => {
    setType((prevState) => event.target.value);
  };

  const onClickNo = () => {
    setHasAnswer((prevState) => true);
    dispatch(he3Slice.actions.assign({ type: "None", height: 0 }));
    setType((prevState) => "None");
    getNextQuestion();
  };

  const onClickNext = () => {
    getNextQuestion();
    setHasAnswer((prevState) => true);
    dispatch(he3Slice.actions.assign({ type: type, height: height }));
  };

  return (
    <div className="xl:max-w-2xl xl:w-[550px]">
      {/* Question container - contains the questions */}
      <QuestionContainer>
        <p className={`${!hasAnswer ? "typewriter" : ""} overflow-hidden`}>
          Do you have a fenced yard? If so, what type and height of fencing?
        </p>
      </QuestionContainer>

      {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
      <div className={`flex items-end justify-end mt-3 ${!hasAnswer ? "answer" : ""}`}>
        <OptionContainer visible={!hasAnswer}>
          <InputRadio
            id="he3a"
            name="he3"
            inputStyle="hidden"
            onClickHandler={onClickNo}
            labelStyle="block px-6 py-3 border border-[#E0E0E0] rounded-md cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300">
            No
          </InputRadio>
          {!hasFence && (
            <InputRadio
              id="he3b"
              name="he3"
              inputStyle="hidden"
              onClickHandler={onClickYes}
              labelStyle="block px-6 py-3 border border-[#E0E0E0] rounded-md cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300">
              Yes
            </InputRadio>
          )}

          {hasFence && (
            <>
              <div className="flex gap-2">
                <InputText
                  id="he3b1"
                  placeholder="Type"
                  inputStyle="block px-6 py-3 border-2 rounded-md focus:border-orange-400 outline-0 w-48"
                  value={type}
                  onChangeHandler={onChangeType}
                />
                <InputNumber
                  id="he3b2"
                  placeholder="Height (meter)"
                  inputStyle="block px-6 py-3 border-2 rounded-md focus:border-orange-400 outline-0 w-48"
                  value={type}
                  onChangeHandler={onChangeHeight}
                />
              </div>
              <InputButton
                onClickHandler={onClickNext}
                value="Next"
                id="he3NextButton"
                labelStyle="hover:bg-[#7C0F0F] text-white px-3 py-1 rounded-sm font-bold mt-2 w-max cursor-pointer bg-[#669bbc] transition-all duration-300"
                inputStyle="hidden">
                Next
              </InputButton>
            </>
          )}
        </OptionContainer>
        <AnswerContainer visible={hasAnswer}>
          <p>{type == "None" ? "No" : `I have ${type.toLowerCase()} fence with ${height} meters`}</p>
        </AnswerContainer>
        <UserLogo src={user} />
      </div>

      {/* If the answer is empty string ==> There is spinner represents the company is waiting to user's answer */}
      <WaitingAnswerSpinner visible={!hasAnswer} />
    </div>
  );
}

export function QuestionHE4({ getNextQuestion }) {
  const dispatch = useDispatch();
  const initialAnwser = useSelector((store) => store[he4Slice.name]);

  const [hour, setHour] = useState(initialAnwser);
  const [hasAnswer, setHasAnswer] = useState(false);

  const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

  useEffect(() => {
    if (initialAnwser !== "") {
      setHasAnswer((preState) => true);
      getNextQuestion();
    }
  }, []);

  const Options = hours.map((val) => {
    return (
      <option key={val} value={val}>
        {val}
      </option>
    );
  });

  const onSelect = (event) => {
    getNextQuestion();
    setHour((preState) => event.target.value);
    setHasAnswer((preState) => true);
    dispatch(he4Slice.actions.assign(event.target.value));
  };

  return (
    <div className="xl:max-w-2xl xl:w-[550px]">
      {/* Question container - contains the questions */}
      <QuestionContainer>
        <p className={`${!hasAnswer ? "typewriter" : ""} overflow-hidden`}>
          Hour may hours per day will the pet be left alone?
        </p>
      </QuestionContainer>

      {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
      <div className={`flex items-end justify-end mt-3 ${!hasAnswer ? "answer" : ""}`}>
        <OptionContainer visible={!hasAnswer}>
          <select
            name="he4"
            id="he4"
            className="block px-3 py-3 border border-[#E0E0E0] rounded-md transition-all duration-300 focus:border-[#7C0F0F] hover:border-[#7C0F0F] cursor-pointer"
            value={hour}
            onChange={onSelect}>
            {Options}
          </select>
        </OptionContainer>

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

export function QuestionHE5({ getNextQuestion }) {
  const disptach = useDispatch();
  const initialAnswer = useSelector((store) => store[he5Slice.name]);

  const [answer, setAnswer] = useState(initialAnswer);
  const [hasOther, setHasOther] = useState(false);
  const [hasAnswer, setHasAnswer] = useState(false);

  useEffect(() => {
    if (initialAnswer !== "") {
      setHasAnswer((preState) => true);
      getNextQuestion();
    }
  }, []);

  const onClickOther = () => {
    setHasOther((prevState) => true);
  };

  const onClickNonOther = (event) => {
    setAnswer((prevAnswer) => event.target.value);
    setHasAnswer((preState) => true);
    disptach(he5Slice.actions.assign(event.target.value));
    getNextQuestion();
  };

  const onClickNext = () => {
    if (answer !== "") {
      setAnswer((prevAnswer) => answer);
      disptach(he5Slice.actions.assign(answer));
      getNextQuestion();
      setHasAnswer((preState) => true);
    }
  };

  const onChangeOtherAnswer = (event) => {
    setAnswer((prevState) => event.target.value);
  };
  return (
    <div className="xl:max-w-2xl xl:w-[550px]">
      {/* Question container - contains the questions */}
      <QuestionContainer>
        <p className={`${!hasAnswer ? "typewriter" : ""} overflow-hidden`}>
          Where will the pet sleep and spend most of its time?
        </p>
      </QuestionContainer>

      {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
      <div className={`flex items-end justify-end mt-3 ${!hasAnswer ? "answer" : ""}`}>
        <OptionContainer visible={!hasAnswer}>
          <InputRadio
            id="he5a"
            name="he5"
            onClickHandler={onClickNonOther}
            value="Living room"
            inputStyle="hidden"
            labelStyle="block px-6 py-3 border border-[#E0E0E0] rounded-md cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300">
            Living room
          </InputRadio>

          <InputRadio
            id="he5b"
            name="he5"
            onClickHandler={onClickNonOther}
            value="Bedroom"
            inputStyle="hidden"
            labelStyle="block px-6 py-3 border border-[#E0E0E0] rounded-md cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300">
            Bedroom
          </InputRadio>

          <InputRadio
            id="he5c"
            name="he5"
            onClickHandler={onClickNonOther}
            value="Kitchen"
            inputStyle="hidden"
            labelStyle="block px-6 py-3 border border-[#E0E0E0] rounded-md cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300">
            Kitchen
          </InputRadio>

          {!hasOther && (
            <InputRadio
              id="he5d"
              name="he5"
              onClickHandler={onClickOther}
              value=""
              inputStyle="hidden"
              labelStyle="block px-6 py-3 border border-[#E0E0E0] rounded-md cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300">
              Other
            </InputRadio>
          )}
          {hasOther && (
            <>
              <InputText
                id="he5text"
                value={answer}
                onChangeHandler={onChangeOtherAnswer}
                placeholder="Please Specify"
                inputStyle="block px-6 py-3 border-2 rounded-md focus:border-orange-400 outline-0"
              />
              <InputButton
                id="he5Button"
                labelStyle="hover:bg-[#7C0F0F] text-white px-3 py-1 rounded-sm font-bold mt-2 w-max cursor-pointer bg-[#669bbc] transition-all duration-300"
                onClickHandler={onClickNext}>
                Next
              </InputButton>
            </>
          )}
        </OptionContainer>

        <AnswerContainer visible={hasAnswer}>
          <p>{answer}</p>
        </AnswerContainer>

        <UserLogo src={user} />
      </div>

      {/* If the answer is empty string ==> There is spinner represents the company is waiting to user's answer */}
      <WaitingAnswerSpinner visible={!hasAnswer} />
    </div>
  );
}
