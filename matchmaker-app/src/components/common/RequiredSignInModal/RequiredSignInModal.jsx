import { useNavigate } from "react-router";

import Modal from "../Modal/Modal";

import womanHoldingPet from "../../../assets/images/woman-holding-pet.jpg";
import shsLogo from "../../../assets/images/shs-logo.png";

import "./RequiredSignInModal.css";

function RequiredSignInModal({ visible, setVisible }) {
  const navigate = useNavigate();
  const onClickCloseModal = () => {
    setVisible((preState) => false);
  };

  return (
    <Modal visible={visible}>
      <div className="absolute -translate-1/2 top-1/2 left-1/2 bg-white flex rounded-md border-t-[#7C0F0F] border-t-8 required-sign-in-modal w-[300px] lg:w-max">
        <div className="lg:block hidden w-max">
          <img src={womanHoldingPet} alt="SequoiaAdoption" className="h-[600px] w-auto" />
        </div>
        <div className="flex flex-col items-center lg:p-12 p-5 lg:w-xl">
          <div className="flex items-center gap-1 lg:gap-2">
            <img src={shsLogo} alt="logo" className="w-8 lg:w-29" />
            <span
              className="text-[#7C0F0F] uppercase font-bold text-xl md:text-3xl tracking-tighter lg:-ml-10"
              style={{ fontFamily: "Koulen, sans-serif" }}>
              Sequoia
            </span>
          </div>
          <p className="text-xl lg:text-2xl font-bold">Welcome to Sequoia</p>
          <p className="text-[#6c757d] text-center">Sign in to access your Sequoia account</p>
          <div className="mt-10 flex flex-col items-center w-full gap-5">
            <button className="required-modal-button" onClick={() => navigate("/register")}>
              <span>Create an account</span>
            </button>
            <button className="required-modal-button" onClick={() => navigate("/sign-in")}>
              <span>Sign in with Sequoia</span>
            </button>
          </div>
        </div>
        <div className="absolute right-5 top-5">
          <button className="cursor-pointer cancel-button" onClick={onClickCloseModal}>
            <CancelSVG />
          </button>
        </div>
      </div>
    </Modal>
  );
}

function CancelSVG() {
  return (
    <svg
      viewBox="0 0 22 22"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      fill="#000000"
      className="lg:w-[30px] w-[15px] ">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <g id="icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g
            id="ui-gambling-website-lined-icnos-casinoshunter"
            transform="translate(-869.000000, -159.000000)"
            fill="#ced4da"
            fillRule="nonzero">
            <g id="square-filled" transform="translate(50.000000, 120.000000)">
              <path
                d="M820.716328,39.2890737 L830,48.573 L839.283672,39.2890737 C839.644156,38.9285898 840.211387,38.9008602 840.603678,39.2058851 L840.710926,39.3021143 C841.101451,39.6926386 841.101451,40.3258036 840.710926,40.7163279 L831.427,50 L840.710926,59.2836721 C841.07141,59.6441561 841.09914,60.2113872 840.794115,60.6036784 L840.697886,60.7109263 C840.307361,61.1014506 839.674196,61.1014506 839.283672,60.7109263 L830,51.427 L820.716328,60.7109263 C820.355844,61.0714102 819.788613,61.0991398 819.396322,60.7941149 L819.289074,60.6978857 C818.898549,60.3073614 818.898549,59.6741964 819.289074,59.2836721 L828.573,50 L819.289074,40.7163279 C818.92859,40.3558439 818.90086,39.7886128 819.205885,39.3963216 L819.302114,39.2890737 C819.692639,38.8985494 820.325804,38.8985494 820.716328,39.2890737 Z M819.996181,40.0092211 L829.987233,50 L819.996181,59.9907789 L820.009221,60.0038195 L830,50.0127671 L839.990779,60.0038195 L840.003819,59.9907789 L830.012767,50 L840.003819,40.0092211 L839.990779,39.9961805 L830,49.9872329 L820.009221,39.9961805 L819.996181,40.0092211 Z"
                id="cancel"></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default RequiredSignInModal;
