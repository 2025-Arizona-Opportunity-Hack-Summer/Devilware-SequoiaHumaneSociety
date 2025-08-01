import { Link, useNavigate } from "react-router";
import { useAuthFrontendApis } from "@propelauth/frontend-apis-react";
import googleLogo from "../../../../assets/images/GOOGLE.png";
import Cookies from "js-cookie";

import useSignInForm from "../../hooks/useSignInForm";
import useErrorModal from "../../hooks/useErrorModal";
import Modal from "../../../../components/common/Modal/Modal";
import flower from "../../../../assets/images/flower.png";
import cat from "../../../../assets/images/Cat Sitting.png";

import { WarningSVG } from "../../utils/SVG";

function SignInForm() {
  const navigate = useNavigate();
  const { emailPasswordLogin } = useAuthFrontendApis();

  const [formData, handleInputChange] = useSignInForm();
  const [errorMessage, visibleModal, openErrorModal] = useErrorModal();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (formData.rememberMe) {
      Cookies.set("remember-me", JSON.stringify({ email: formData.email, password: formData.password }), {
        expires: 30,
      });
    } else {
      Cookies.remove("rememer-me");
    }

    try {
      const response = await emailPasswordLogin({
        email: formData.email,
        password: formData.password,
      });

      if (response.ok) {
        Cookies.set("email-auth", formData.email, { expires: 30 });

        if (response.data.login_state === "ConfirmEmailRequired") {
          navigate("/confirm-email");
          // SessionStorage.setItem("email-confirmation", email);
        } else if (response.data.login_state === "Finished") {
          navigate("/");
          location.reload();
        }
      } else {
        openErrorModal(response.error.user_facing_error + " Recheck your email and password.");
      }
    } catch (err) {
      openErrorModal(err);
    }
  };

  const mobileStyle = {
    borderRadius: "24px",
    boxShadow: "0px 4px 20px 15px rgba(0, 0, 0, 0.25)",
  };
  return (
    <>
      <div className="sign-in relative">
        {/* MOBILE VIEW */}
        <div className="md:hidden fixed inset-0 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm" style={mobileStyle}>
            <form id="mobile-sign-in" className="p-8" onSubmit={onSubmitHandler}>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800 tracking-wider mb-2">WELCOME!</h1>
                <div className="w-full h-px bg-gray-300 mb-2"></div>
                <p className="text-gray-500 text-sm">Log in with email</p>
              </div>
              {/* Form elements for mobile */}
              <div className="mb-4">
                <label htmlFor="mobile-email" className="block text-gray-700 text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="mobile-email"
                  name="mobile-email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoComplete="off"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="mobile-password" className="block text-gray-700 text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="mobile-password"
                  name="mobile-password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoComplete="off"
                />
              </div>
              <div className="flex items-center justify-between mb-6">
                <label htmlFor="mobile-rememberMe" className="flex items-center">
                  <input
                    type="checkbox"
                    id="mobile-rememberMe"
                    name="mobile-rememberMe"
                    checked={formData.password}
                    onChange={handleInputChange}
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
            <form htmlFor="sign-in" className="w-full max-w-md" onSubmit={onSubmitHandler}>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 tracking-wider mb-2">WELCOME!</h1>
                <div className="w-full h-px bg-gray-300 mb-2"></div>
                <p className="text-gray-500 text-base">Log in with email</p>
              </div>

              {/* Form Inputs (unchanged) */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoComplete="off"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoComplete="off"
                />
              </div>

              {/* Controls and Links (unchanged) */}
              <div className="flex items-center justify-between mb-6">
                <label htmlFor="rememberMe" className="flex items-center">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
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
                <Link to="/register" className="text-[#7c0f0f] hover:text-[#4F1818]">
                  Sign up here.
                </Link>
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

export default SignInForm;
