import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { withAuthInfo } from "@propelauth/react";

import QuestionContainer from "../QuestionComponent/QuestionContainer/QuestionContainer";
import OptionContainer from "../QuestionComponent/OptionContainer/OptionContainer";
import AnswerContainer from "../QuestionComponent/AnswerContainer/AnswerContainer";
import UserLogo from "../QuestionComponent/UserLogo/UserLogo";
import WaitingAnswerSpinner from "../QuestionComponent/WaitingAnswerSpinner/WaitingAnswerSpinner";

import InputRadio from "../../Input/InputRadio/InputRadio";
import InputText from "../../Input/InputText/InputText";
import InputButton from "../../Input/InputButton/InputButton";
import InputDatalist from "../../Input/InputDatalist/InputDatalist";

import SessionStorage from "../../../features/sessionStorage";
import AnimalList from "../AnimalList/AnimalList";

import userImage from "../../../assets/images/user.png";

import { finishAdopterQuestionsSlice } from "../../../redux/MatchFormSlice";
import { fetchUpdateUserQuestionnaireById } from "../../../features/fetchUserRoutes";

export default withAuthInfo(function AdopterQuestions({ isLoggedIn, user, setNumbersOfAnswers }) {
  const dispatch = useDispatch();
  const [currQuestions, setCurrQuestions] = useState(1);
  /** 
    currQuestions represent the number of questions will display
    1 --> [a1]
    2 --> [a1, a2]
    3 --> [a1, a2, a3]
    4 --> [a1, a2, a3, a4]
  **/

  const questions = [
    <li key={"a1"} className="w-full">
      <QuestionA1 getNextQuestion={getNextQuestion} isLoggedIn={isLoggedIn} user={user} />
    </li>,
    <li key={"a2"} className="w-full">
      <QuestionA2 getNextQuestion={getNextQuestion} isLoggedIn={isLoggedIn} user={user} />
    </li>,
    <li key={"a3"} className="w-full">
      <QuestionA3 getNextQuestion={getNextQuestion} isLoggedIn={isLoggedIn} user={user} />
    </li>,
    <li key={"a4"} className="w-full">
      <QuestionA4 getNextQuestion={getNextQuestion} isLoggedIn={isLoggedIn} user={user} />
    </li>,
  ];

  function getNextQuestion() {
    setNumbersOfAnswers((prev) => prev + 1);
    if (currQuestions < questions.length) {
      setCurrQuestions(currQuestions + 1);
    } else {
      dispatch(finishAdopterQuestionsSlice.actions.assign(true));
    }
  }

  return (
    <>
      <div className="flex justify-start w-full">
        <h2 className="text-xl font-semibold text-[#7C0F0F]">About yourself</h2>
      </div>
      {questions.slice(0, currQuestions)}
    </>
  );
});

