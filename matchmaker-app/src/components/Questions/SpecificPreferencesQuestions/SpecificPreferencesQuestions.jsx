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
import InputCheckbox from "../../Input/InputCheckbox/InputCheckbox";

import { sp1Slice, sp2Slice, sp3Slice, sp4Slice, sp5Slice, sp6Slice } from "../../../redux/SpecificPreferencesSlice";

export function QuestionSP1({ getNextQuestion }) {
  const dispatch = useDispatch();
  const initialAnswer = useSelector((store) => store[sp1Slice.name]);

  const [hasAnswer, setHasAnswer] = useState(false);
  const [animalTypes, setAnimalTypes] = useState(initialAnswer);

  const animalOptions = ["Bird", "Cat", "Dog"];

  useEffect(() => {
    if (initialAnswer !== "") {
      setHasAnswer((preState) => true);
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
      dispatch(sp1Slice.actions.assign(animalTypes));
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
      <div className={`flex items-end justify-end mt-3 ${!hasAnswer ? "answer" : ""} relative z-30`}>
        {/* If the answer is empty string ==> Display list of options */}
        <OptionContainer visible={!hasAnswer}>
          <div className="relative z-30 flex flex-col items-end">
            <InputDatalist
              id={"sp1"}
              labelText={""}
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

export function QuestionSP2({ getNextQuestion }) {
  const dispatch = useDispatch();
  const initialAnswer = useSelector((store) => store[sp2Slice.name]);

  const [hasAnswer, setHasAnswer] = useState(false);
  const [fromAge, setFromAge] = useState(initialAnswer.fromAge);
  const [toAge, setToAge] = useState(initialAnswer.toAge);

  useEffect(() => {
    if (initialAnswer.fromAge !== "") {
      setHasAnswer((preState) => true);
      getNextQuestion();
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
      dispatch(sp2Slice.actions.assign({ fromAge: fromAge, toAge: toAge }));
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
      <div className={`flex items-end justify-end mt-3 ${!hasAnswer ? "answer" : ""}`}>
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

export function QuestionSP3({ getNextQuestion }) {
  const dispatch = useDispatch();
  const initialAnswer = useSelector((store) => store[sp3Slice.name]);

  const [hasAnswer, setHasAnswer] = useState(false);
  const [sizes, setSizes] = useState(initialAnswer);

  useEffect(() => {
    if (initialAnswer.length !== 0) {
      setHasAnswer((preState) => true);
      getNextQuestion();
    }
  }, []);

  const onClickNext = () => {
    if (sizes.length === 0) {
    } else {
      setHasAnswer((preState) => true);
      dispatch(sp3Slice.actions.assign(sizes));
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
      <div className={`flex items-end justify-end mt-3 ${!hasAnswer ? "answer" : ""}`}>
        {/* If the answer is empty string ==> Display list of options */}
        <OptionContainer visible={!hasAnswer}>
          <div className="flex gap-5 items-center">
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

export function QuestionSP4({ getNextQuestion }) {
  const dispatch = useDispatch();
  const initialAnswer = useSelector((store) => store[sp4Slice.name]);

  const [hasAnswer, setHasAnswer] = useState(false);
  const [levels, setLevels] = useState(initialAnswer);

  useEffect(() => {
    if (initialAnswer.length !== 0) {
      setHasAnswer((preState) => true);
      getNextQuestion();
    }
  }, []);

  const onClickNext = () => {
    if (levels.length === 0) {
    } else {
      setHasAnswer((preState) => true);
      dispatch(sp4Slice.actions.assign(levels));
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
      <div className={`flex items-end justify-end mt-3 ${!hasAnswer ? "answer" : ""}`}>
        {/* If the answer is empty string ==> Display list of options */}
        <OptionContainer visible={!hasAnswer}>
          <div className="flex gap-5 items-center">
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

export function QuestionSP5({ getNextQuestion }) {
  const dispatch = useDispatch();
  const initialAnswer = useSelector((store) => store[sp5Slice.name]);

  const [hasAnswer, setHasAnswer] = useState(false);
  const [answer, setAnswer] = useState(initialAnswer);

  useEffect(() => {
    if (initialAnswer !== "") {
      getNextQuestion();
      setHasAnswer((preState) => true);
    }
  }, []);

  const onClickNo = () => {
    getNextQuestion();
    setHasAnswer((preState) => true);
    setAnswer((preState) => false);
    dispatch(sp5Slice.actions.assign(false));
  };

  const onClickYes = () => {
    getNextQuestion();
    setHasAnswer((preState) => true);
    setAnswer((preState) => true);
    dispatch(sp5Slice.actions.assign(true));
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
        <div className={`flex items-end justify-end mt-3 ${!hasAnswer ? "answer" : ""}`}>
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

export function QuestionSP6({ getNextQuestion }) {
  const dispatch = useDispatch();
  const initialAnswer = useSelector((store) => store[sp6Slice.name]);

  const [hasAnswer, setHasAnswer] = useState(false);
  const [answers, setAnswers] = useState("");

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
      dispatch(sp6Slice.actions.assign(answers));
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
      <div className={`flex items-end justify-end mt-3 ${!hasAnswer ? "answer" : ""}`}>
        {/* If the answer is empty string ==> Display list of options */}
        <OptionContainer visible={!hasAnswer}>
          <div className="relative z-30 flex flex-col items-end">
            <InputDatalist
              id={"sp6"}
              labelText={""}
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
