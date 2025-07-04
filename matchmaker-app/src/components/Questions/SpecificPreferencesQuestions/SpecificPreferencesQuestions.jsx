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
import InputCheckbox from "../../Input/InputCheckbox/InputCheckbox";

import SessionStorage from "../../../features/sessionStorage";

import { finishSPSlice } from "../../../redux/MatchFormSlice";

export default function SpecificPreferencesQuestions() {
  const dispatch = useDispatch();
  const [currQuestions, setCurrQuestions] = useState(1);
  /** 
    currQuestions represent the number of questions will display
    1 --> [sp1]
    2 --> [sp1, sp2]
    3 --> [sp1, sp2, sp3]
    4 --> [sp1, sp2, sp3, sp4]
    5 --> [sp1, sp2, sp3, sp4, sp5]
  **/

  const questions = [
    <li key={"SP1"} className="w-full">
      <QuestionSP1 getNextQuestion={getNextQuestion} />
    </li>,
    <li key={"SP2"} className="w-full">
      <QuestionSP2 getNextQuestion={getNextQuestion} />
    </li>,
    <li key={"SP3"} className="w-full">
      <QuestionSP3 getNextQuestion={getNextQuestion} />
    </li>,
    <li key={"SP4"} className="w-full">
      <QuestionSP4 getNextQuestion={getNextQuestion} />
    </li>,
    <li key={"SP5"} className="w-full">
      <QuestionSP5 getNextQuestion={getNextQuestion} />
    </li>,
    <li key={"SP6"} className="w-full">
      <QuestionSP6 getNextQuestion={getNextQuestion} />
    </li>,
  ];

  function getNextQuestion() {
    /*
      if currQuestions < question.length
        - increase the number of quetions by 1
      else
        - set finishSP is true  
      
    */
    if (currQuestions < questions.length) {
      setCurrQuestions(currQuestions + 1);
    } else {
      dispatch(finishSPSlice.actions.assign(true));
    }
  }

  return (
    <>
      <div className="flex justify-start w-full">
        <h2 className="text-2xl font-bold text-[#7C0F0F]">Specific Preferences</h2>
      </div>
      {questions.slice(0, currQuestions)}
    </>
  );
}

