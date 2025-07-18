import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { withAuthInfo } from "@propelauth/react";

import userImage from "../../../assets/images/user.png";

import QuestionContainer from "../QuestionComponent/QuestionContainer/QuestionContainer";
import AnswerContainer from "../QuestionComponent/AnswerContainer/AnswerContainer";
import OptionContainer from "../QuestionComponent/OptionContainer/OptionContainer";
import WaitingAnswerSpinner from "../QuestionComponent/WaitingAnswerSpinner/WaitingAnswerSpinner";
import UserLogo from "../QuestionComponent/UserLogo/UserLogo";

import InputRadio from "../../Input/InputRadio/InputRadio";

import { finishLCSlice } from "../../../redux/MatchFormSlice";
import { fetchUpdateUserQuestionnaireById } from "../../../features/fetchUserRoutes";

import SessionStorage from "../../../features/sessionStorage";

export default withAuthInfo(function LifestyleCommitmentQuestions({ isLoggedIn, user }) {
  const dispatch = useDispatch();
  const [currQuestions, setCurrQuestions] = useState(1);
  /** 
    currQuestions represent the number of questions will display
    1 --> [lc1]
    2 --> [lc1, lc2]
    3 --> [lc1, lc2, lc3]
    4 --> [lc1, lc2, lc3, lc4]
    5 --> [lc1, lc2, lc3, lc4, lc5]
  **/

  const questions = [
    <li key={"LC1"} className="w-full">
      <QuestionLC1 getNextQuestion={getNextQuestion} isLoggedIn={isLoggedIn} user={user} />
    </li>,
    <li key={"LC2"} className="w-full">
      <QuestionLC2 getNextQuestion={getNextQuestion} isLoggedIn={isLoggedIn} user={user} />
    </li>,
    <li key={"LC3"} className="w-full">
      <QuestionLC3 getNextQuestion={getNextQuestion} isLoggedIn={isLoggedIn} user={user} />
    </li>,
    <li key={"LC4"} className="w-full">
      <QuestionLC4 getNextQuestion={getNextQuestion} isLoggedIn={isLoggedIn} user={user} />
    </li>,
    <li key={"LC5"} className="w-full">
      <QuestionLC5 getNextQuestion={getNextQuestion} isLoggedIn={isLoggedIn} user={user} />
    </li>,
  ];

  function getNextQuestion() {
    /*
      if currQuestions < question.length
        - increase the number of quetions by 1
      else
        - set finishLC is true  
      
    */
    if (currQuestions < questions.length) {
      setCurrQuestions(currQuestions + 1);
    } else {
      dispatch(finishLCSlice.actions.assign(true));
    }
  }

  return (
    <>
      <div className="flex justify-start w-full">
        <h2 className="text-2xl font-semibold text-[#7C0F0F]">Lifestyle & Commitment</h2>
      </div>
      {questions.slice(0, currQuestions)}
    </>
  );
});

