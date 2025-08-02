import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { withAuthInfo } from "@propelauth/react";

import QuestionContainer from "../QuestionsContainers/QuestionContainer";
import OptionContainer from "../QuestionsContainers/OptionContainer";
import AnswerContainer from "../QuestionsContainers/AnswerContainer";
import UserLogo from "../QuestionsContainers/UserLogo";
import WaitingAnswerSpinner from "../QuestionsContainers/WaitingAnswerSpinner";

import InputButton from "../../../../../../components/common/inputs/InputButton";
import InputDatalist from "../../../../../../components/common/inputs/InputDatalist";
import InputCheckbox from "../../../../../../components/common/inputs/InputCheckbox";

import SessionStorage from "../../../../../../utils/sessionStorage";

import userImage from "../../../../../../assets/images/user.png";

import { fetchUpdateUserQuestionnaireById } from "../../../../../users/services/userSevices";
import { finishPetQuestionsSlice } from "../../../../../../store/slices/MatchFormSlice";

export default withAuthInfo(function IdealPetQuestions({ isLoggedIn, user, setNumbersOfAnswers }) {
  const dispatch = useDispatch();
  const [currQuestions, setCurrQuestions] = useState(1);

  /** 
    currQuestions represent the number of questions will display
    1 --> [p1]
    2 --> [p1, p2]
    3 --> [p1, p2, p3]
    4 --> [p1, p2, p3, p4]
  **/

  const questions = [
    <li key={"p1"} className="w-full">
      <QuestionP1 getNextQuestion={getNextQuestion} isLoggedIn={isLoggedIn} user={user} />
    </li>,
    <li key={"p2"} className="w-full">
      <QuestionP2 getNextQuestion={getNextQuestion} isLoggedIn={isLoggedIn} user={user} />
    </li>,
    <li key={"p3"} className="w-full">
      <QuestionP3 getNextQuestion={getNextQuestion} isLoggedIn={isLoggedIn} user={user} />
    </li>,
    <li key={"p4"} className="w-full">
      <QuestionP4 getNextQuestion={getNextQuestion} isLoggedIn={isLoggedIn} user={user} />
    </li>,
  ];

  function getNextQuestion() {
    setNumbersOfAnswers((prev) => prev + 1);

    if (currQuestions < questions.length) {
      setCurrQuestions(currQuestions + 1);
    } else {
      dispatch(finishPetQuestionsSlice.actions.assign(true));
    }
  }

  return (
    <>
      <div className="flex justify-start w-full">
        <h2 className="text-xl font-semibold text-[#7C0F0F]">About your ideal pets</h2>
      </div>
      {questions.slice(0, currQuestions)}
    </>
  );
});

