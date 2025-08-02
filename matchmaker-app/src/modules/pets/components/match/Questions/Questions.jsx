import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withAuthInfo } from "@propelauth/react";

import ReviewAnswers from "./QuestionsComponents/ReviewAnswers";

import { finishAdopterQuestionsSlice, finishPetQuestionsSlice } from "../../../../../store/slices/MatchFormSlice";
import { matchedPetListSlice } from "../../../../../store/slices/MatchedPetSlice";

import AdopterQuestions from "./QuestionsComponents/AdopterQuestions";
import IdealPetQuestions from "./QuestionsComponents/IdealPetQuestions";

import InputButton from "../../../../../components/common/inputs/InputButton";
import ProgressBar from "./QuestionsComponents/ProgressBar";

import { fetchMatchedPets } from "../../../services/petServices";
import SessionStorage from "../../../../../utils/sessionStorage";

import "./Questions.css";

export default withAuthInfo(function Questions({ visible, setIsQuestionPage, setIsLoading }) {
  const dispatch = useDispatch();
  const finishAdopterQuestion = useSelector((store) => store[finishAdopterQuestionsSlice.name]);
  const finishPetQuestion = useSelector((store) => store[finishPetQuestionsSlice.name]);
  const totalQuestions = 8;

  const [openSubmit, setOpenSubmit] = useState(false); // the submit buttion only displays when openSubmit = true
  const [currQuestions, setCurrQuestions] = useState(0);
  const [numberOfAnswers, setNumbersOfAnswers] = useState(0);

  useEffect(() => {
    // only called when the page is first reload

    /**
     * get which list of questions will display when the page is first reload
     * @returns {number} index of list of questions
     **/

    const petList = SessionStorage.getItem("petList");

    if (petList !== null) {
      setCurrQuestions((prev) => 1);
      setIsQuestionPage((preState) => false);
      setNumbersOfAnswers((prev) => 8);

      dispatch(matchedPetListSlice.actions.assign(petList));
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

    try {
      const data = await fetchMatchedPets({
        a1: SessionStorage.getItem("a1"),
        a2: SessionStorage.getItem("a2"),
        a3: SessionStorage.getItem("a3"),
        a4: SessionStorage.getItem("a4"),
        p1: [SessionStorage.getItem("p1")],
        p2: SessionStorage.getItem("p2"),
        p3: SessionStorage.getItem("p3"),
        p4: SessionStorage.getItem("p4"),
      });

      setTimeout(() => {
        setIsQuestionPage((preState) => false);
        dispatch(matchedPetListSlice.actions.assign(data));
        SessionStorage.setItem("petList", data);
        setIsLoading((preState) => false);
      }, 3000);
    } catch (err) {
      setIsLoading((preState) => false);
      console.log(err);
    }
  };

  const isNextAble = finishAdopterQuestion && finishPetQuestion && currQuestions == 0;

  if (visible === false) {
    return <></>;
  }

  return (
    <div className="bg-white py-10" id="form">
      <form className="flex flex-col min-h-screen m-auto rounded-2xl " onSubmit={onSubmitForm}>
        {/* Question lists */}
        <p className="font-semibold text-xl">
          Answering the following questions will help us better understand you in finding your ideal pet
        </p>
        <ul className="flex flex-col items-end justify-start max-w-screen gap-3 rounded-xl bg-white py-20 px-6 xl:px-12 xl:py-10">
          {currQuestions === 0 && <AdopterQuestions setNumbersOfAnswers={setNumbersOfAnswers} />}
          {currQuestions === 0 && finishAdopterQuestion && (
            <IdealPetQuestions setNumbersOfAnswers={setNumbersOfAnswers} />
          )}
          {currQuestions === 1 && <ReviewAnswers setOpenSubmit={setOpenSubmit} setCurrQuestions={setCurrQuestions} />}
        </ul>

        {/* Buttons */}
        <div className="flex justify-between items-center mt-5">
          <InputButton
            id="backButton"
            inputStyle="hidden"
            labelStyle={`rounded-md font-semibold block ${
              currQuestions === 0 ? "disabled-button" : "cursor-pointer bg-[#7C0F0F] text-white"
            }`}
            disabled={currQuestions === 0}>
            {/* When button is clicked, move the page to the top again*/}
            {currQuestions === 0 && <p className="block px-6 py-3">Question</p>}
            {currQuestions !== 0 && (
              <a href="#form" className="block px-6 py-3" onClick={onClickBack}>
                Question
              </a>
            )}
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
            id="nextButton"
            inputStyle="hidden"
            labelStyle={`bg-[#7C0F0F] text-white rounded-md cursor-pointer font-semibold block ${
              !isNextAble ? "disabled-button" : ""
            }`}
            disabled={!isNextAble}>
            {/* When button is clicked, move the page to the top again*/}
            {!isNextAble && <p className="block px-6 py-3">Review</p>}
            {isNextAble && (
              <a href="#form" onClick={onClickNext} className="block px-6 py-3">
                Review
              </a>
            )}
          </InputButton>
        </div>
        <div className="mt-10 flex flex-col justify-center items-center p-3 gap-2">
          <p className="font-semibold text-xl">
            Process complete{" "}
            {Math.floor((numberOfAnswers / totalQuestions) * 100, 2) > 100
              ? 100
              : Math.floor((numberOfAnswers / totalQuestions) * 100, 2)}
            %
          </p>
          <div className="w-full h-max">
            <ProgressBar percentage={Math.floor((numberOfAnswers / totalQuestions) * 100, 2)} />
          </div>
        </div>
      </form>
    </div>
  );
});
