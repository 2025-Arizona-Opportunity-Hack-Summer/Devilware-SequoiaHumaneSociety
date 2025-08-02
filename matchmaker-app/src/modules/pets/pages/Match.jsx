// import { useEffect, useState } from "react";
// import { withAuthInfo } from "@propelauth/react";
// import { Link } from "react-router";

// import Questions from "../components/match/Questions/Questions";
// import WaitingLoaderFindPets from "../components/match/WaitingLoaderFindPets/WaitingLoaderFindPets";
// import MatchedPets from "../components/match/MatchedPets/MatchedPets";

// import Modal from "../../../components/common/Modal/Modal";

// import shsLogo from "../../../assets/images/shs-logo.png";
// import "./Match.css";

// import SessionStorage from "../../../utils/sessionStorage";

// export default withAuthInfo(function Match({ isLoggedIn }) {
//   const [isQuestionPage, setIsQuestionPage] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);
//   const [visibleWarningModal, setVisibleWarningModal] = useState(false);

//   const onClickCloseWarningModal = () => {
//     setVisibleWarningModal((prev) => false);
//     SessionStorage.setItem("keep-logged-out", true);
//   };

//   useEffect(() => {
//     if (!isLoggedIn && SessionStorage.getItem("keep-logged-out") === null) {
//       setVisibleWarningModal((prev) => true);
//     }
//   }, [isLoggedIn]);

//   return (
//     <>
//       <div className="match">
//         <Questions
//           setIsQuestionPage={setIsQuestionPage}
//           visible={!isLoading && isQuestionPage}
//           setIsLoading={setIsLoading}
//         />
//         <WaitingLoaderFindPets visible={isLoading} />
//         <MatchedPets setIsQuestionPage={setIsQuestionPage} visible={!isLoading && !isQuestionPage} />
//       </div>
//       <Modal visible={visibleWarningModal}>
//         <div className="bg-white w-max absolute -translate-1/2 top-1/2 left-1/2 shadow-2xl p-6 rounded-md warning-modal">
//           <div className="flex flex-col items-center gap-2">
//             <div className="flex items-center">
//               <WarningSVG />
//               <h2 className="text-2xl font-semibold text-[#e77728]">Warning</h2>
//             </div>
//             <p className="font-semibold max-w-xl text-center">
//               You are not logged in, your matched pets result and preferences will not be stored once you close the tab
//             </p>
//           </div>
//           <div className="flex flex-col gap-3">
//             <div className="flex flex-col gap-2 items-center">
//               <img src={shsLogo} alt="shs" className="w-40" />
//               <p className="font-medium">Become a Sequoia user and gain access to your preferences</p>
//               <div className="flex flex-col gap-2 w-full items-center">
//                 <Link to="/register">
//                   <button className="sign-in-button">Create an account</button>
//                 </Link>
//                 <Link to="/sign-in">
//                   <button className="sign-in-button">Sign in with Sequoia</button>
//                 </Link>
//               </div>
//             </div>
//             <div className="flex flex-col gap-2 items-center">
//               <p className="font-semibold text-[#adb5bd]">OR</p>
//               <button className="keep-logout-button" onClick={onClickCloseWarningModal}>
//                 Keep me as logged out
//               </button>
//             </div>
//           </div>
//         </div>
//       </Modal>
//     </>
//   );
// });

import React, { useEffect, useState } from "react";
import { Link } from "react-router";

import Questions from "../components/match/Questions/Questions";
import WaitingLoaderFindPets from "../components/match/WaitingLoaderFindPets/WaitingLoaderFindPets";
import MatchedPets from "../components/match/MatchedPets/MatchedPets";

import Modal from "../../../components/common/Modal/Modal";

import shsLogo from "../../../assets/images/shs-logo.png";
import "./Match.css";

import SessionStorage from "../../../utils/sessionStorage";

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