function QuestionA1({ getNextQuestion, isLoggedIn, user }) {
  const [house, setHouse] = useState("");
  const [edit, setEdit] = useState(false);
  const [hasAnswer, setHasAnswer] = useState(false);
  const [other, setOther] = useState(false);

  useEffect(() => {
    const storedAnswer = SessionStorage.getItem("a1");

    if (storedAnswer !== null) {
      // if session storage have the answered, then move to the next question
      setHouse((prevState) => storedAnswer);
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
    if (edit === false) {
      getNextQuestion();
    }
    SessionStorage.setItem("a1", event.target.value);
    if (isLoggedIn) {
      fetchUpdateUserQuestionnaireById("a1", user.email, event.target.value).catch((err) => {
        console.log(err);
      });
    }
  };

  const onClickNext = () => {
    if (house !== "") {
      if (edit === false) {
        getNextQuestion();
      }
      setHasAnswer((prevState) => true);
      SessionStorage.setItem("a1", house);
      if (isLoggedIn) {
        fetchUpdateUserQuestionnaireById("a1", user.email, house).catch((err) => {
          console.log(err);
        });
      }
    }
  };

  const onChangeText = (event) => {
    setHouse((prevState) => event.target.value);
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
        {/* Running text */}
        <p className={`${!hasAnswer && !edit ? "typewriter" : ""} overflow-hidden`}>
          What type of housing do you live in?
        </p>
      </QuestionContainer>

      {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
      <div className={`flex items-end justify-end xl:mt-3 mt-5 ${!hasAnswer && !edit ? "option" : ""}`}>
        {/* If the answer is empty string ==> Display list of options */}
        <OptionContainer visible={!hasAnswer}>
          <div className="flex flex-row gap-2 items-end flex-wrap">
            <InputRadio
              id="a1a"
              name="a1"
              onClickHandler={onClickNonOther}
              value="Apartment"
              inputStyle="hidden"
              labelStyle="block px-6 py-3 border border-[#E0E0E0] rounded-md cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300">
              Aparment
            </InputRadio>

            <InputRadio
              id="a1b"
              name="a1"
              onClickHandler={onClickNonOther}
              value="House"
              inputStyle="hidden"
              labelStyle="block px-6 py-3 border border-[#E0E0E0] rounded-md cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300">
              House
            </InputRadio>

            <InputRadio
              id="a1c"
              name="a1"
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
                  id="a1d"
                  name="a1"
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
                  id="a1OtherInput"
                  placeholder="Please specify"
                  value={house}
                  onChangeHandler={onChangeText}
                  inputStyle="block px-6 py-3 border-2 rounded-md focus:border-orange-400 outline-0"></InputText>

                <InputButton
                  onClickHandler={onClickNext}
                  value="Next"
                  id="a1NextButton"
                  labelStyle="hover:bg-[#7C0F0F] text-white px-3 py-1 rounded-sm font-bold mt-2 w-max cursor-pointer bg-[#669bbc] transition-all duration-300"
                  inputStyle="hidden">
                  Next
                </InputButton>
              </>
            )}
          </div>
        </OptionContainer>

        {/* If the answer is NOT empty string ==> Display answer */}
        <AnswerContainer visible={hasAnswer} id="a1" onClickEdit={onClickEdit}>
          <p>{house}</p>
        </AnswerContainer>
        <UserLogo src={userImage} />
      </div>

      {/* If the answer is empty string ==> There is spinner represents the company is waiting to user's answer */}
      <WaitingAnswerSpinner visible={!hasAnswer} />
    </div>
  );
}

function QuestionA2({ getNextQuestion, isLoggedIn, user }) {
  const [children, setChildren] = useState("");
  const [youngestAge, setYoungestAge] = useState("");
  const [hasAnswer, setHasAnswer] = useState(false);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const storedAnswer = SessionStorage.getItem("a2");

    if (storedAnswer !== null) {
      // if session storage have the answered, then move to the next question
      setChildren((preState) => storedAnswer.children);
      setYoungestAge((preState) => storedAnswer.youngestAge);
      getNextQuestion();
      setHasAnswer((preState) => true);
    }
  }, []);

  const onChangeChildren = (event) => {
    setChildren((preState) => Number(event.target.value));
    if (Number(event.target.value) === 0 || (Number(event.target.value) > 0 && youngestAge !== "")) {
      SessionStorage.setItem("a2", { children: Number(event.target.value), youngestAge: youngestAge });
      if (isLoggedIn) {
        fetchUpdateUserQuestionnaireById("a2", user.email, {
          children: Number(event.target.value),
          youngestAge: youngestAge,
        }).catch((err) => {
          console.log(err);
        });
      }
      if (edit === false) {
        getNextQuestion();
      }
      setHasAnswer((preState) => true);
    }
  };

  const onChangeYoungestAge = (event) => {
    setYoungestAge((preState) => event.target.value);
    SessionStorage.setItem("a2", { children: children, youngestAge: event.target.value });
    if (isLoggedIn) {
      fetchUpdateUserQuestionnaireById("a2", user.email, {
        children: children,
        youngestAge: event.target.value,
      }).catch((err) => {
        console.log(err);
      });
    }
    if (edit == false) {
      getNextQuestion();
    }
    setHasAnswer((preState) => true);
  };

  const childrenOptions = Array(11)
    .fill(0)
    .map((_, idx) => idx)
    .map((val) => (
      <option key={`children_${val}`} value={val}>
        {val}
      </option>
    ));

  const onClickEdit = () => {
    setHasAnswer((preState) => false);
    setEdit((preState) => true);
    SessionStorage.removeItem("petList");
  };

  return (
    <>
      <div className="xl:max-w-screen">
        <QuestionContainer>
          <p className={`${!hasAnswer && !edit ? "typewriter" : ""} overflow-hidden`}>Do you have children at home?</p>
        </QuestionContainer>

        {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
        <div className={`flex items-end justify-end xl:mt-3 mt-5 ${!hasAnswer && !edit ? "option" : ""}`}>
          {/* If the answer is empty string ==> Display list of options */}
          <OptionContainer visible={!hasAnswer}>
            <div className="flex gap-2">
              <div className="flex items-center gap-2">
                <label htmlFor="a2b">Children</label>
                <select
                  id="a2b"
                  name="a2b"
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

          <AnswerContainer visible={hasAnswer} id="a2" onClickEdit={onClickEdit}>
            <p>
              {children !== 0
                ? `I have ${children}
                ${children === 1 ? "child" : "children"}. The youngest one is ${youngestAge.toLowerCase()}`
                : `I don't have any child`}
            </p>
          </AnswerContainer>

          {/* Whether the answer is empty string or NOT, ALWAYS display user logo */}
          <UserLogo src={userImage} />
        </div>
      </div>
      {children !== "" && children > 0 && !hasAnswer && (
        <div className="flex items-center mt-5">
          <QuestionA2a
            onChangeYoungestAge={onChangeYoungestAge}
            hasAnswer={hasAnswer}
            youngestAge={youngestAge}
            edit={edit}
          />
        </div>
      )}

      <WaitingAnswerSpinner visible={!hasAnswer} />
    </>
  );
}