function QuestionSP1({ getNextQuestion }) {
  const [hasAnswer, setHasAnswer] = useState(false);
  const [animalTypes, setAnimalTypes] = useState("");

  const animalOptions = ["Bird", "Cat", "Dog"];

  useEffect(() => {
    const storedAnswer = SessionStorage.getItem("sp1");

    if (storedAnswer !== null) {
      // if session storage have the answered, then move to the next question
      setHasAnswer((preState) => true);
      setAnimalTypes((preState) => storedAnswer);
      getNextQuestion();
    }
  }, []);

  const onClickOption = (optionsList) => {
    setAnimalTypes((preState) => optionsList);
  };

  const onClickNext = () => {
    if (animalTypes.length === 0) {
    } else {
      setHasAnswer((preState) => true);
      SessionStorage.setItem("sp1", animalTypes);
      getNextQuestion();
    }
  };

  return (
    <div className="xl:max-w-screen">
      {/* Question container - contains the questions */}
      <QuestionContainer>
        <p className={`${!hasAnswer ? "typewriter" : ""} overflow-hidden`}>What animal types are you looking for?</p>
      </QuestionContainer>

      {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
      <div className={`flex items-end justify-end mt-5 xl:mt-3 ${!hasAnswer ? "option" : ""} relative z-30`}>
        {/* If the answer is empty string ==> Display list of options */}
        <OptionContainer visible={!hasAnswer}>
          <div className="relative z-30 flex flex-col items-end">
            <InputDatalist
              id={"sp1"}
              children={""}
              placeholder={"Choose animal"}
              defaultOptions={animalOptions}
              onSubmitAnswer={onClickOption}
            />

            <InputButton
              value="Next"
              onClickHandler={onClickNext}
              inputStyle="hidden"
              id="sp1NextButton"
              labelStyle="hover:bg-[#7C0F0F] text-white px-3 py-1 rounded-sm font-bold mt-2 w-max cursor-pointer bg-[#669bbc] transition-all duration-300">
              Next
            </InputButton>
          </div>
        </OptionContainer>

        {/* If the answer is NOT empty string ==> Display answer */}
        <AnswerContainer visible={hasAnswer}>
          <p>
            {animalTypes !== "" && `I am looking for ${animalTypes.map((animal) => animal.toLowerCase()).join(", ")}`}
          </p>
        </AnswerContainer>

        <UserLogo src={user} />
      </div>

      {/* If the answer is empty string ==> There is spinner represents the company is waiting to user's answer */}
      <WaitingAnswerSpinner visible={!hasAnswer} />
    </div>
  );
}

function QuestionSP2({ getNextQuestion }) {
  const [hasAnswer, setHasAnswer] = useState(false);
  const [fromAge, setFromAge] = useState("");
  const [toAge, setToAge] = useState("");

  useEffect(() => {
    const storedAnswer = SessionStorage.getItem("sp2");

    if (storedAnswer !== null) {
      // if session storage have the answered, then move to the next question
      setHasAnswer((preState) => true);
      getNextQuestion();
      setFromAge((preState) => storedAnswer.fromAge);
      setToAge((preState) => storedAnswer.toAge);
    }
  }, []);

  const ageFromOptions = ["All", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 24, 36, 48, 60];
  const ageToOptions = ["All", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 24, 36, 48, 60];

  const renderedFromOptions = ageFromOptions.map((age) => (
    <option key={`from_${age}`} disabled={toAge !== "All" && toAge !== "" && age > toAge}>
      {age}
    </option>
  ));
  const renderedToOptions = ageToOptions.map((age) => (
    <option key={`to${age}`} disabled={fromAge !== "All" && fromAge !== "" && age < fromAge}>
      {age}
    </option>
  ));

  const onSelectFromAge = (event) => {
    setFromAge((value) => event.target.value);
  };

  const onSelectToAge = (event) => {
    setToAge((value) => event.target.value);
  };

  const onClickNext = () => {
    if (fromAge === "" && toAge === "") {
    } else {
      setHasAnswer((preState) => true);
      SessionStorage.setItem("sp2", { fromAge: fromAge, toAge: toAge });
      getNextQuestion();
    }
  };

  return (
    <div className="xl:max-w-screen">
      {/* Question container - contains the questions */}
      <QuestionContainer>
        <p className={`${!hasAnswer ? "typewriter" : ""} overflow-hidden`}>
          What range of ages (months) are you looking for?
        </p>
      </QuestionContainer>

      {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
      <div className={`flex items-end justify-end mt-5 xl:mt-3 ${!hasAnswer ? "option" : ""}`}>
        {/* If the answer is empty string ==> Display list of options */}
        <OptionContainer visible={!hasAnswer}>
          <div className="flex gap-5 items-center">
            <p>From</p>
            <select
              id="sp2a"
              name="sp2a"
              className="block px-3 py-3 border-2 border-[#E0E0E0] rounded-md transition-all duration-300 focus:border-[#7C0F0F] hover:border-[#7C0F0F] cursor-pointer"
              value={fromAge}
              onChange={onSelectFromAge}>
              <option value="" disabled></option>
              {renderedFromOptions}
            </select>
            <p>To</p>

            <select
              id="sp2b"
              name="sp2b"
              className="block px-3 py-3 border-2 border-[#E0E0E0] rounded-md transition-all duration-300 focus:border-[#7C0F0F] hover:border-[#7C0F0F] cursor-pointer"
              value={toAge}
              onChange={onSelectToAge}>
              <option value="" disabled></option>
              {renderedToOptions}
            </select>
          </div>

          <InputButton
            value="Next"
            inputStyle="hidden"
            id="sp2NextButton"
            onClickHandler={onClickNext}
            labelStyle="hover:bg-[#7C0F0F] text-white px-3 py-1 rounded-sm font-bold mt-2 w-max cursor-pointer bg-[#669bbc] transition-all duration-300">
            Next
          </InputButton>
        </OptionContainer>

        {/* If the answer is NOT empty string ==> Display answer */}
        <AnswerContainer visible={hasAnswer}>
          {fromAge === "All" && toAge === "All" && <p>I don't care about pet' ages </p>}
          {fromAge === "All" && <p>I'm looking for a pet less than {toAge} months</p>}
          {toAge === "All" && <p>I'm looking for a pet more than {toAge} months</p>}
          {fromAge !== "All" && toAge !== "All" && (
            <p>
              I'm looking for a pet between {fromAge} to {toAge} months
            </p>
          )}
        </AnswerContainer>

        <UserLogo src={user} />
      </div>

      {/* If the answer is empty string ==> There is spinner represents the company is waiting to user's answer */}
      <WaitingAnswerSpinner visible={!hasAnswer} />
    </div>
  );
}

function QuestionSP3({ getNextQuestion }) {
  const [hasAnswer, setHasAnswer] = useState(false);
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    const storedAnswer = SessionStorage.getItem("sp3");

    if (storedAnswer !== null) {
      // if session storage have the answered, then move to the next question
      setHasAnswer((preState) => true);
      getNextQuestion();
      setSizes((preState) => storedAnswer);
    }
  }, []);

  const onClickNext = () => {
    if (sizes.length === 0) {
    } else {
      setHasAnswer((preState) => true);
      SessionStorage.setItem("sp3", sizes);
      getNextQuestion();
    }
  };
  const onChangeSize = (event) => {
    const chosenSize = event.target.value;
    if (sizes.includes(chosenSize)) {
      setSizes((preState) => [...preState.filter((size) => size !== chosenSize)]);
    } else {
      setSizes((preState) => [...preState, chosenSize]);
    }
  };

  return (
    <div className="xl:max-w-screen">
      {/* Question container - contains the questions */}
      <QuestionContainer>
        <p className={`${!hasAnswer ? "typewriter" : ""} overflow-hidden`}>What animal size are you looking for?</p>
      </QuestionContainer>

      {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
      <div className={`flex items-end justify-end mt-5 xl:mt-3 ${!hasAnswer ? "option" : ""}`}>
        {/* If the answer is empty string ==> Display list of options */}
        <OptionContainer visible={!hasAnswer}>
          <div className="flex gap-5 items-center flex-wrap justify-end">
            <InputCheckbox
              id="sp3a"
              value="Large"
              inputStyle="hidden checkbox-question-input"
              labelStyle="checkbox-question-label"
              onChangeHandler={onChangeSize}
              checked={sizes.includes("Large")}>
              Large
            </InputCheckbox>
            <InputCheckbox
              id="sp3b"
              value="Medium"
              inputStyle="hidden checkbox-question-input"
              labelStyle="checkbox-question-label"
              onChangeHandler={onChangeSize}
              checked={sizes.includes("Medium")}>
              Medium
            </InputCheckbox>
            <InputCheckbox
              id="sp3c"
              value="Small"
              inputStyle="hidden checkbox-question-input"
              labelStyle="checkbox-question-label"
              onChangeHandler={onChangeSize}
              checked={sizes.includes("Small")}>
              Small
            </InputCheckbox>
          </div>
          <InputButton
            value="Next"
            inputStyle="hidden"
            id="sp3NextButton"
            labelStyle="hover:bg-[#7C0F0F] text-white px-3 py-1 rounded-sm font-bold mt-2 w-max cursor-pointer bg-[#669bbc] transition-all duration-300"
            onClickHandler={onClickNext}>
            Next
          </InputButton>
        </OptionContainer>

        {/* If the answer is NOT empty string ==> Display answer */}
        <AnswerContainer visible={hasAnswer}>
          <p>I'm looking for a pet with sizes:</p>
          <ul>
            {sizes.map((size) => (
              <li key={size}>{size}</li>
            ))}
          </ul>
        </AnswerContainer>

        <UserLogo src={user} />
      </div>

      {/* If the answer is empty string ==> There is spinner represents the company is waiting to user's answer */}
      <WaitingAnswerSpinner visible={!hasAnswer} />
    </div>
  );
}

function QuestionSP4({ getNextQuestion }) {
  const [hasAnswer, setHasAnswer] = useState(false);
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    const storedAnswer = SessionStorage.getItem("sp4");

    if (storedAnswer !== null) {
      // if session storage have the answered, then move to the next question
      setHasAnswer((preState) => true);
      getNextQuestion();
      setLevels((preState) => storedAnswer);
    }
  }, []);

  const onClickNext = () => {
    if (levels.length === 0) {
    } else {
      setHasAnswer((preState) => true);

      SessionStorage.setItem("sp4", levels);
      getNextQuestion();
    }
  };
  const onChangeLevel = (event) => {
    const chosenLevel = event.target.value;
    if (levels.includes(chosenLevel)) {
      setLevels((preState) => [...preState.filter((level) => level !== chosenLevel)]);
    } else {
      setLevels((preState) => [...preState, chosenLevel]);
    }
  };

  return (
    <div className="xl:max-w-screen">
      {/* Question container - contains the questions */}
      <QuestionContainer>
        <p className={`${!hasAnswer ? "typewriter" : ""} overflow-hidden`}>
          What animal energy level are you looking for?
        </p>
      </QuestionContainer>

      {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
      <div className={`flex items-end justify-end mt-5 xl:mt-3 ${!hasAnswer ? "option" : ""}`}>
        {/* If the answer is empty string ==> Display list of options */}
        <OptionContainer visible={!hasAnswer}>
          <div className="flex gap-5 items-center flex-wrap justify-end">
            <InputCheckbox
              id="sp4a"
              value="Very Active"
              inputStyle="hidden checkbox-question-input"
              labelStyle="checkbox-question-label"
              checked={levels.includes("Very Active")}
              onChangeHandler={onChangeLevel}>
              Very Active
            </InputCheckbox>
            <InputCheckbox
              id="sp4b"
              value="Moderately Active"
              inputStyle="hidden checkbox-question-input"
              labelStyle="checkbox-question-label"
              checked={levels.includes("Moderately Active")}
              onChangeHandler={onChangeLevel}>
              Moderately Active
            </InputCheckbox>
            <InputCheckbox
              id="sp4c"
              value="Quiet Active"
              inputStyle="hidden checkbox-question-input"
              labelStyle="checkbox-question-label"
              checked={levels.includes("Quiet Active")}
              onChangeHandler={onChangeLevel}>
              Quiet Active
            </InputCheckbox>
          </div>
          <InputButton
            value="Next"
            inputStyle="hidden"
            id="sp4NextButton"
            onClickHandler={onClickNext}
            labelStyle="hover:bg-[#7C0F0F] text-white px-3 py-1 rounded-sm font-bold mt-2 w-max cursor-pointer bg-[#669bbc] transition-all duration-300">
            Next
          </InputButton>
        </OptionContainer>

        {/* If the answer is NOT empty string ==> Display answer */}
        <AnswerContainer visible={hasAnswer}>
          <p>I'm looking for a pet with active level:</p>
          <ul>
            {levels.map((level) => (
              <li key={level}>{level}</li>
            ))}
          </ul>
        </AnswerContainer>

        <UserLogo src={user} />
      </div>

      {/* If the answer is empty string ==> There is spinner represents the company is waiting to user's answer */}
      <WaitingAnswerSpinner visible={!hasAnswer} />
    </div>
  );
}

function QuestionSP5({ getNextQuestion }) {
  const [hasAnswer, setHasAnswer] = useState(false);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    const storedAnswer = SessionStorage.getItem("sp5");

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
    SessionStorage.setItem("sp5", false);
  };

  const onClickYes = () => {
    getNextQuestion();
    setHasAnswer((preState) => true);
    setAnswer((preState) => true);
    SessionStorage.setItem("sp5", true);
  };

  return (
    <>
      <div className="xl:max-w-screen">
        {/* Question container - contains the questions */}
        <QuestionContainer>
          <p className={`${!hasAnswer ? "typewriter" : ""} overflow-hidden`}>
            {/* Running text */}
            Are you open to a pet that needs special medical care or behavioral training?
          </p>
        </QuestionContainer>
        {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
        <div className={`flex items-end justify-end mt-5 xl:mt-3 ${!hasAnswer ? "option" : ""}`}>
          {/* If the answer is empty string ==> Display list of options */}
          <OptionContainer visible={!hasAnswer}>
            <div className="flex flex-row gap-2 flex-wrap">
              <InputRadio
                id="sp5b"
                name="sp5"
                inputStyle="hidden"
                labelStyle="block px-6 py-3 border-2 border-[#E0E0E0] rounded-md cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300"
                onClickHandler={onClickYes}>
                Yes
              </InputRadio>
              <InputRadio
                id="sp5a"
                name="sp5"
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

function QuestionSP6({ getNextQuestion }) {
  const [hasAnswer, setHasAnswer] = useState(false);
  const [answers, setAnswers] = useState("");

  const options = ["I don't know"];

  useEffect(() => {
    const storedAnswer = SessionStorage.getItem("sp6");

    if (storedAnswer !== null) {
      // if session storage have the answered, then move to the next question
      setHasAnswer((preState) => true);
      getNextQuestion();
      setAnswers((preState) => storedAnswer);
    }
  }, []);

  const onClickOption = (optionsList) => {
    setAnswers((preState) => optionsList);
  };

  const onClickNext = () => {
    if (answers.length === 0) {
    } else {
      setHasAnswer((preState) => true);
      SessionStorage.setItem("sp6", answers);
      getNextQuestion();
    }
  };
  return (
    <div className="xl:max-w-screen">
      {/* Question container - contains the questions */}
      <QuestionContainer>
        <p className={`${!hasAnswer ? "typewriter" : ""} overflow-hidden`}>
          How do you plan to handle barking, scratching furniture, or other normal pet behaviors?
        </p>
      </QuestionContainer>

      {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
      <div className={`flex items-end justify-end mt-5 xl:mt-3 ${!hasAnswer ? "option" : ""}`}>
        {/* If the answer is empty string ==> Display list of options */}
        <OptionContainer visible={!hasAnswer}>
          <div className="relative z-30 flex flex-col items-end">
            <InputDatalist
              id={"sp6"}
              children={""}
              placeholder={"Choose options"}
              defaultOptions={options}
              onSubmitAnswer={onClickOption}
            />

            <InputButton
              value="Next"
              onClickHandler={onClickNext}
              inputStyle="hidden"
              id="sp6NextButton"
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