function Match({ isLoggedIn = false }) {
  const [isQuestionPage, setIsQuestionPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleWarningModal, setVisibleWarningModal] = useState(false);

  const onClickCloseWarningModal = () => {
    setVisibleWarningModal(false);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setVisibleWarningModal(true);
    }
  }, [isLoggedIn]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#7C0F0F] via-[#C1272D] to-[#7C0F0F]">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full mb-6 sm:mb-8">
              <span className="text-2xl sm:text-3xl">🔍</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              Find Your Perfect Match
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed">
              Answer a few questions and we'll help you find the perfect companion waiting for you at our shelter
            </p>

            {/* Progress Indicator */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <div
                className={`w-3 h-3 rounded-full transition-colors ${
                  isQuestionPage ? "bg-white" : "bg-white/40"
                }`}></div>
              <div className={`w-3 h-3 rounded-full transition-colors ${isLoading ? "bg-white" : "bg-white/40"}`}></div>
              <div
                className={`w-3 h-3 rounded-full transition-colors ${
                  !isQuestionPage && !isLoading ? "bg-white" : "bg-white/40"
                }`}></div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Step Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-8 text-sm font-medium flex-wrap">
            <div className={`flex items-center gap-2 ${isQuestionPage ? "text-[#C1272D]" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                  isQuestionPage ? "bg-[#C1272D]" : "bg-gray-300"
                }`}>
                1
              </div>
              <span>Answer Questions</span>
            </div>
            <div className={`w-16 h-0.5 ${isLoading || !isQuestionPage ? "bg-[#C1272D]" : "bg-gray-300"}`}></div>
            <div className={`flex items-center gap-2 ${isLoading ? "text-[#C1272D]" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                  isLoading ? "bg-[#C1272D]" : "bg-gray-300"
                }`}>
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "2"
                )}
              </div>
              <span>Finding Matches</span>
            </div>
            <div className={`w-16 h-0.5 ${!isQuestionPage && !isLoading ? "bg-[#C1272D]" : "bg-gray-300"}`}></div>
            <div
              className={`flex items-center gap-2 ${
                !isQuestionPage && !isLoading ? "text-[#C1272D]" : "text-gray-400"
              }`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                  !isQuestionPage && !isLoading ? "bg-[#C1272D]" : "bg-gray-300"
                }`}>
                3
              </div>
              <span>Your Matches</span>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 border border-gray-100">
          <Questions
            setIsQuestionPage={setIsQuestionPage}
            visible={!isLoading && isQuestionPage}
            setIsLoading={setIsLoading}
          />
          <WaitingLoaderFindPets visible={isLoading} />
          <MatchedPets setIsQuestionPage={setIsQuestionPage} visible={!isLoading && !isQuestionPage} />
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white rounded-2xl p-6 shadow-md text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Personalized Matching</h3>
            <p className="text-gray-600 text-sm">
              Our algorithm considers your lifestyle, preferences, and living situation
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">❤️</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Perfect Companions</h3>
            <p className="text-gray-600 text-sm">
              All our animals are health-checked and ready for their forever homes
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏠</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Ongoing Support</h3>
            <p className="text-gray-600 text-sm">We provide guidance and support throughout the adoption process</p>
          </div>
        </div>
      </div>

      {/* Warning Modal */}
      <Modal visible={visibleWarningModal}>
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white max-w-md w-full rounded-3xl shadow-2xl p-8 mx-4">
            <div className="text-center">
              {/* Warning Icon */}
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <WarningSVG />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Sign In Recommended</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              You're not logged in, so your matched pets results and preferences won't be saved once you close this tab.
            </p>

            {/* Action Buttons */}
            <div className="space-y-3 mb-6">
              <Link to="/register" className="block">
                <button className="w-full bg-gradient-to-r from-[#7C0F0F] to-[#C1272D] hover:from-[#C1272D] hover:to-[#7C0F0F] text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer">
                  Create an Account
                </button>
              </Link>
              <Link to="/sign-in" className="block">
                <button className="w-full border-2 border-[#7C0F0F] text-[#7C0F0F] hover:bg-[#7C0F0F] hover:text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 cursor-pointer">
                  Sign In
                </button>
              </Link>
            </div>

            {/* Continue without account */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-3">OR</p>
              <button
                onClick={onClickCloseWarningModal}
                className="text-gray-600 hover:text-gray-800 font-medium text-sm underline">
                Continue without saving
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Match;
