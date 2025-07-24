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

import { finishHHSlice } from "../../../redux/MatchFormSlice";
import { fetchUpdateUserQuestionnaireById } from "../../../features/fetchUserRoutes";

export default withAuthInfo(function HouseholdQuestions({ isLoggedIn, user }) {
  const dispatch = useDispatch();
  const [currQuestions, setCurrQuestions] = useState(1);
  /** 
    currQuestions represent the number of questions will display
    1 --> [hh1]
    2 --> [hh1, hh2]
    3 --> [hh1, hh2, hh3]
    4 --> [hh1, hh2, hh3, hh4]
  **/

  const questions = [
    <li key={"HH1"} className="w-full">
      <QuestionHH1 getNextQuestion={getNextQuestion} isLoggedIn={isLoggedIn} user={user} />
    </li>,
    <li key={"HH2"} className="w-full">
      <QuestionHH2 getNextQuestion={getNextQuestion} isLoggedIn={isLoggedIn} user={user} />
    </li>,
    <li key={"HH3"} className="w-full">
      <QuestionHH3 getNextQuestion={getNextQuestion} isLoggedIn={isLoggedIn} user={user} />
    </li>,
    <li key={"HH4"} className="w-full">
      <QuestionHH4 getNextQuestion={getNextQuestion} isLoggedIn={isLoggedIn} user={user} />
    </li>,
  ];

  function getNextQuestion() {
    /*
      if currQuestions < question.length
        - increase the number of quetions by 1
      else
        - set finishHE is true  
      
    */
    if (currQuestions < questions.length) {
      setCurrQuestions(currQuestions + 1);
    } else {
      dispatch(finishHHSlice.actions.assign(true));
    }
  }

  return (
    <>
      <div className="flex justify-start w-full">
        <h2 className="text-2xl font-semibold text-[#7C0F0F]">Household Composition</h2>
      </div>
      {questions.slice(0, currQuestions)}
    </>
  );
});

