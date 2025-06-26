import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import user from "../../../assets/images/user.png";

import QuestionContainer from "../QuestionComponent/QuestionContainer/QuestionContainer";
import AnswerContainer from "../QuestionComponent/AnswerContainer/AnswerContainer";
import OptionContainer from "../QuestionComponent/OptionContainer/OptionContainer";
import WaitingAnswerSpinner from "../QuestionComponent/WaitingAnswerSpinner.jsx/WaitingAnswerSpinner";
import UserLogo from "../QuestionComponent/UserLogo/UserLogo";
import AnimalList from "../AnimalList/AnimalList";

import InputDatalist from "../../Input/InputDataList/InputDataList";
import InputRadio from "../../Input/InputRadio/InputRadio";

import InputButton from "../../Input/InputButton/InputButton";
import InputText from "../../Input/InputText/InputText";

import SessionStorage from "../../features/sessionStorage";

import { finishHCSlice } from "../../../redux/MatchFormSlice";

export default function HouseholdCompositionQuestions() {
  const dispatch = useDispatch();
  const [currQuestions, setCurrQuestions] = useState(1);

  const questions = [
    <li key={"HC1"} className="w-full">
      <QuestionHC1 getNextQuestion={getNextQuestion} />
    </li>,
    <li key={"HC2"} className="w-full">
      <QuestionHC2 getNextQuestion={getNextQuestion} />
    </li>,
    <li key={"HC3"} className="w-full">
      <QuestionHC3 getNextQuestion={getNextQuestion} />
    </li>,
    <li key={"HC4"} className="w-full">
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

function QuestionHC1({ getNextQuestion }) {
  const [adults, setAdults] = useState("");
  const [children, setChildren] = useState("");
  const [youngestAge, setYoungestAge] = useState("");
  const [hasAnswer, setHasAnswer] = useState(false);

  useEffect(() => {
    const storedAnswer = SessionStorage.getItem("hc1");

    if (storedAnswer !== null) {
      setAdults((preState) => storedAnswer.adults);
      setChildren((preState) => storedAnswer.children);
      setYoungestAge((preState) => storedAnswer.youngestAge);
      getNextQuestion();
      setHasAnswer((preState) => true);
    }
  }, []);

  const onChangeAdults = (event) => {
    setAdults((preState) => Number(event.target.value));
    if (children === 0 || (children > 0 && youngestAge !== "")) {
      SessionStorage.setItem("hc1", { adults: adults, children: children, youngestAge: youngestAge });
      getNextQuestion();
      setHasAnswer((preState) => true);
    }
  };

  const onChangeChildren = (event) => {
    setChildren((preState) => Number(event.target.value));
    if (adults !== "" && (Number(event.target.value) === 0 || (Number(event.target.value) > 0 && youngestAge !== ""))) {
      SessionStorage.setItem("hc1", { adults: adults, children: Number(event.target.value), youngestAge: youngestAge });

      getNextQuestion();
      setHasAnswer((preState) => true);
    }
  };

  const onChangeYoungestAge = (event) => {
    setYoungestAge((preState) => event.target.value);
    SessionStorage.setItem("hc1", { adults: adults, children: children, youngestAge: event.target.value });
    getNextQuestion();
    setHasAnswer((preState) => true);
  };

  const adultsOptions = Array(11)
    .fill(0)
    .map((_, idx) => idx)
    .map((val) => (
      <option key={`adult_${val}`} value={val}>
        {val}
      </option>
    ));

  const childrenOptions = Array(11)
    .fill(0)
    .map((_, idx) => idx)
    .map((val) => (
      <option key={`children_${val}`} value={val}>
        {val}
      </option>
    ));

  return (
    <>
      <div className="xl:max-w-screen">
        <QuestionContainer>
          <p className={`${!hasAnswer ? "typewriter" : ""} overflow-hidden`}>
            How many adults and children live in your home?
          </p>
        </QuestionContainer>

        {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
        <div className={`flex items-end justify-end mt-3 ${!hasAnswer ? "answer" : ""}`}>
          {/* If the answer is empty string ==> Display list of options */}
          <OptionContainer visible={!hasAnswer}>
            <div className="flex gap-2">
              <div className="flex items-center gap-2">
                <label htmlFor="hc1a">Adult</label>
                <select
                  id="hc1a"
                  name="hc1a"
                  className="block px-3 py-3 border-2 border-[#E0E0E0] rounded-md transition-all duration-300 focus:border-[#7C0F0F] hover:border-[#7C0F0F] cursor-pointer"
                  onChange={onChangeAdults}
                  value={adults}>
                  <option value="" disabled></option>
                  {adultsOptions}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="hc1b">Children</label>
                <select
                  id="hc1b"
                  name="hc1b"
                  className="block px-3 py-3 border-2 border-[#E0E0E0] rounded-md transition-all duration-300 focus:border-[#7C0F0F] hover:border-[#7C0F0F] cursor-pointer"
                  onChange={onChangeChildren}
                  value={children}>
                  <option value="" disabled></option>
                  {childrenOptions}
                </select>
              </div>
            </div>
          </OptionContainer>
          {/* If the answer is NOT empty string ==> Display answer */}

          <AnswerContainer visible={hasAnswer}>
            <p>
              {children !== 0
                ? `My home has ${adults} ${adults === 1 ? "adult" : "adults"} and ${children}
                ${children === 1 ? "child" : "children"}. The youngest one is ${youngestAge.toLowerCase()}`
                : `My home has ${adults} ${adults === 1 ? "adult" : "adults"} and we don't have any child`}
            </p>
          </AnswerContainer>

          {/* Whether the answer is empty string or NOT, ALWAYS display user logo */}
          <div className="flex items-center">
            <img src={user} alt="you" className="xl:w-12 xl:h-12" />
          </div>
        </div>
      </div>
      {children !== "" && children > 0 && adults !== "" && !hasAnswer && (
        <div className="flex items-center mt-5">
          <QuestionHC1a onChangeYoungestAge={onChangeYoungestAge} hasAnswer={hasAnswer} youngestAge={youngestAge} />
        </div>
      )}

      <WaitingAnswerSpinner visible={!hasAnswer} />
    </>
  );
}

function QuestionHC1a({ onChangeYoungestAge, hasAnswer, youngestAge }) {
  const ageOptions = (
    <>
      <option value={"New born (0 - 1 Month)"}>New born (0 - 1 Month)</option>
      <option value={"Baby (1 - 3 Years)"}>Baby (1 - 3 Years)</option>
      <option value={"Preschool (4 - 5 Years)"}>Preschool (4 - 5 Years)</option>
      <option value={"School age (6 - 12 Years)"}>School age (6 - 12 Years)</option>
      <option value={"Teenager (13 - 18 Years)"}>Teenager (13 - 18 Years)</option>
    </>
  );

  return (
    <div className="xl:max-w-screen w-full">
      {/* Question container - contains the question */}
      <QuestionContainer>
        <p className={`${!hasAnswer ? "typewriter" : ""} overflow-hidden`}>How old is the youngest child?</p>
      </QuestionContainer>
      {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
      <div className="flex items-end justify-end mt-3 answer">
        {/* If the answer is empty string ==> Display list of options */}
        <select
          id="hc1c"
          name="hc1c"
          className="block px-3 py-3 border-2 border-[#E0E0E0] rounded-md transition-all duration-300 focus:border-[#7C0F0F] hover:border-[#7C0F0F] cursor-pointer"
          onChange={onChangeYoungestAge}
          value={youngestAge}>
          <option value="" disabled></option>
          {ageOptions}
        </select>
        {/* Whether the answer is empty string or NOT, ALWAYS display user logo */}
        <UserLogo src={user} />
      </div>
    </div>
  );
}

function QuestionHC2({ getNextQuestion }) {
  const [hasAnswer, setHasAnswer] = useState(false);
  const [hasAllergies, setHasAllergies] = useState(false);

  const [allergiesAnimal, setAllergiesAnimal] = useState("");

  const animalOptions = ["Bird", "Cat", "Dog"];

  useEffect(() => {
    const storedAnswer = SessionStorage.getItem("hc2");
    if (storedAnswer !== null) {
      setAllergiesAnimal((preState) => storedAnswer);
      setHasAnswer((preState) => true);
      getNextQuestion();
    }
  }, []);
  const onClickNo = () => {
    setHasAnswer((preState) => true);
    setAllergiesAnimal((preState) => []);
    SessionStorage.setItem("hc2", []);
    getNextQuestion();
  };

  const onClickYes = () => {
    setHasAllergies((preState) => true);
  };

  const onClickOption = (optionsList) => {
    setAllergiesAnimal((preState) => optionsList);
  };

  const onClickNext = () => {
    if (allergiesAnimal.length === 0) {
    } else {
      setHasAnswer((preState) => true);
      SessionStorage.setItem("hc2", allergiesAnimal);
      getNextQuestion();
    }
  };
  return (
    <div className="xl:max-w-screen">
      {/* Question container - contains the questions */}
      <QuestionContainer>
        <p className={`${!hasAnswer ? "typewriter" : ""} overflow-hidden`}>
          Does anyone in the household have allergies to animals?
        </p>
      </QuestionContainer>

      {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
      <div className={`flex items-end justify-end mt-3 ${!hasAnswer ? "answer" : ""} relative z-30`}>
        {/* If the answer is empty string ==> Display list of options */}
        <OptionContainer visible={!hasAnswer}>
          <div className="flex flex-row gap-2 flex-wrap">
            <InputRadio
              id="hc2b"
              name="hc2"
              inputStyle="hidden"
              labelStyle="block px-6 py-3 border-2 border-[#E0E0E0] rounded-md cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300"
              onClickHandler={onClickYes}>
              Yes
            </InputRadio>
            <InputRadio
              id="hc2a"
              name="hc2"
              inputStyle="hidden"
              labelStyle="block px-6 py-3 border-2 border-[#E0E0E0] rounded-md cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300"
              onClickHandler={onClickNo}>
              No
            </InputRadio>
          </div>

          {hasAllergies && (
            <div className="relative z-30 flex flex-col items-end">
              <InputDatalist
                id={"hc2c"}
                labelText={""}
                placeholder={"Choose animal"}
                defaultOptions={animalOptions}
                onSubmitAnswer={onClickOption}
              />

              <InputButton
                value="Next"
                onClickHandler={onClickNext}
                inputStyle="hidden"
                id="hc2NextButton"
                labelStyle="hover:bg-[#7C0F0F] text-white px-3 py-1 rounded-sm font-bold mt-2 w-max cursor-pointer bg-[#669bbc] transition-all duration-300">
                Next
              </InputButton>
            </div>
          )}
        </OptionContainer>

        {/* If the answer is NOT empty string ==> Display answer */}
        <AnswerContainer visible={hasAnswer}>
          <p>
            {allergiesAnimal.length === 0
              ? "We do not have allergies to any animal"
              : `My family has allergies with ${allergiesAnimal.map((animal) => animal.toLowerCase()).join(", ")}`}
          </p>
        </AnswerContainer>

        <UserLogo src={user} />
      </div>

      {/* If the answer is empty string ==> There is spinner represents the company is waiting to user's answer */}
      <WaitingAnswerSpinner visible={!hasAnswer} />
    </div>
  );
}

function QuestionHC3({ getNextQuestion }) {
  const [hasAnimal, setHasAnimal] = useState(false);
  const [hasAnswer, setHasAnswer] = useState(false);
  const [animalList, setAnimalList] = useState("");

  useEffect(() => {
    const storedAnswer = SessionStorage.getItem("hc3");
    if (storedAnswer !== null) {
      setAnimalList((preState) => storedAnswer);
      setHasAnswer((preState) => true);
      getNextQuestion();
    }
  }, []);

  const onClickYes = () => {
    setHasAnimal((prevState) => true);
  };

  const onClickNo = () => {
    setAnimalList((preState) => []);
    SessionStorage.setItem("hc3", []);
    setHasAnswer((preState) => true);
    getNextQuestion();
  };

  const onClickNext = () => {
    SessionStorage.setItem("hc3", animalList);
    setHasAnswer((preState) => true);
    getNextQuestion();
  };

  return (
    <>
      <div className="xl:max-w-screen">
        {/* Question container - contains the questions */}
        <QuestionContainer>
          <p className={`${!hasAnswer ? "typewriter" : ""} overflow-hidden`}>Do you currently have other pets?</p>
        </QuestionContainer>

        {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
        <div className={`flex items-end justify-end mt-3 ${!hasAnswer ? "answer" : ""}`}>
          <OptionContainer visible={!hasAnswer}>
            <div className="flex flex-row gap-2">
              <InputRadio
                id="hc3b"
                name="hc3"
                inputStyle="hidden"
                labelStyle="block px-6 py-3 border border-[#E0E0E0] rounded-md cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300"
                onClickHandler={onClickYes}>
                Yes
              </InputRadio>
              <InputRadio
                id="hc3a"
                name="hc3"
                inputStyle="hidden"
                labelStyle="block px-6 py-3 border border-[#E0E0E0] rounded-md cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300"
                onClickHandler={onClickNo}>
                No
              </InputRadio>
            </div>
          </OptionContainer>

          <AnswerContainer visible={hasAnswer}>
            {animalList !== "" && (
              <>
                <p>
                  {animalList.length == 0
                    ? "My family does not have any animals at home"
                    : `My home has ${animalList.length} ${
                        animalList.length == 1 ? "animal" : "animals"
                      } at the moment:`}
                </p>
                <ol start={1}>
                  {animalList.map((animal, idx) => (
                    <li key={idx}>
                      {animal.type}, {animal.age} months, {animal.isNeutered === true ? "Neutered" : "Spayed"}
                    </li>
                  ))}
                </ol>
              </>
            )}
          </AnswerContainer>

          <UserLogo src={user} />
        </div>

        {/* If the answer is empty string ==> There is spinner represents the company is waiting to user's answer */}
      </div>
      {hasAnimal && !hasAnswer && (
        <div className="flex items-center justify-start mt-5">
          <QuestionHC3a animalList={animalList} setAnimalList={setAnimalList} onClickNext={onClickNext} />
        </div>
      )}

      <WaitingAnswerSpinner visible={!hasAnswer} />
    </>
  );
}

function QuestionHC3a({ animalList, setAnimalList, onClickNext }) {
  return (
    <div className="xl:max-w-screen w-full">
      {/* Question container - contains the questions */}
      <QuestionContainer>
        <p className="typewriter overflow-hidden"> If so, what types, ages, and are they spayed/neutered?</p>
      </QuestionContainer>

      {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
      <div className="flex items-end justify-end mt-3 answer">
        <OptionContainer>
          <AnimalList animalList={animalList} setAnimalList={setAnimalList} />
          <InputButton
            id="hc3NextButton"
            labelStyle="hover:bg-[#7C0F0F] text-white px-3 py-1 rounded-sm font-bold mt-2 w-max cursor-pointer bg-[#669bbc] transition-all duration-300"
            inputStyle="hidden"
            onClickHandler={onClickNext}>
            Next
          </InputButton>
        </OptionContainer>
        <UserLogo src={user} />
      </div>
    </div>
  );
}

function QuestionHC4({ getNextQuestion }) {
  const [hasAnswer, setHasAnswer] = useState(false);
  const [hasPetBefore, setHasPetBefore] = useState(false);
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    const storedAnswer = SessionStorage.getItem("hc4");
    if (storedAnswer !== null) {
      if (storedAnswer === "") {
        setHasPetBefore((preState) => false);
      } else {
        setHasPetBefore((preState) => true);
        setAnswer((preState) => storedAnswer);
      }
      getNextQuestion();
      setHasAnswer((preState) => true);
    }
    // if (initialAnswer !== null) {
    //   getNextQuestion();
    //   setHasAnswer((preState) => true);
    // }
  }, []);
  const onClickNo = () => {
    getNextQuestion();
    setHasAnswer((preState) => true);
    setAnswer((preState) => []);
    SessionStorage.setItem("hc4", "");
  };

  const onClickYes = () => {
    setHasPetBefore((preState) => true);
  };

  const onClickNext = () => {
    if (answer.length === 0) {
    } else {
      getNextQuestion();
      setHasAnswer((preState) => true);
      setAnswer((preState) => answer);
      SessionStorage.setItem("hc4", answer);
    }
  };

  const onChangeAnswer = (event) => {
    setAnswer((prevState) => event.target.value);
  };
  return (
    <>
      <div className="xl:max-w-screen">
        {/* Question container - contains the questions */}
        <QuestionContainer>
          <p className={`${!hasAnswer ? "typewriter" : ""} overflow-hidden`}>
            {/* Running text */}
            Have you had pets before?
          </p>
        </QuestionContainer>
        {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
        <div className={`flex items-end justify-end mt-3 ${!hasAnswer ? "answer" : ""}`}>
          {/* If the answer is empty string ==> Display list of options */}
          <OptionContainer visible={!hasAnswer}>
            <div className="flex flex-row gap-2">
              <InputRadio
                id="hc4b"
                name="hc4"
                inputStyle="hidden"
                labelStyle="block px-6 py-3 border-2 border-[#E0E0E0] rounded-md cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300"
                onClickHandler={onClickYes}>
                Yes
              </InputRadio>
              <InputRadio
                id="hc4a"
                name="hc4"
                inputStyle="hidden"
                labelStyle="block px-6 py-3 border-2 border-[#E0E0E0] rounded-md cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300"
                onClickHandler={onClickNo}>
                No
              </InputRadio>
            </div>
          </OptionContainer>

          {/* If the answer is NOT empty string ==> Display answer */}
          <AnswerContainer visible={hasAnswer}>
            <p>{hasPetBefore === false ? "We don't have pet before" : `Yes. ${answer}`}</p>
          </AnswerContainer>

          <UserLogo src={user} />
        </div>
      </div>
      {hasPetBefore && !hasAnswer && <QuestionHC4a onClickNext={onClickNext} onChangeAnswer={onChangeAnswer} />}
      {/* If the answer is empty string ==> There is spinner represents the company is waiting to user's answer */}
      <WaitingAnswerSpinner visible={!hasAnswer} />
    </>
  );
}

function QuestionHC4a({ onClickNext, onChangeAnswer }) {
  return (
    <div className="xl:max-w-screen mt-5 w-full">
      <QuestionContainer>
        <p className="typewriter overflow-hidden">
          {/* Running text */}
          What happened to previous pets?
        </p>
      </QuestionContainer>

      {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
      <div className="flex items-end justify-end mt-3 answer relative z-30">
        <OptionContainer>
          <InputText
            id="hc4c"
            placeholder="Please specify"
            onChangeHandler={onChangeAnswer}
            inputStyle="block px-6 py-3 border-2 focus:border-orange-400 outline-0 w-80"
          />
          <InputButton
            id="hc4Button"
            inputStyle="hidden"
            onClickHandler={onClickNext}
            labelStyle="hover:bg-[#7C0F0F] text-white px-3 py-1 rounded-sm font-bold mt-2 w-max cursor-pointer bg-[#669bbc] transition-all duration-300">
            Next
          </InputButton>
        </OptionContainer>

        <UserLogo src={user} />
      </div>
    </div>
  );
}