function QuestionLC1({ getNextQuestion, isLoggedIn, user }) {
  const [reason, setReason] = useState("");
  const [hasAnswer, setHasAnswer] = useState(false);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const storedAnswer = SessionStorage.getItem("lc1");

    if (storedAnswer !== null) {
      // if session storage have the answered, then move to the next question
      setReason((preState) => storedAnswer);
      getNextQuestion();
      setHasAnswer((preState) => true);
    }
  }, []);

  const onClickOption = (event) => {
    setReason((prevState) => event.target.value);
    SessionStorage.setItem("lc1", event.target.value);
    setHasAnswer((prevState) => true);
    getNextQuestion();
    if (isLoggedIn) {
      fetchUpdateUserQuestionnaireById("lc1", user.email, event.target.value).catch((err) => {
        console.log(err);
      });
    }
  };

  const options = ["Save a live", "Find companion"];

  const renderedOptions = options.map((option) => (
    <option key={option} value={option}>
      {option}
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
          <p className={`${!hasAnswer && !edit ? "typewriter" : ""} overflow-hidden`}>
            What is your primary reason for wanting to adopt a pet?
          </p>
        </QuestionContainer>

        {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
        <div className={`flex items-end justify-end xl:mt-3 mt-5 ${!hasAnswer && !edit ? "option" : ""}`}>
          {/* If the answer is empty string ==> Display list of options */}
          <OptionContainer visible={!hasAnswer}>
            <select
              id="lc1a"
              name="lc1a"
              className="block p-3 border-2 border-[#E0E0E0] rounded-md transition-all duration-300 focus:border-[#7C0F0F] hover:border-[#7C0F0F] cursor-pointer"
              onChange={onClickOption}
              value={reason}>
              <option value="" disabled></option>
              {renderedOptions}
            </select>
          </OptionContainer>
          {/* If the answer is NOT empty string ==> Display answer */}

          <AnswerContainer visible={hasAnswer} id="lc1" onClickEdit={onClickEdit}>
            <p>{reason}</p>
          </AnswerContainer>

          {/* Whether the answer is empty string or NOT, ALWAYS display user logo */}
          <UserLogo src={userImage} />
        </div>
      </div>

      <WaitingAnswerSpinner visible={!hasAnswer} />
    </>
  );
}

function QuestionLC2({ getNextQuestion, isLoggedIn, user }) {
  const [hasAnswer, setHasAnswer] = useState(false);
  const [hour, setHour] = useState("");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const storedAnswer = SessionStorage.getItem("lc2");

    if (storedAnswer !== null) {
      // if session storage have the answered, then move to the next question
      setHour((hour) => storedAnswer);
      setHasAnswer((preState) => true);
      getNextQuestion();
    }
  }, []);

  console.log(isLoggedIn);
  const onClickOption = (event) => {
    setHasAnswer((preState) => true);
    setHour((hour) => Number(event.target.value));
    SessionStorage.setItem("lc2", Number(event.target.value));
    if (isLoggedIn) {
      fetchUpdateUserQuestionnaireById("lc2", user.email, Number(event.target.value)).catch((err) => {
        console.log(err);
      });
    }
    getNextQuestion();
  };

  /* Create a list of value from 0 to 25 --> [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ..., 25] */
  const hourOptions = Array(25)
    .fill(0)
    .map((_, idx) => idx);
  const renderedOptions = hourOptions.map((value) => (
    <option key={value} value={value}>
      {value}
    </option>
  ));

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
          How many hours can you dedicate daily to exercise, training, and interaction?
        </p>
      </QuestionContainer>

      {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
      <div className={`flex items-end justify-end xl:mt-3 mt-5 ${!hasAnswer && !edit ? "option" : ""}`}>
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
        <AnswerContainer visible={hasAnswer} id="lc2" onClickEdit={onClickEdit}>
          <p>{hour}</p>
        </AnswerContainer>

        <UserLogo src={userImage} />
      </div>

      {/* If the answer is empty string ==> There is spinner represents the company is waiting to user's answer */}
      <WaitingAnswerSpinner visible={!hasAnswer} />
    </div>
  );
}

function QuestionLC3({ getNextQuestion, isLoggedIn, user }) {
  const [hasAnswer, setHasAnswer] = useState(false);
  const [activityLevel, setActivityLevel] = useState("");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const storedAnswer = SessionStorage.getItem("lc3");

    if (storedAnswer !== null) {
      // if session storage have the answered, then move to the next question
      setActivityLevel((preState) => storedAnswer);
      setHasAnswer((preState) => true);
      getNextQuestion();
    }
  }, []);

  const onClickOption = (event) => {
    setHasAnswer((preState) => true);
    setActivityLevel((preState) => event.target.value);
    SessionStorage.setItem("lc3", event.target.value);
    if (isLoggedIn) {
      fetchUpdateUserQuestionnaireById("lc3", user.email, Number(event.target.value)).catch((err) => {
        console.log(err);
      });
    }
    getNextQuestion();
  };

  const onClickEdit = () => {
    setHasAnswer((preState) => false);
    setEdit((preState) => true);
    SessionStorage.removeItem("petList");
  };

  const activityLevelOptions = ["Very active", "Moderately active", "Quiet Active"];

  const renderedOptions = activityLevelOptions.map((option) => (
    <option key={option} value={option.toLowerCase()}>
      {option}
    </option>
  ));

  return (
    <div className="xl:max-w-screen">
      {/* Question container - contains the questions */}
      <QuestionContainer>
        <p className={`${!hasAnswer && !edit ? "typewriter" : ""} overflow-hidden`}>What is your activity level?</p>
      </QuestionContainer>

      {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
      <div className={`flex items-end justify-end xl:mt-3 mt-5 ${!hasAnswer && !edit ? "option" : ""}`}>
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
        <AnswerContainer visible={hasAnswer} id="lc3" onClickEdit={onClickEdit}>
          <p>I am {activityLevel.toLowerCase()}</p>
        </AnswerContainer>

        <UserLogo src={userImage} />
      </div>

      {/* If the answer is empty string ==> There is spinner represents the company is waiting to user's answer */}
      <WaitingAnswerSpinner visible={!hasAnswer} />
    </div>
  );
}