function QuestionHH1({ getNextQuestion, isLoggedIn, user }) {
  const [house, setHouse] = useState("");
  const [edit, setEdit] = useState(false);
  const [hasAnswer, setHasAnswer] = useState(false);
  const [other, setOther] = useState(false);

  useEffect(() => {
    const storedAnswer = SessionStorage.getItem("hh1");

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
    getNextQuestion();
    SessionStorage.setItem("hh1", event.target.value);
    if (isLoggedIn) {
      fetchUpdateUserQuestionnaireById("hh1", user.email, event.target.value).catch((err) => {
        console.log(err);
      });
    }
  };

  const onClickNext = () => {
    if (house !== "") {
      getNextQuestion();
      setHasAnswer((prevState) => true);
      SessionStorage.setItem("hh1", house);
      if (isLoggedIn) {
        fetchUpdateUserQuestionnaireById("hh1", user.email, house).catch((err) => {
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
              id="hh1a"
              name="hh1"
              onClickHandler={onClickNonOther}
              value="Apartment"
              inputStyle="hidden"
              labelStyle="block px-6 py-3 border border-[#E0E0E0] rounded-md cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300">
              Aparment
            </InputRadio>

            <InputRadio
              id="hh1b"
              name="hh1"
              onClickHandler={onClickNonOther}
              value="House"
              inputStyle="hidden"
              labelStyle="block px-6 py-3 border border-[#E0E0E0] rounded-md cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300">
              House
            </InputRadio>

            <InputRadio
              id="hh1c"
              name="hh1"
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
                  id="hh1d"
                  name="hh1"
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
                  id="hh1OtherInput"
                  placeholder="Please specify"
                  value={house}
                  onChangeHandler={onChangeText}
                  inputStyle="block px-6 py-3 border-2 rounded-md focus:border-orange-400 outline-0"></InputText>

                <InputButton
                  onClickHandler={onClickNext}
                  value="Next"
                  id="hh1NextButton"
                  labelStyle="hover:bg-[#7C0F0F] text-white px-3 py-1 rounded-sm font-bold mt-2 w-max cursor-pointer bg-[#669bbc] transition-all duration-300"
                  inputStyle="hidden">
                  Next
                </InputButton>
              </>
            )}
          </div>
        </OptionContainer>

        {/* If the answer is NOT empty string ==> Display answer */}
        <AnswerContainer visible={hasAnswer} id="hh1" onClickEdit={onClickEdit}>
          <p>{house}</p>
        </AnswerContainer>
        <UserLogo src={userImage} />
      </div>

      {/* If the answer is empty string ==> There is spinner represents the company is waiting to user's answer */}
      <WaitingAnswerSpinner visible={!hasAnswer} />
    </div>
  );
}

function QuestionHH2({ getNextQuestion, isLoggedIn, user }) {
  const [children, setChildren] = useState("");
  const [youngestAge, setYoungestAge] = useState("");
  const [hasAnswer, setHasAnswer] = useState(false);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const storedAnswer = SessionStorage.getItem("hh2");

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
      SessionStorage.setItem("hh2", { children: Number(event.target.value), youngestAge: youngestAge });
      if (isLoggedIn) {
        fetchUpdateUserQuestionnaireById("hh2", user.email, {
          children: Number(event.target.value),
          youngestAge: youngestAge,
        }).catch((err) => {
          console.log(err);
        });
      }
      getNextQuestion();
      setHasAnswer((preState) => true);
    }
  };

  const onChangeYoungestAge = (event) => {
    setYoungestAge((preState) => event.target.value);
    SessionStorage.setItem("hh2", { children: children, youngestAge: event.target.value });
    if (isLoggedIn) {
      fetchUpdateUserQuestionnaireById("hh2", user.email, {
        children: children,
        youngestAge: event.target.value,
      }).catch((err) => {
        console.log(err);
      });
    }
    getNextQuestion();
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
                <label htmlFor="hh2b">Children</label>
                <select
                  id="hh2b"
                  name="hh2b"
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

          <AnswerContainer visible={hasAnswer} id="hh2" onClickEdit={onClickEdit}>
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
          <QuestionHH2a
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
  @description QuestionHH2a is a next question of HH2. However, this question does not always display to the user. 
  @description The appearance of this question depends completely on the answer of HH2
**/

function QuestionHH2a({ onChangeYoungestAge, hasAnswer, youngestAge, edit }) {
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
          id="hh2c"
          name="hh2c"
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

function QuestionHH3({ getNextQuestion, isLoggedIn, user }) {
  const [hasAnswer, setHasAnswer] = useState(false);
  const [hasAllergies, setHasAllergies] = useState(false);
  const [edit, setEdit] = useState(false);
  const [allergiesAnimal, setAllergiesAnimal] = useState([]);

  const animalOptions = ["Bird", "Cat", "Dog"];

  useEffect(() => {
    const storedAnswer = SessionStorage.getItem("hh3");

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
    SessionStorage.setItem("hh3", []);
    if (isLoggedIn) {
      fetchUpdateUserQuestionnaireById("hh3", user.email, []).catch((err) => {
        console.log(err);
      });
    }
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

      setAllergiesAnimal((preState) => allergiesAnimal);
      SessionStorage.setItem("hh3", allergiesAnimal);
      getNextQuestion();
      if (isLoggedIn) {
        fetchUpdateUserQuestionnaireById("hh3", user.email, allergiesAnimal).catch((err) => {
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
              id="hh3a"
              name="hh3"
              inputStyle="hidden"
              labelStyle="block px-6 py-3 border-2 border-[#E0E0E0] rounded-md cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300"
              onClickHandler={onClickYes}>
              Yes
            </InputRadio>
            <InputRadio
              id="hh3b"
              name="hh3"
              inputStyle="hidden"
              labelStyle="block px-6 py-3 border-2 border-[#E0E0E0] rounded-md cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300"
              onClickHandler={onClickNo}>
              No
            </InputRadio>
          </div>

          {hasAllergies && (
            <div className="relative z-30 flex flex-col items-end">
              <InputDatalist
                id="hh3c"
                children=""
                placeholder="Choose animal"
                defaultOptions={animalOptions}
                defaultAnswers={allergiesAnimal}
                onSubmitAnswer={onClickOption}
              />

              <InputButton
                value="Next"
                onClickHandler={onClickNext}
                inputStyle="hidden"
                id="hh3NextButton"
                labelStyle="hover:bg-[#7C0F0F] text-white px-3 py-1 rounded-sm font-bold mt-2 w-max cursor-pointer bg-[#669bbc] transition-all duration-300">
                Next
              </InputButton>
            </div>
          )}
        </OptionContainer>

        {/* If the answer is NOT empty string ==> Display answer */}
        <AnswerContainer visible={hasAnswer} id="hh3" onClickEdit={onClickEdit}>
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

function QuestionHH4({ getNextQuestion, isLoggedIn, user }) {
  const [hasAnimal, setHasAnimal] = useState(false);
  const [hasAnswer, setHasAnswer] = useState(false);
  const [animalList, setAnimalList] = useState("");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const storedAnswer = SessionStorage.getItem("hh4");

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
    SessionStorage.setItem("hh4", []);
    setHasAnswer((preState) => true);
    if (isLoggedIn) {
      fetchUpdateUserQuestionnaireById("hh4", user.email, []).catch((err) => {
        console.log(err);
      });
    }
    getNextQuestion();
  };

  const onClickNext = () => {
    SessionStorage.setItem("hh4", animalList);
    if (isLoggedIn) {
      fetchUpdateUserQuestionnaireById("hh4", user.email, animalList).catch((err) => {
        console.log(err);
      });
    }
    setHasAnswer((preState) => true);
    getNextQuestion();
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
                id="hh4b"
                name="hh4"
                inputStyle="hidden"
                labelStyle="block px-6 py-3 border border-[#E0E0E0] rounded-md cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300"
                onClickHandler={onClickYes}>
                Yes
              </InputRadio>
              <InputRadio
                id="hh4a"
                name="hh4"
                inputStyle="hidden"
                labelStyle="block px-6 py-3 border border-[#E0E0E0] rounded-md cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300"
                onClickHandler={onClickNo}>
                No
              </InputRadio>
            </div>
          </OptionContainer>

          <AnswerContainer visible={hasAnswer} id="hh4" onClickEdit={onClickEdit}>
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

          <UserLogo src={userImage} />
        </div>

        {/* If the answer is empty string ==> There is spinner represents the company is waiting to user's answer */}
      </div>
      {hasAnimal && !hasAnswer && (
        <div className="flex items-center justify-start mt-5">
          <Questionhh4a animalList={animalList} setAnimalList={setAnimalList} onClickNext={onClickNext} edit={edit} />
        </div>
      )}

      <WaitingAnswerSpinner visible={!hasAnswer} />
    </>
  );
}

/**
  @description Questionhh4a is a next question of hh4. However, this question does not always display to the user. 
  @description The appearance of this question depends completely on the answer of hh4
**/

function Questionhh4a({ animalList, setAnimalList, onClickNext, edit }) {
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
            id="hh4NextButton"
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
