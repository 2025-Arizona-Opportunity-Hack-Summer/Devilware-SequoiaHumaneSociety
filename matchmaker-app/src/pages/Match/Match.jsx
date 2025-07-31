import { useEffect, useState } from "react";
import { withAuthInfo } from "@propelauth/react";

import Questions from "../../components/Questions/Questions";
import MatchedPets from "../../components/MatchedPets/MatchedPets";
import WaitingLoaderFindPets from "../../components/WaitingLoaderFindPets/WaitingLoaderFindPets";
import Modal from "../../components/Modal/Modal";
import { Link } from "react-router";

import shsLogo from "../../assets/images/shs-logo.png";

import "./Match.css";

import SessionStorage from "../../features/sessionStorage";

export default withAuthInfo(function Match({ isLoggedIn }) {
  const [isQuestionPage, setIsQuestionPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleWarningModal, setVisibleWarningModal] = useState(false);

  const onClickCloseWarningModal = () => {
    setVisibleWarningModal((prev) => false);
    SessionStorage.setItem("keep-logged-out", true);
  };

  useEffect(() => {
    if (!isLoggedIn && SessionStorage.getItem("keep-logged-out") === null) {
      setVisibleWarningModal((prev) => true);
    }
  }, [isLoggedIn]);

  return (
    <>
      <div className="match">
        <Questions
          setIsQuestionPage={setIsQuestionPage}
          visible={!isLoading && isQuestionPage}
          setIsLoading={setIsLoading}
        />
        <WaitingLoaderFindPets visible={isLoading} />
        <MatchedPets setIsQuestionPage={setIsQuestionPage} visible={!isLoading && !isQuestionPage} />
      </div>
      <Modal visible={visibleWarningModal}>
        <div className="bg-white w-max absolute -translate-1/2 top-1/2 left-1/2 shadow-2xl p-6 rounded-md warning-modal">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center">
              <WarningSVG />
              <h2 className="text-2xl font-semibold text-[#e77728]">Warning</h2>
            </div>
            <p className="font-semibold max-w-xl text-center">
              You are not logged in, your matched pets result and preferences will not be stored once you close the tab
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2 items-center">
              <img src={shsLogo} alt="shs" className="w-40" />
              <p className="font-medium">Become a Sequoia user and gain access to your preferences</p>
              <div className="flex flex-col gap-2 w-full items-center">
                <Link to="/register">
                  <button className="sign-in-button">Create an account</button>
                </Link>
                <Link to="/sign-in">
                  <button className="sign-in-button">Sign in with Sequoia</button>
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <p className="font-semibold text-[#adb5bd]">OR</p>
              <button className="keep-logout-button" onClick={onClickCloseWarningModal}>
                Keep me as logged out
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
});

function WarningSVG() {
  return (
    <svg className="w-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />

      <g id="SVGRepo_iconCarrier">
        <path
          d="M15 16L20 21M20 16L15 21M11 14C7.13401 14 4 17.134 4 21H11M15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z"
          stroke="#e77728"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>
  );
}
