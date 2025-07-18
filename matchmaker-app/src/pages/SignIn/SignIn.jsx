import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthFrontendApis } from "@propelauth/frontend-apis-react";
import googleLogo from "../../assets/images/GOOGLE.png";
import cat from "./sittingcat.png";
import Cookies from "js-cookie";

import Modal from "../../components/Modal/Modal";
import flower from "../../assets/images/flower.png";
// import SessionStorage from "../../features/sessionStorage";

function SignIn() {
  const navigate = useNavigate();
  const { emailPasswordLogin } = useAuthFrontendApis();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async () => {
    
      console.log('Submitting form with:', { email, password, rememberMe });
    try {
      const response = await fetch('http://localhost:4041/users/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Sign in successful:', data);
      // Handle successful registration (e.g., redirect to login or dashboard)
    }catch(error) {
      console.error('Error submitting form:', error);
    }
  }; 

  const mobileStyle = {
    borderRadius: "24px",
    boxShadow: "0px 4px 20px 15px rgba(0, 0, 0, 0.25)",
  };

  const [errorMessage, setErrorMessage] = useState(null);
  const [visibleModal, setVisibleModal] = useState(false);

  const openErrorModal = (error) => {
    setErrorMessage((prev) => error);
    setVisibleModal((prev) => true);

    setTimeout(() => {
      setVisibleModal((prev) => false);
      setErrorMessage((prev) => null);
    }, 10000);
  };
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await emailPasswordLogin({
        email: email,
        password: password,
      });

      console.log(response);
      if (response.ok) {
        Cookies.set("email-auth", email, { expires: 30 });
        if (response.data.login_state === "ConfirmEmailRequired") {
          navigate("/confirm-email");
          // SessionStorage.setItem("email-confirmation", email);
        } else if (response.data.login_state === "Finished") {
          navigate("/");
          location.reload();
        }
      } else {
        console.log(response.error.user_facing_error);
        openErrorModal(response.error.user_facing_error);
      }
      // response.handle({
      //   success: () => {
      //     console.log("YES");
      //   },
      //   badRequest: () => {
      //     console.log("NO");
      //   },
      // });
    } catch (err) {
      console.log(err);
      openErrorModal(err);
    }
  };

  return (
    <>
      <div className="sign-in relative">
        {/* MOBILE VIEW */}
        <div className="md:hidden fixed inset-0 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm" style={mobileStyle}>
            <form className="p-8" onSubmit={onSubmitHandler}>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800 tracking-wider mb-2">WELCOME!</h1>
                <div className="w-full h-px bg-gray-300 mb-2"></div>
                <p className="text-gray-500 text-sm">Log in with email</p>
              </div>
              {/* Form elements for mobile */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoComplete="off"
                />
              </div>
              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="mr-2 rounded"
                  />
                  <span className="text-sm text-gray-700">Remember Me</span>
                </label>
                <a href="#" className="text-sm text-[#7c0f0f] hover:text-[#4F1818]">
                  Forgot password?
                </a>
              </div>
              <button className="w-full bg-gray-800 text-white py-3 px-4 rounded-lg hover:bg-gray-900 transition duration-200 font-medium mb-4">
                Continue
              </button>
              <p className="text-center text-sm text-gray-700 mb-4">
                Don't have an account?{" "}
                <a href="#" className="text-[#7c0f0f] hover:text-[#4F1818]">
                  Sign up here.
                </a>
              </p>
              <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition duration-200 font-medium flex items-center justify-center">
                <img src={googleLogo} alt="Google" className="w-5 h-5 mr-2" />
                Sign in with Google
              </button>
            </form>
          </div>
        </div>

        {/* DESKTOP VIEW */}

        <div className="hidden md:flex mt-20 justify-end">
          <div className="relative w-[75vw] h-[75vh] max-w-screen-lg max-h-[54rem] min-h-[600px] bg-white rounded-tl-2xl shadow-2xl flex items-center justify-center p-8 z-30">
            {/* Cat Image positioned absolutely to the left of the form */}
            <div className="absolute w-2xs overflow-hidden top-0 left-0">
              <img src={flower} alt="flower" className="relative -translate-20 scale-150" />
            </div>
            <img
              src={cat}
              alt="Decorative Cat"
              className="absolute top-2/3 left-0 -translate-1/2 w-xl h-xl object-cover z-50"
            />

            {/* Inner container for the form content (unchanged) */}
            <form className="w-full max-w-md" onSubmit={onSubmitHandler}>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 tracking-wider mb-2">WELCOME!</h1>
                <div className="w-full h-px bg-gray-300 mb-2"></div>
                <p className="text-gray-500 text-base">Log in with email</p>
              </div>

              {/* Form Inputs (unchanged) */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoComplete="off"
                />
              </div>

              {/* Controls and Links (unchanged) */}
              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="mr-2 rounded"
                  />
                  <span className="text-sm text-gray-700">Remember Me</span>
                </label>
                <a href="#" className="text-sm text-[#7c0f0f] hover:text-[#4F1818]">
                  Forgot password?
                </a>
              </div>
              <div>
                <input type="submit" id="sign-in-submit" className="hidden" />
                <label
                  htmlFor="sign-in-submit"
                  className="w-full bg-gray-800 text-white py-3 px-4 rounded-lg hover:bg-gray-900 transition duration-200 font-medium mb-4 block text-center cursor-pointer">
                  Continue
                </label>
              </div>
              <p className="text-center text-sm text-gray-700 mb-4">
                Don't have an account?{" "}
                <a href="" className="text-[#7c0f0f] hover:text-[#4F1818]">
                  Sign up here.
                </a>
              </p>
              <div>
                <a href="https://93365406010.propelauthtest.com/google/login">
                  <input type="button" id="sign-in-google-button" className="hidden" />
                  <label
                    htmlFor="sign-in-google-button"
                    className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition duration-200 font-medium flex items-center justify-center cursor-pointer">
                    <img src={googleLogo} alt="Google" className="w-5 h-5 mr-2" />
                    Sign in with Google
                  </label>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Modal visible={visibleModal} className="!w-max !h-max !right-0 !top-1/8 !bg-transparent ">
        <div className="bg-white border-2 border-l-0 border-[#a4133c] max-w-[250px] border-r-4 py-2 px-5 error-modal">
          <div className="flex gap-2 items-center">
            <WarningSVG />
            <p className="font-semibold uppercase text-[#a4133c]">Cannot sign in</p>
          </div>
          <p>{errorMessage}</p>
        </div>
      </Modal>
    </>
  );
}

function WarningSVG() {
  return (
    <svg className="w-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.5 12C19.5 16.1421 16.1421 19.5 12 19.5C7.85786 19.5 4.5 16.1421 4.5 12C4.5 7.85786 7.85786 4.5 12 4.5C16.1421 4.5 19.5 7.85786 19.5 12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM11.25 13.5V8.25H12.75V13.5H11.25ZM11.25 15.75V14.25H12.75V15.75H11.25Z"
        fill="#a4133c"
      />
    </svg>
  );
}

export default SignIn;