function QuestionP1({ getNextQuestion, isLoggedIn, user }) {
  const [hasAnswer, setHasAnswer] = useState(false);
  const [animalTypes, setAnimalTypes] = useState([]);
  const [edit, setEdit] = useState(false);

  const animalOptions = ["Bird", "Cat", "Dog"];

  useEffect(() => {
    const storedAnswer = SessionStorage.getItem("p1");

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
      SessionStorage.setItem("p1", animalTypes);
      if (edit === false) {
        getNextQuestion();
      }
      if (isLoggedIn) {
        fetchUpdateUserQuestionnaireById("p1", user.email, animalTypes).catch((err) => {
          console.log(err);
        });
      }
    }
  };

  const onClickEdit = () => {
    setHasAnswer((preState) => false);
    setEdit((preState) => true);
    SessionStorage.removeItem("petList");
  };

  return (
    <div className="xl:max-w-screen">
      {/* Question container - contains the questions */}
      <QuestionContainer>
        <p className={`${!hasAnswer && !edit ? "typewriter" : ""} overflow-hidden`}>
          What animal types are you looking for?
        </p>
      </QuestionContainer>

      {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
      <div className={`flex items-end justify-end mt-5 xl:mt-3 ${!hasAnswer && !edit ? "option" : ""} relative z-30`}>
        {/* If the answer is empty string ==> Display list of options */}
        <OptionContainer visible={!hasAnswer}>
          <div className="relative z-30 flex flex-col items-end">
            <InputDatalist
              id={"p1"}
              children={""}
              placeholder={"Choose animal or type"}
              defaultOptions={animalOptions}
              onSubmitAnswer={onClickOption}
              defaultAnswers={animalTypes}
            />

            <InputButton
              value="Next"
              onClickHandler={onClickNext}
              inputStyle="hidden"
              id="p1NextButton"
              labelStyle="hover:bg-[#7C0F0F] text-white px-3 py-1 rounded-sm font-bold mt-2 w-max cursor-pointer bg-[#669bbc] transition-all duration-300">
              Next
            </InputButton>
          </div>
        </OptionContainer>

        {/* If the answer is NOT empty string ==> Display answer */}
        <AnswerContainer visible={hasAnswer} id="p1" onClickEdit={onClickEdit}>
          <p>
            {animalTypes !== "" && `I am looking for a ${animalTypes.map((animal) => animal.toLowerCase()).join(", ")}`}
          </p>
        </AnswerContainer>

        <UserLogo src={userImage} />
      </div>

      {/* If the answer is empty string ==> There is spinner represents the company is waiting to user's answer */}
      <WaitingAnswerSpinner visible={!hasAnswer} />
    </div>
  );
}

function QuestionP2({ getNextQuestion, isLoggedIn, user }) {
  const [hasAnswer, setHasAnswer] = useState(false);
  const [fromAge, setFromAge] = useState("");
  const [toAge, setToAge] = useState("");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const storedAnswer = SessionStorage.getItem("p2");

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
    <option key={`from_${age}`} disabled={age !== "All" && toAge !== "" && age > toAge}>
      {age}
    </option>
  ));
  const renderedToOptions = ageToOptions.map((age) => (
    <option key={`to${age}`} disabled={age !== "All" && fromAge !== "" && age < fromAge}>
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
      SessionStorage.setItem("p2", { fromAge: fromAge, toAge: toAge });
      if (edit === false) {
        getNextQuestion();
      }
      if (isLoggedIn) {
        fetchUpdateUserQuestionnaireById("p2", user.email, { fromAge: fromAge, toAge: toAge }).catch((err) => {
          console.log(err);
        });
      }
    }
  };

  const onClickEdit = () => {
    setHasAnswer((preState) => false);
    setEdit((preState) => true);
    SessionStorage.removeItem("petList");
  };

  return (
    <div className="xl:max-w-screen">
      {/* Question container - contains the questions */}
      <QuestionContainer>
        <p className={`${!hasAnswer && !edit ? "typewriter" : ""} overflow-hidden`}>
          What range of ages (months) are you looking for?
        </p>
      </QuestionContainer>

      {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
      <div className={`flex items-end justify-end mt-5 xl:mt-3 ${!hasAnswer && !edit ? "option" : ""}`}>
        {/* If the answer is empty string ==> Display list of options */}
        <OptionContainer visible={!hasAnswer}>
          <div className="flex gap-5 items-center">
            <p>From</p>
            <select
              id="p2a"
              name="p2a"
              className="block px-3 py-3 border-2 border-[#E0E0E0] rounded-md transition-all duration-300 focus:border-[#7C0F0F] hover:border-[#7C0F0F] cursor-pointer"
              value={fromAge}
              onChange={onSelectFromAge}>
              <option value="" disabled></option>
              {renderedFromOptions}
            </select>
            <p>To</p>

            <select
              id="p2b"
              name="p2b"
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
            id="p2NextButton"
            onClickHandler={onClickNext}
            labelStyle="hover:bg-[#7C0F0F] text-white px-3 py-1 rounded-sm font-bold mt-2 w-max cursor-pointer bg-[#669bbc] transition-all duration-300">
            Next
          </InputButton>
        </OptionContainer>

        {/* If the answer is NOT empty string ==> Display answer */}
        <AnswerContainer visible={hasAnswer} id="p2" onClickEdit={onClickEdit}>
          {fromAge === "All" && toAge === "All" && <p>I don't care about pet' ages </p>}
          {fromAge === "All" && toAge !== "All" && <p>I'm looking for a pet less than {toAge} months</p>}
          {toAge === "All" && fromAge !== "All" && <p>I'm looking for a pet more than {toAge} months</p>}
          {fromAge !== "All" && toAge !== "All" && (
            <p>
              I'm looking for a pet between {fromAge} to {toAge} months
            </p>
          )}
        </AnswerContainer>

        <UserLogo src={userImage} />
      </div>

      {/* If the answer is empty string ==> There is spinner represents the company is waiting to user's answer */}
      <WaitingAnswerSpinner visible={!hasAnswer} />
    </div>
  );
}

function QuestionP3({ getNextQuestion, isLoggedIn, user }) {
  const [hasAnswer, setHasAnswer] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const storedAnswer = SessionStorage.getItem("p3");

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
      SessionStorage.setItem("p3", sizes);
      if (edit === false) {
        getNextQuestion();
      }
      if (isLoggedIn) {
        fetchUpdateUserQuestionnaireById("p3", user.email, sizes).catch((err) => {
          console.log(err);
        });
      }
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

  const onClickEdit = () => {
    setHasAnswer((preState) => false);
    setEdit((preState) => true);
    SessionStorage.removeItem("petList");
  };

  return (
    <div className="xl:max-w-screen">
      {/* Question container - contains the questions */}
      <QuestionContainer>
        <p className={`${!hasAnswer && !edit ? "typewriter" : ""} overflow-hidden`}>
          What animal size are you looking for?
        </p>
      </QuestionContainer>

      {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
      <div className={`flex items-end justify-end mt-5 xl:mt-3 ${!hasAnswer && !edit ? "option" : ""}`}>
        {/* If the answer is empty string ==> Display list of options */}
        <OptionContainer visible={!hasAnswer}>
          <div className="flex gap-5 items-center flex-wrap justify-end">
            <InputCheckbox
              id="p3a"
              value="Large"
              inputStyle="hidden checkbox-question-input"
              labelStyle="checkbox-question-label"
              onChangeHandler={onChangeSize}
              checked={sizes.includes("Large")}>
              Large (over 60 lbs)
            </InputCheckbox>
            <InputCheckbox
              id="p3b"
              value="Medium"
              inputStyle="hidden checkbox-question-input"
              labelStyle="checkbox-question-label"
              onChangeHandler={onChangeSize}
              checked={sizes.includes("Medium")}>
              Medium (25 - 60 lbs)
            </InputCheckbox>
            <InputCheckbox
              id="p3c"
              value="Small"
              inputStyle="hidden checkbox-question-input"
              labelStyle="checkbox-question-label"
              onChangeHandler={onChangeSize}
              checked={sizes.includes("Small")}>
              Small (less than 25 lbs)
            </InputCheckbox>
          </div>
          <InputButton
            value="Next"
            inputStyle="hidden"
            id="p3NextButton"
            labelStyle="hover:bg-[#7C0F0F] text-white px-3 py-1 rounded-sm font-bold mt-2 w-max cursor-pointer bg-[#669bbc] transition-all duration-300"
            onClickHandler={onClickNext}>
            Next
          </InputButton>
        </OptionContainer>

        {/* If the answer is NOT empty string ==> Display answer */}
        <AnswerContainer visible={hasAnswer} id="p3" onClickEdit={onClickEdit}>
          <p>I'm looking for a pet with sizes:</p>
          <ul>
            {sizes.map((size) => (
              <li key={size}>
                {size === "Large"
                  ? "large (over 60 lbs)"
                  : size === "Medium"
                  ? "medium (25 - 60 lbs)"
                  : "small (less than 25 lbs)"}
              </li>
            ))}
          </ul>
        </AnswerContainer>

        <UserLogo src={userImage} />
      </div>

      {/* If the answer is empty string ==> There is spinner represents the company is waiting to user's answer */}
      <WaitingAnswerSpinner visible={!hasAnswer} />
    </div>
  );
}

function QuestionP4({ getNextQuestion, isLoggedIn, user }) {
  const [hasAnswer, setHasAnswer] = useState(false);
  const [levels, setLevels] = useState([]);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const storedAnswer = SessionStorage.getItem("p4");

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

      SessionStorage.setItem("p4", levels);
      if (edit === false) {
        getNextQuestion();
      }
      if (isLoggedIn) {
        fetchUpdateUserQuestionnaireById("p4", user.email, levels).catch((err) => {
          console.log(err);
        });
      }
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

  const onClickEdit = () => {
    setHasAnswer((preState) => false);
    setEdit((preState) => true);
    SessionStorage.removeItem("petList");
  };

  return (
    <div className="xl:max-w-screen">
      {/* Question container - contains the questions */}
      <QuestionContainer>
        <p className={`${!hasAnswer && !edit ? "typewriter" : ""} overflow-hidden`}>What energy level do you prefer?</p>
      </QuestionContainer>

      {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
      <div className={`flex items-end justify-end mt-5 xl:mt-3 ${!hasAnswer && !edit ? "option" : ""}`}>
        {/* If the answer is empty string ==> Display list of options */}
        <OptionContainer visible={!hasAnswer}>
          <div className="flex gap-5 items-center flex-wrap justify-end">
            <InputCheckbox
              id="p4a"
              value="Very Active"
              inputStyle="hidden checkbox-question-input"
              labelStyle="checkbox-question-label"
              checked={levels.includes("Very Active")}
              onChangeHandler={onChangeLevel}>
              Very Active
            </InputCheckbox>
            <InputCheckbox
              id="p4b"
              value="Moderately Active"
              inputStyle="hidden checkbox-question-input"
              labelStyle="checkbox-question-label"
              checked={levels.includes("Moderately Active")}
              onChangeHandler={onChangeLevel}>
              Moderately Active
            </InputCheckbox>
            <InputCheckbox
              id="p4c"
              value="Quietly Active"
              inputStyle="hidden checkbox-question-input"
              labelStyle="checkbox-question-label"
              checked={levels.includes("Quietly Active")}
              onChangeHandler={onChangeLevel}>
              Quietly Active
            </InputCheckbox>
          </div>
          <InputButton
            value="Next"
            inputStyle="hidden"
            id="p4NextButton"
            onClickHandler={onClickNext}
            labelStyle="hover:bg-[#7C0F0F] text-white px-3 py-1 rounded-sm font-bold mt-2 w-max cursor-pointer bg-[#669bbc] transition-all duration-300">
            Next
          </InputButton>
        </OptionContainer>

        {/* If the answer is NOT empty string ==> Display answer */}
        <AnswerContainer visible={hasAnswer} id="p4" onClickEdit={onClickEdit}>
          <p>I like a pet with active level: {levels.map((item) => item.toLowerCase()).join(", ")}</p>
        </AnswerContainer>

        <UserLogo src={userImage} />
      </div>

      {/* If the answer is empty string ==> There is spinner represents the company is waiting to user's answer */}
      <WaitingAnswerSpinner visible={!hasAnswer} />
    </div>
  );
}