/**
  @description QuestionA2a is a next question of QuestionA2. However, this question does not always display to the user. 
  @description The appearance of this question depends completely on the answer of QuestionA2
**/

function QuestionA2a({ onChangeYoungestAge, hasAnswer, youngestAge, edit }) {
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
        <p className={`${!hasAnswer && !edit ? "typewriter" : ""} overflow-hidden`}>How old is the youngest child?</p>
      </QuestionContainer>
      {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
      <div className="flex items-end justify-end xl:mt-3 mt-5 answer">
        {/* If the answer is empty string ==> Display list of options */}
        <select
          id="a2c"
          name="a2c"
          className="block px-3 py-3 border-2 border-[#E0E0E0] rounded-md transition-all duration-300 focus:border-[#7C0F0F] hover:border-[#7C0F0F] cursor-pointer"
          onChange={onChangeYoungestAge}
          value={youngestAge}>
          <option value="" disabled></option>
          {ageOptions}
        </select>
        {/* Whether the answer is empty string or NOT, ALWAYS display user logo */}
        <UserLogo src={userImage} />
      </div>
    </div>
  );
}

function QuestionA3({ getNextQuestion, isLoggedIn, user }) {
  const [hasAnswer, setHasAnswer] = useState(false);
  const [hasAllergies, setHasAllergies] = useState(false);
  const [edit, setEdit] = useState(false);
  const [allergiesAnimal, setAllergiesAnimal] = useState([]);

  const animalOptions = ["Bird", "Cat", "Dog"];

  useEffect(() => {
    const storedAnswer = SessionStorage.getItem("a3");

    if (storedAnswer !== null) {
      // if session storage have the answered, then move to the next question
      setAllergiesAnimal((preState) => storedAnswer);
      setHasAnswer((preState) => true);
      getNextQuestion();
    }
  }, []);

  const onClickNo = () => {
    setHasAnswer((preState) => true);
    setAllergiesAnimal((preState) => []);
    SessionStorage.setItem("a3", []);
    if (isLoggedIn) {
      fetchUpdateUserQuestionnaireById("a3", user.email, []).catch((err) => {
        console.log(err);
      });
    }
    if (edit === false) {
      getNextQuestion();
    }
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

      setAllergiesAnimal((preState) => allergiesAnimal);
      SessionStorage.setItem("a3", allergiesAnimal);
      if (edit === false) {
        getNextQuestion();
      }
      if (isLoggedIn) {
        fetchUpdateUserQuestionnaireById("a3", user.email, allergiesAnimal).catch((err) => {
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
          Does anyone in the household have allergies to animals?
        </p>
      </QuestionContainer>

      {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
      <div className={`flex items-end justify-end xl:mt-3 mt-5 ${!hasAnswer && !edit ? "option" : ""} relative z-30`}>
        {/* If the answer is empty string ==> Display list of options */}
        <OptionContainer visible={!hasAnswer}>
          <div className="flex flex-row gap-2 flex-wrap">
            <InputRadio
              id="a3a"
              name="a3"
              inputStyle="hidden"
              labelStyle="block px-6 py-3 border-2 border-[#E0E0E0] rounded-md cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300"
              onClickHandler={onClickYes}>
              Yes
            </InputRadio>
            <InputRadio
              id="a3b"
              name="a3"
              inputStyle="hidden"
              labelStyle="block px-6 py-3 border-2 border-[#E0E0E0] rounded-md cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300"
              onClickHandler={onClickNo}>
              No
            </InputRadio>
          </div>

          {hasAllergies && (
            <div className="relative z-30 flex flex-col items-end">
              <InputDatalist
                id="a3c"
                children=""
                placeholder="Choose animal or type"
                defaultOptions={animalOptions}
                defaultAnswers={allergiesAnimal}
                onSubmitAnswer={onClickOption}
              />

              <InputButton
                value="Next"
                onClickHandler={onClickNext}
                inputStyle="hidden"
                id="a3NextButton"
                labelStyle="hover:bg-[#7C0F0F] text-white px-3 py-1 rounded-sm font-bold mt-2 w-max cursor-pointer bg-[#669bbc] transition-all duration-300">
                Next
              </InputButton>
            </div>
          )}
        </OptionContainer>

        {/* If the answer is NOT empty string ==> Display answer */}
        <AnswerContainer visible={hasAnswer} id="a3" onClickEdit={onClickEdit}>
          <p>
            {allergiesAnimal.length === 0
              ? "We do not have allergies to any animal"
              : `My family has allergies with ${allergiesAnimal.map((animal) => animal.toLowerCase()).join(", ")}`}
          </p>
        </AnswerContainer>

        <UserLogo src={userImage} />
      </div>

      {/* If the answer is empty string ==> There is spinner represents the company is waiting to user's answer */}
      <WaitingAnswerSpinner visible={!hasAnswer} />
    </div>
  );
}

function QuestionA4({ getNextQuestion, isLoggedIn, user }) {
  const [hasAnimal, setHasAnimal] = useState(false);
  const [hasAnswer, setHasAnswer] = useState(false);
  const [animalList, setAnimalList] = useState([]);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const storedAnswer = SessionStorage.getItem("a4");

    if (storedAnswer !== null) {
      // if session storage have the answered, then move to the next question
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
    SessionStorage.setItem("a4", []);
    setHasAnswer((preState) => true);
    if (isLoggedIn) {
      fetchUpdateUserQuestionnaireById("a4", user.email, []).catch((err) => {
        console.log(err);
      });
    }
    if (edit === false) {
      getNextQuestion();
    }
  };

  const onClickNext = () => {
    // Check validation

    let validAnimalList = true;

    animalList.forEach((animal) => {
      if (animal.age === "" || animal.type === "") {
        validAnimalList = false;
      }
    });

    if (validAnimalList) {
      SessionStorage.setItem("a4", animalList);
      if (isLoggedIn) {
        fetchUpdateUserQuestionnaireById("a4", user.email, animalList).catch((err) => {
          console.log(err);
        });
      }
      setHasAnswer((preState) => true);
      if (edit === false) {
        getNextQuestion();
      }
    }
  };

  const onClickEdit = () => {
    setHasAnswer((preState) => false);
    setEdit((preState) => true);
    SessionStorage.removeItem("petList");
  };

  return (
    <>
      <div className="xl:max-w-screen">
        {/* Question container - contains the questions */}
        <QuestionContainer>
          <p className={`${!hasAnswer && !edit ? "typewriter" : ""} overflow-hidden`}>
            Do you currently have other pets?
          </p>
        </QuestionContainer>

        {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
        <div className={`flex items-end justify-end xl:mt-3 mt-5 ${!hasAnswer && !edit ? "option" : ""}`}>
          <OptionContainer visible={!hasAnswer}>
            <div className="flex flex-row gap-2">
              <InputRadio
                id="a4b"
                name="a4"
                inputStyle="hidden"
                labelStyle="block px-6 py-3 border border-[#E0E0E0] rounded-md cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300"
                onClickHandler={onClickYes}>
                Yes
              </InputRadio>
              <InputRadio
                id="a4a"
                name="a4"
                inputStyle="hidden"
                labelStyle="block px-6 py-3 border border-[#E0E0E0] rounded-md cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300"
                onClickHandler={onClickNo}>
                No
              </InputRadio>
            </div>
          </OptionContainer>

          <AnswerContainer visible={hasAnswer} id="a4" onClickEdit={onClickEdit}>
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
                    <li key={idx} className="list-decimal list-inside">
                      {animal.type} - {animal.age} months - {animal.isNeutered === true ? "Neutered" : "Spayed"}
                    </li>
                  ))}
                </ol>
              </>
            )}
          </AnswerContainer>

          <UserLogo src={userImage} />
        </div>

        {/* If the answer is empty string ==> There is spinner represents the company is waiting to user's answer */}
      </div>
      {hasAnimal && !hasAnswer && (
        <div className="flex items-center justify-start mt-5">
          <Questiona4a animalList={animalList} setAnimalList={setAnimalList} onClickNext={onClickNext} edit={edit} />
        </div>
      )}

      <WaitingAnswerSpinner visible={!hasAnswer} />
    </>
  );
}

/**
  @description Questiona4a is a next question of a4. However, this question does not always display to the user. 
  @description The appearance of this question depends completely on the answer of a4
**/

function Questiona4a({ animalList, setAnimalList, onClickNext, edit }) {
  return (
    <div className="xl:max-w-screen w-full">
      {/* Question container - contains the questions */}
      <QuestionContainer>
        <p className={`${!edit ? "typewriter" : ""} overflow-hidden`}>
          If so, what types, ages, and are they spayed/neutered?
        </p>
      </QuestionContainer>

      {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
      <div className="flex items-end justify-end xl:mt-3 mt-5 answer">
        <OptionContainer>
          <AnimalList animalList={animalList} setAnimalList={setAnimalList} />
          <InputButton
            id="a4NextButton"
            labelStyle="hover:bg-[#7C0F0F] text-white px-3 py-1 rounded-sm font-bold mt-2 w-max cursor-pointer bg-[#669bbc] transition-all duration-300"
            inputStyle="hidden"
            onClickHandler={onClickNext}>
            Next
          </InputButton>
        </OptionContainer>
        <UserLogo src={userImage} />
      </div>
    </div>
  );
}
