import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import QuestionContainer from "../QuestionComponent/QuestionContainer/QuestionContainer";
import OptionContainer from "../QuestionComponent/OptionContainer/OptionContainer";
import AnswerContainer from "../QuestionComponent/AnswerContainer/AnswerContainer";
import UserLogo from "../QuestionComponent/UserLogo/UserLogo";
import WaitingAnswerSpinner from "../QuestionComponent/WaitingAnswerSpinner.jsx/WaitingAnswerSpinner";

import InputRadio from "../../Input/InputRadio/InputRadio";
import InputText from "../../Input/InputText/InputText";
import InputNumber from "../../Input/InputNumber/InputNumber";
import InputButton from "../../Input/InputButton/InputButton";

import SessionStorage from "../../../features/sessionStorage";

import user from "../../../assets/images/user.png";

import { finishHESlice } from "../../../redux/MatchFormSlice";

export default function HousingEnvironmentQuestions() {
  const dispatch = useDispatch();
  const [currQuestions, setCurrQuestions] = useState(1);
  /** 
    currQuestions represent the number of questions will display
    1 --> [he1]
    2 --> [he1, he2]
    3 --> [he1, he2, he3]
    4 --> [he1, he2, he3, he4]
    5 --> [he1, he2, he3, he4, he5]
  **/

  const questions = [
    <li key={"HE1"} className="w-full">
      <QuestionHE1 getNextQuestion={getNextQuestion} />
    </li>,
    <li key={"HE2"} className="w-full">
      <QuestionHE2 getNextQuestion={getNextQuestion} />
    </li>,
    <li key={"HE3"} className="w-full">
      <QuestionHE3 getNextQuestion={getNextQuestion} />
    </li>,
    <li key={"HE4"} className="w-full">
      <QuestionHE4 getNextQuestion={getNextQuestion} />
    </li>,
    <li key={"HE5"} className="w-full">
      <QuestionHE5 getNextQuestion={getNextQuestion} />
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
      dispatch(finishHESlice.actions.assign(true));
    }
  }

  return (
    <>
      <div className="flex justify-start w-full">
        <h2 className="text-2xl font-semibold text-[#7C0F0F]">Housing Environment</h2>
      </div>
      {questions.slice(0, currQuestions)}
    </>
  );
}