function QuestionLC4({ getNextQuestion, isLoggedIn, user }) {
  const [hasAnswer, setHasAnswer] = useState(false);
  const [plan, setPlan] = useState("");
  const [frequency, setFrequency] = useState("");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const storedAnswer = SessionStorage.getItem("lc4");

    if (storedAnswer !== null) {
      // if session storage have the answered, then move to the next question
      getNextQuestion();
      setHasAnswer((preState) => true);
      setPlan((preState) => storedAnswer.plan);
      setFrequency((preState) => storedAnswer.frequency);
    }
  }, []);

  const onClickNever = (event) => {
    setHasAnswer((preState) => true);
    setFrequency((preState) => event.target.value);
    SessionStorage.setItem("lc4", { frequency: "Never", plan: "" });
    if (isLoggedIn) {
      fetchUpdateUserQuestionnaireById("lc4", user.email, { frequency: "Never", plan: "" }).catch((err) => {
        console.log(err);
      });
    }
    getNextQuestion();
  };

  const onClickNonNever = (event) => {
    setFrequency((preState) => event.target.value);
  };

  const onSelectPlan = (event) => {
    setPlan(event.target.value);
    setHasAnswer((preState) => true);
    SessionStorage.setItem("lc4", { frequency: frequency, plan: event.target.value });
    getNextQuestion();
    if (isLoggedIn) {
      fetchUpdateUserQuestionnaireById("lc4", user.email, { frequency: frequency, plan: event.target.value }).catch(
        (err) => {
          console.log(err);
        }
      );
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
            {/* Running text */}
            How often do you travel?
          </p>
        </QuestionContainer>
        {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
        <div className={`flex items-end justify-end xl:mt-3 mt-5 ${!hasAnswer && !edit ? "option" : ""}`}>
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
          <AnswerContainer visible={hasAnswer} id="lc4" onClickEdit={onClickEdit}>
            <p>
              I {frequency.toLowerCase()} travel. {frequency === "Never" ? "" : `When I travel, ${plan}`}
            </p>
          </AnswerContainer>

          <UserLogo src={userImage} />
        </div>
      </div>
      {frequency !== "Never" && frequency !== "" && !hasAnswer && (
        <QuestionLC4a onSelectPlan={onSelectPlan} plan={plan} edit={edit} />
      )}
      {/* If the answer is empty string ==> There is spinner represents the company is waiting to user's answer */}
      <WaitingAnswerSpinner visible={!hasAnswer} />
    </>
  );
}

/**
  @description QuestionLC4a is a next question of LC4. However, this question does not always display to the user. 
  @description The appearance of this question depends completely on the answer of LC4
**/

function QuestionLC4a({ onSelectPlan, plan, edit }) {
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
    <div className="xl:max-w-screen w-full mt-5">
      <QuestionContainer>
        <p className={`${!edit ? "typewriter" : ""} overflow-hidden`}>
          {/* Running text */}
          What are your plans for pet care during travel?
        </p>
      </QuestionContainer>

      {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
      <div className="flex items-end justify-end xl:mt-3 mt-5 answer relative z-30">
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

        <UserLogo src={userImage} />
      </div>
    </div>
  );
}

function QuestionLC5({ getNextQuestion, isLoggedIn, user }) {
  const [hasAnswer, setHasAnswer] = useState(false);
  const [answer, setAnswer] = useState("");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const storedAnswer = SessionStorage.getItem("lc5");

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
    SessionStorage.setItem("lc5", false);
    if (isLoggedIn) {
      fetchUpdateUserQuestionnaireById("lc5", user.email, false).catch((err) => {
        console.log(err);
      });
    }
  };

  const onClickYes = () => {
    getNextQuestion();
    setHasAnswer((preState) => true);
    setAnswer((preState) => true);
    SessionStorage.setItem("lc5", true);
    if (isLoggedIn) {
      fetchUpdateUserQuestionnaireById("lc5", user.email, true).catch((err) => {
        console.log(err);
      });
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
            {/* Running text */}
            Are you prepared for the 10-20 year commitment of pet ownership?
          </p>
        </QuestionContainer>
        {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
        <div className={`flex items-end justify-end xl:mt-3 mt-5 ${!hasAnswer && !edit ? "option" : ""}`}>
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
          <AnswerContainer visible={hasAnswer} id="lc5" onClickEdit={onClickEdit}>
            <p>{answer === false ? "No" : "Yes"}</p>
          </AnswerContainer>

          <UserLogo src={userImage} />
        </div>
      </div>
      {/* If the answer is empty string ==> There is spinner represents the company is waiting to user's answer */}
      <WaitingAnswerSpinner visible={!hasAnswer} />
    </>
  );
}
