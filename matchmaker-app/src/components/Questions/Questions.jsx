import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withAuthInfo } from "@propelauth/react";

import MatchBanner from "../MatchBanner/MatchBanner";
import ReviewQuestions from "./ReviewQuestions/ReviewQuestions";

import { finishAdopterQuestionsSlice, finishPetQuestionsSlice } from "../../redux/MatchFormSlice";
import { matchedPetListSlice } from "../../redux/MatchedPetSlice";

import AdopterQuestions from "./QuestionsList/AdopterQuestions";
import IdealPetQuestions from "./QuestionsList/IdealPetQuestions";
import InputButton from "../Input/InputButton/InputButton";
import ProgressBar from "./ProgressBar/ProgressBar";

import SessionStorage from "../../features/sessionStorage";

import "./Questions.css";

export default withAuthInfo(function Questions({ visible, setIsQuestionPage, setIsLoading }) {
  const dispatch = useDispatch();
  const finishAdopterQuestion = useSelector((store) => store[finishAdopterQuestionsSlice.name]);
  const finishPetQuestion = useSelector((store) => store[finishPetQuestionsSlice.name]);
  const totalQuestions = 8;

  const [openSubmit, setOpenSubmit] = useState(false); // the submit buttion only displays when openSubmit = true
  const [currQuestions, setCurrQuestions] = useState(0);
  const [numberOfAnswers, setNumbersOfAnswers] = useState(0);
  /*
    currQuestions represents the index of current list of questions
    0 --> housing environment
    1 --> household composition
    2 --> lifestyle and commitment
    3 --> experience and expectation
    4 --> specific perferences
    5 --> review
  */
  useEffect(() => {
    // only called when the page is first reload

    /**
     * get which list of questions will display when the page is first reload
     * @returns {number} index of list of questions
     **/

    const petList = SessionStorage.getItem("petList");

    if (petList !== null) {
      // setCurrQuestions((prev) => 1);
      // setIsQuestionPage((preState) => false);
      // dispatch(matchedPetListSlice.actions.assign(petList));
    } else {
      const petQuestionId = ["p1", "p2", "p3", "p4"];

      const getQuestionNumber = () => {
        const petAnswers = petQuestionId.map((id) => SessionStorage.getItem(id) !== null);

        if (!petAnswers.includes(false)) {
          setNumbersOfAnswers((prev) => 8);
          onSubmitForm();
          return 1;
        }

        return 0; // Default value if none are true
      };

      setCurrQuestions((prev) => getQuestionNumber());
    }
  }, []);

  const onClickNext = () => {
    setCurrQuestions((preState) => preState + 1);
    setNumbersOfAnswers((prev) => 8);
  };

  const onClickBack = () => {
    setCurrQuestions((preState) => preState - 1);
    setNumbersOfAnswers((prev) => 0);
  };

  const onSubmitForm = async (event) => {
    if (event !== undefined) {
      event.preventDefault();
    }

    setCurrQuestions((prev) => 1);
    setIsLoading((preState) => true);

    const petList = SessionStorage.getItem("petList");

    if (petList !== null) {
      setCurrQuestions((prev) => 1);
      setIsQuestionPage((preState) => false);
      setIsLoading((prev) => false);
      dispatch(matchedPetListSlice.actions.assign(petList));
    } else {
      try {
        const API_BASE_URL = import.meta.env.VITE_API_URL;
        const PETS_ENDPOINT = import.meta.env.VITE_PETS_ENDPOINT;

        const url = `${API_BASE_URL}/${PETS_ENDPOINT}`;

        const jsonResponse = await fetch(url, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        });

        const data = await jsonResponse.json();

        if (jsonResponse.ok) {
          setTimeout(() => {
            setIsQuestionPage((preState) => false);
            dispatch(matchedPetListSlice.actions.assign(data.content));
            SessionStorage.setItem("petList", data.content);
            window.scroll(0, 0);
            setIsLoading((preState) => false);
          }, 5000);
        }
      } catch (err) {
        setIsLoading((preState) => false);
        console.log(err);
      }
    }
  };

  const isNextAble = finishAdopterQuestion && finishPetQuestion && currQuestions == 0;

  if (visible === false) {
    return <></>;
  }

  return (
    <>
      <MatchBanner />
      <div className="bg-white py-10 pb-40" id="form">
        <form className="flex flex-col min-h-screen xl:w-[65vw] w-[90vw] m-auto rounded-2xl " onSubmit={onSubmitForm}>
          {/* Question lists */}
          <p className="font-semibold text-xl">
            Answering the following questions will help us better understand you in finding your ideal pet
          </p>
          <ul className="flex flex-col items-end justify-start max-w-screen gap-3 rounded-xl bg-white py-20 px-6 xl:px-12 xl:py-10">
            {currQuestions === 0 && <AdopterQuestions setNumbersOfAnswers={setNumbersOfAnswers} />}
            {currQuestions === 0 && finishAdopterQuestion && (
              <IdealPetQuestions setNumbersOfAnswers={setNumbersOfAnswers} />
            )}
            {currQuestions === 1 && (
              <ReviewQuestions setOpenSubmit={setOpenSubmit} setCurrQuestions={setCurrQuestions} />
            )}
          </ul>

          {/* Buttons */}
          <div className="flex justify-between items-center mt-5">
            <InputButton
              id="nextButton"
              inputStyle="hidden"
              labelStyle={`bg-[#7C0F0F] text-white rounded-md cursor-pointer font-semibold block ${
                currQuestions === 0 ? "disabled-button" : ""
              }`}
              disabled={currQuestions === 0}>
              {/* When button is clicked, move the page to the top again*/}
              <a href="#form" onClick={onClickBack} className="block px-6 py-3">
                Question
              </a>
            </InputButton>
            {openSubmit && (
              /* Submit button */
              <>
                <label htmlFor="submitButton" className="submit-label" id="submit-label">
                  <span
                    style={{
                      fontFamily: "Koulen, sans-serif",
                      fontStyle: "normal",
                      fontWeight: 600,
                    }}>
                    Find your matched pets
                  </span>
                </label>
                <input type="submit" className="hidden" id="submitButton" />
              </>
            )}
            <InputButton
              id="backButton"
              inputStyle="hidden"
              labelStyle={`bg-[#7C0F0F] text-white rounded-md cursor-pointer font-semibold block ${
                !isNextAble ? "disabled-button" : ""
              }`}
              disabled={!isNextAble}>
              {/* When button is clicked, move the page to the top again*/}
              <a href="#form" onClick={onClickNext} className="block px-6 py-3">
                Review
              </a>
            </InputButton>
          </div>
        </form>
        <div className="fixed bottom-0 w-screen -translate-x-1/2 left-1/2 z-50 bg-[#dee2e680] flex flex-col justify-center items-center p-3 gap-2">
          <p className="font-semibold text-xl">
            Process complete {Math.floor((numberOfAnswers / totalQuestions) * 100, 2)}%
          </p>
          <div className="xl:w-[65vw] w-[90vw] h-max">
            <ProgressBar percentage={Math.floor((numberOfAnswers / totalQuestions) * 100, 2)} />
          </div>
        </div>
      </div>
    </>
  );
});