function QuestionHE1({ getNextQuestion }) {
  const [hasAnswer, setHasAnswer] = useState(false);
  const [edit, setEdit] = useState(false);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    // Only called the the page is first reload
    const storedAnswer = SessionStorage.getItem("he1");

    if (storedAnswer !== null) {
      // if session storage have the answered, then move to the next question
      setHasAnswer((preState) => true);
      getNextQuestion();
      setAnswer((preState) => storedAnswer);
    }
  }, []);

  const onClickOption = (event) => {
    setHasAnswer((preAnser) => true);
    setAnswer((preAnser) => event.target.value);
    SessionStorage.setItem("he1", event.target.value);
    getNextQuestion();
  };

  const onClickEdit = () => {
    setHasAnswer((preState) => false);
    setEdit((preState) => true);
    SessionStorage.removeItem("petList");
  };

  return (
    <div className="xl:max-w-screen">
      {/* Question container - contains the question */}
      <QuestionContainer>
        {/* Running text */}
        <p className={`${!hasAnswer && !edit ? "typewriter" : ""} overflow-hidden chatbox-text`}>
          Do you own or rent your house? If renting, do you have written permission from your landloard to have pets?
        </p>
      </QuestionContainer>

      {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
      <div className={`flex items-end justify-end xl:mt-3 mt-5 ${!hasAnswer && !edit ? "option" : ""}`}>
        {/* If the answer is empty string ==> Display list of options */}
        <OptionContainer visible={!hasAnswer}>
          <div className="flex flex-row gap-2 flex-wrap">
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
          </div>
        </OptionContainer>
        {/* If the answer is NOT empty string ==> Display answer */}
        <AnswerContainer visible={hasAnswer} id="he1" onClickEdit={onClickEdit}>
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

function QuestionHE2({ getNextQuestion }) {
  const [house, setHouse] = useState("");
  const [edit, setEdit] = useState(false);
  const [hasAnswer, setHasAnswer] = useState(false);
  const [other, setOther] = useState(false);

  useEffect(() => {
    const storedAnswer = SessionStorage.getItem("he2");

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
    SessionStorage.setItem("he2", event.target.value);
  };

  const onClickNext = () => {
    if (house !== "") {
      getNextQuestion();
      setHasAnswer((prevState) => true);
      SessionStorage.setItem("he2", house);
      SessionStorage.setItem("he2", house);
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
        <AnswerContainer visible={hasAnswer} id="he2" onClickEdit={onClickEdit}>
          <p>{house}</p>
        </AnswerContainer>
        <UserLogo src={user} />
      </div>

      {/* If the answer is empty string ==> There is spinner represents the company is waiting to user's answer */}
      <WaitingAnswerSpinner visible={!hasAnswer} />
    </div>
  );
}

function QuestionHE3({ getNextQuestion }) {
  const [type, setType] = useState("");
  const [height, setHeight] = useState(0);
  const [hasFence, setHasFence] = useState(false);
  const [hasAnswer, setHasAnswer] = useState(false);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const storedAnswer = SessionStorage.getItem("he3");

    if (storedAnswer !== null) {
      // if session storage have the answered, then move to the next question
      setHasAnswer((preState) => true);
      getNextQuestion();
      setType((preState) => storedAnswer.type);
      setHeight((preState) => storedAnswer.height);
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
    SessionStorage.setItem("he3", { type: "None", height: 0 });
    setType((prevState) => "None");
    getNextQuestion();
  };

  const onClickNext = () => {
    getNextQuestion();
    setHasAnswer((prevState) => true);
    SessionStorage.setItem("he3", { type: type, height: height });
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
          Do you have a fenced yard? If so, what type and height of fencing?
        </p>
      </QuestionContainer>

      {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
      <div className={`flex items-end justify-end xl:mt-3 mt-5 ${!hasAnswer && !edit ? "option" : ""}`}>
        <OptionContainer visible={!hasAnswer}>
          <div className="flex flex-row gap-2 flex-wrap">
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
            <InputRadio
              id="he3a"
              name="he3"
              inputStyle="hidden"
              onClickHandler={onClickNo}
              labelStyle="block px-6 py-3 border border-[#E0E0E0] rounded-md cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300">
              No
            </InputRadio>
          </div>

          {hasFence && (
            <>
              <div className="flex xl:gap-2 flex-wrap justify-end gap-y-2">
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
                  value={height}
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
        <AnswerContainer visible={hasAnswer} id="he3" onClickEdit={onClickEdit}>
          <p>{type == "None" ? "No" : `I have ${type.toLowerCase()} fence with ${height} meters`}</p>
        </AnswerContainer>
        <UserLogo src={user} />
      </div>

      {/* If the answer is empty string ==> There is spinner represents the company is waiting to user's answer */}
      <WaitingAnswerSpinner visible={!hasAnswer} />
    </div>
  );
}

function QuestionHE4({ getNextQuestion }) {
  const [hour, setHour] = useState("");
  const [hasAnswer, setHasAnswer] = useState(false);
  const [edit, setEdit] = useState(false);

  const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

  useEffect(() => {
    const storedAnswer = SessionStorage.getItem("he4");

    if (storedAnswer !== null) {
      // if session storage have the answered, then move to the next question
      setHasAnswer((preState) => true);
      getNextQuestion();
      setHour((hour) => storedAnswer);
    }
  }, []);

  const onSelect = (event) => {
    getNextQuestion();
    setHour((preState) => event.target.value);
    setHasAnswer((preState) => true);
    SessionStorage.setItem("he4", event.target.value);
  };

  const onClickEdit = () => {
    setHasAnswer((preState) => false);
    setEdit((preState) => true);
    SessionStorage.removeItem("petList");
  };

  const Options = hours.map((val) => {
    return (
      <option key={val} value={val}>
        {val}
      </option>
    );
  });

  return (
    <div className="xl:max-w-screen">
      {/* Question container - contains the questions */}
      <QuestionContainer>
        <p className={`${!hasAnswer && !edit ? "typewriter" : ""} overflow-hidden`}>
          Hour may hours per day will the pet be left alone?
        </p>
      </QuestionContainer>

      {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
      <div className={`flex items-end justify-end xl:mt-3 mt-5 ${!hasAnswer && !edit ? "option" : ""}`}>
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

        <AnswerContainer visible={hasAnswer} id="he4" onClickEdit={onClickEdit}>
          <p>{hour}</p>
        </AnswerContainer>

        <UserLogo src={user} />
      </div>

      {/* If the answer is empty string ==> There is spinner represents the company is waiting to user's answer */}
      <WaitingAnswerSpinner visible={!hasAnswer} />
    </div>
  );
}

function QuestionHE5({ getNextQuestion }) {
  const [answer, setAnswer] = useState("");
  const [hasOther, setHasOther] = useState(false);
  const [hasAnswer, setHasAnswer] = useState(false);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const storedAnswer = SessionStorage.getItem("he5");

    if (storedAnswer !== null) {
      // if session storage have the answered, then move to the next question
      setAnswer((preState) => storedAnswer);
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
    SessionStorage.setItem("he5", event.target.value);
    getNextQuestion();
  };

  const onClickNext = () => {
    if (answer !== "") {
      SessionStorage.setItem("he5", answer);
      getNextQuestion();
      setHasAnswer((preState) => true);
    }
  };

  const onChangeOtherAnswer = (event) => {
    setAnswer((prevState) => event.target.value);
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
          Where will the pet sleep and spend most of its time?
        </p>
      </QuestionContainer>

      {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
      <div className={`flex items-end justify-end xl:mt-3 mt-5 ${!hasAnswer && !edit ? "option" : ""}`}>
        <OptionContainer visible={!hasAnswer}>
          <div className="flex flex-row gap-2 flex-wrap">
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
          </div>

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

        <AnswerContainer visible={hasAnswer} id="he5" onClickEdit={onClickEdit}>
          <p>{answer}</p>
        </AnswerContainer>

        <UserLogo src={user} />
      </div>

      {/* If the answer is empty string ==> There is spinner represents the company is waiting to user's answer */}
      <WaitingAnswerSpinner visible={!hasAnswer} />
    </div>
  );
}
