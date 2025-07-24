import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withAuthInfo } from "@propelauth/react";

import ProgressBar from "./ProgressBar/ProgressBar";
import MatchBanner from "../MatchBanner/MatchBanner";
import ReviewQuestions from "./ReviewQuestions/ReviewQuestions";

import { finishAdopterQuestionsSlice, finishPetQuestionsSlice } from "../../redux/MatchFormSlice";
import { matchedPetListSlice } from "../../redux/MatchedPetSlice";

import AdopterQuestions from "./QuestionsList/AdopterQuestions";
import IdealPetQuestions from "./QuestionsList/IdealPetQuestions";
import InputButton from "../Input/InputButton/InputButton";

import SessionStorage from "../../features/sessionStorage";

import "./Questions.css";

export default withAuthInfo(function Questions({ visible, setIsQuestionPage, setIsLoading }) {
  const dispatch = useDispatch();
  const finishAdopterQuestion = useSelector((store) => store[finishAdopterQuestionsSlice.name]);
  const finishPetQuestion = useSelector((store) => store[finishPetQuestionsSlice.name]);

  const [openSubmit, setOpenSubmit] = useState(false); // the submit buttion only displays when openSubmit = true
  const [currQuestions, setCurrQuestions] = useState(0);
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

    const adopterQuestionId = ["a1", "a2", "a3", "a4"];
    const petQuestionId = ["p1", "p2", "p3", "p4"];

    const getQuestionNumber = () => {
      const petAnswers = petQuestionId.map((id) => SessionStorage.getItem(id) !== null);

      if (!petAnswers.includes(false)) {
        // if the session storage store all SP answers then all other questions from EE, LC, HC, and HE have also been answered
        dispatch(finishAdopterQuestionsSlice.actions.assign(true));
        dispatch(finishPetQuestionsSlice.actions.assign(true));
        onSubmitForm();
        return 1;
      }

      const adopterAnswers = adopterQuestionId.map((id) => SessionStorage.getItem(id) !== null);

      if (!adopterAnswers.includes(false)) {
        // if the session storage store all EE answers then all other questions from LC, HC, and HE have also been answered
        dispatch(finishAdopterQuestionsSlice.actions.assign(true));
      }

      return 0; // Default value if none are true
    };

    setCurrQuestions((prev) => 0);
  }, []);

  const onClickNext = () => {
    setCurrQuestions((preState) => preState + 1);
  };

  const onClickBack = () => {
    setCurrQuestions((preState) => preState - 1);
  };

  const onSubmitForm = async (event) => {
    if (event !== undefined) {
      event.preventDefault();
    }

    setCurrQuestions((prev) => 1);
    const petList = SessionStorage.getItem("petList");

    if (petList === null) {
      setIsLoading((preState) => true);
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
    } else {
      setIsLoading((preState) => false);
      setIsQuestionPage((preState) => false);
      dispatch(matchedPetListSlice.actions.assign(petList));
    }
  };

  const isNextAble = finishAdopterQuestion && finishPetQuestion && currQuestions == 0;

  if (visible === false) {
    return <></>;
  }

  return (
    <>
      <MatchBanner />
      <div className="bg-white py-10" id="form">
        <form className="flex flex-col min-h-screen xl:w-[65vw] w-[90vw] m-auto rounded-2xl " onSubmit={onSubmitForm}>
          {/* Question lists */}
          <p className="font-semibold text-xl">
            Answering the following questions will help us better understand you in finding your ideal pet
          </p>
          <ul className="flex flex-col items-end justify-start max-w-screen gap-5 rounded-xl bg-white py-20 xl:pr-12 xl:pl-24 px-6">
            {/* <ProgressBar currIdx={currQuestions} /> */}
            {currQuestions === 0 && <AdopterQuestions />}
            {currQuestions === 0 && finishAdopterQuestion && <IdealPetQuestions />}
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
                Back
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
                Next
              </a>
            </InputButton>
          </div>
        </form>
      </div>
    </>
  );
});
